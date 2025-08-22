import mongoDbClient from '$lib/db/mongo';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;

	const client = (await mongoDbClient).db();

	const posts = client.collection('posts');

  let post : any = {};
  let morePosts : any = {};

  if(slug) {
    const { headerImage: _, ...postData } = await posts.findOne({ $or: [{ slug: slug as any }, { _id: slug as any }] }) as any;

    post = postData;

    const { topic } = post;

    let query : Record<string, any> = { 
      ['published']: true,
      topic,
      _id: {
        $ne: post._id
      }
    };

    morePosts = await posts.find(query).sort({ randomField: 1 }).limit(4).toArray();
  }

  return {
    post,
    morePosts
  }
};
