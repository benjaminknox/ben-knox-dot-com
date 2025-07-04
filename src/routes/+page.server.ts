import mongoDbClient from '$lib/db/mongo';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const client = (await mongoDbClient).db();

  const posts = client.collection('posts');

  const postList = await posts.find({ published: true }).limit(8).toArray();

  return {
    posts: postList,
  }
};
