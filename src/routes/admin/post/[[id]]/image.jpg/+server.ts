import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function GET({ params }: RequestEvent) {
  const { id } = params;

  redirect(301, `/post/${id}/image.jpg`);
}
