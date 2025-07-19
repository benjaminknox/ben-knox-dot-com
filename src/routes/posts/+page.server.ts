import mongoDbClient from '$lib/db/mongo';
import type { PageServerLoad } from './$types';
import { pagination } from '$lib/posts/pagination';

export const load: PageServerLoad = async ({ url }) => {
  const { titleFilter = null, topicFilter = null} = Object.fromEntries(url.searchParams.entries());

  const client = (await mongoDbClient).db();

  const posts = client.collection('posts');

  let query : Record<string, any> = { ['published']: true };

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

  const postList = await posts.find(query).sort({publishedDate: -1}).skip(offset).limit(limit).toArray();

  return {
    page,
    limit,
    lastPage,
    totalPosts,
    posts: postList,
  };
};
