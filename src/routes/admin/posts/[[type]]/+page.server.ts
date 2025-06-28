import { redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';
import mongoDbClient from '$lib/db/mongo';
import type { PageServerLoad } from './$types';
import { pagination } from '$lib/posts/pagination';

export const load: PageServerLoad = async ({ cookies, url, params }) => {
	const sessionId = cookies.get(lucia.sessionCookieName);

	if (!sessionId) {
    return redirect(307, '/signin');
	}

  const { type = 'published'} = params;

  const client = (await mongoDbClient).db();

  const posts = client.collection('posts');

  const query = { published: type === 'published'};

  const totalPosts = await posts.countDocuments(query);

  const parsedLimit = url.searchParams.get('limit');

  const {
    page,
    limit,
    offset,
    lastPage,
  } = pagination(
    Number(url.searchParams.get('page')) ?? 1,
    parsedLimit ? Number(parsedLimit) : 16,
    totalPosts,
  );

  const postList = await posts.find(query).skip(offset).limit(limit).toArray();

  return {
    type,
    page,
    limit,
    lastPage,
    totalPosts,
    posts: postList,
  }
};
