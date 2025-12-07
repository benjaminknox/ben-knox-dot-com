import mongoDbClient from '$lib/db/mongo';
import { validate as validUUID } from 'uuid';
import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;

	const client = (await mongoDbClient).db();

	const posts = client.collection('posts');

  let post : any = {};
  let morePosts : any = {};
  let allPostsInCategory : number = 0;

  if(slug) {
    post = await posts.findOne({ $or: [{ slug: slug as any }, { _id: slug as any }] }) as any;

    if(!post) {
      error(404, {
        message: 'Not found'
      });
    }

    if(validUUID(slug)) {
      redirect(301, `/post/${post.slug}`);
    }

    const { headerImage: _, ...postData } = post;

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
    allPostsInCategory = await posts.countDocuments(query);
  }

  return {
    post,
    morePosts,
    allPostsInCategory
  }
};
