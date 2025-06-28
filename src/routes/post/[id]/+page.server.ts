import mongoDbClient from '$lib/db/mongo';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { id } = params;

	const client = (await mongoDbClient).db();

	const posts = client.collection('posts');

  let post : any = {};

  if(id) {
    const { headerImage: _, ...postData } = await posts.findOne({ _id: id as any }) as any;

    post = postData;
  }

  return {
    post,
  }
};
