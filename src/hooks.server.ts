import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const handle: Handle = sequence(
  async ({ event, resolve }) => {
    const { pathname } = event.url;

    if (pathname.startsWith('/relay-oDVs')) {
      const hostname = pathname.startsWith('/relay-oDVs/static/')
        ? 'us-assets.i.posthog.com'
        : 'us.i.posthog.com';

      // Build external URL
      const url = new URL(event.request.url);
      url.protocol = 'https:';
      url.hostname = hostname;
      url.port = '443';
      url.pathname = pathname.replace('/relay-oDVs/', '');

      // Clone and adjust headers
      const headers = new Headers(event.request.headers);
      headers.set("Accept-Encoding", "")
      headers.set('host', hostname);

      // Proxy the request to the external host
      const response = await fetch(url.toString(), {
        method: event.request.method,
        headers,
        body: event.request.body,
        // @ts-ignore
        duplex: 'half',
      });

      return response;
    }

    const response = await resolve(event);
    return response;
  },
  async ({ event, resolve }) => {
    const response = await resolve(event);
    response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
    response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
    return response;
  }
);

