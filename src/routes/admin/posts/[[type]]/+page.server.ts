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

  const { titleFilter = null, topicFilter = null} = Object.fromEntries(url.searchParams.entries());

  const client = (await mongoDbClient).db();

  const posts = client.collection('posts');

  let query : Record<string, any> = { ['published']: type === 'published' };

  if(titleFilter) query['title'] = { $regex: new RegExp(decodeURIComponent(titleFilter), 'i') };
  if(topicFilter) query['topic'] = decodeURIComponent(topicFilter);

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
  };
};
