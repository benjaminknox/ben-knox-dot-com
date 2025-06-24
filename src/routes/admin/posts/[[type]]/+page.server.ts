import { redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';
import mongoDbClient from '$lib/db/mongo';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, url, params }) => {
	const sessionId = cookies.get(lucia.sessionCookieName);

	if (!sessionId) {
    return redirect(307, '/signin');
	}

  const page = Number(url.searchParams.get('page')) || 1;
  const limit = Number(url.searchParams.get('limit')) || 10;
  const offset = (page - 1) * limit;
  
  const { type = 'published'} = params;

  const client = (await mongoDbClient).db();

  const posts = client.collection('posts');

  const postList = await posts.find({ published: type === 'published'}).skip(offset).limit(limit).toArray();

  return {
    type,
    posts: postList
  }
};
