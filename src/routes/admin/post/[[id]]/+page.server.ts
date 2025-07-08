import { v4 as uuidv4 } from 'uuid';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import mongoDbClient from '$lib/db/mongo';
import type { PageServerLoad } from './$types';
import { lucia, validateUserAndGetDetails  } from '$lib/server/auth';

export const actions: Actions = {
  default: async ({ params, request, ...rest }) => {
    const formData = await request.formData() as any;

    const data = Object.fromEntries(formData.entries());

    const { draft, publish, update, image, ...post } = data;

    const client = (await mongoDbClient).db();

    const posts = client.collection('posts');

    const date = Date.now();

    const _id = post._id ? post._id : uuidv4() as any;

    let body : any = {
      ...post,
      lastUpdatedDate: date,
    }

    body.published = typeof draft === "undefined";

    if(body.published) {
      body.publishedDate = date;
    }

    if(image.size > 0) {
      const headerImage = Buffer.from(await image.arrayBuffer());
      const postImages = client.collection('post-images');

      await postImages.updateOne({
        _id,
      }, {
        $set: { headerImage },
      }, {
        upsert: true,
      });
    }

    if(!post._id) {
      body.createdDate = date;
    }

    const insertedPost = await posts.updateOne({
      _id,
    }, {
      $set: body,
    }, {
      upsert: true,
    });

    let newPost = await posts.findOne({ _id: insertedPost.upsertedId as any}) as any;

    if(newPost?.headerImage) {
      delete newPost.headerImage;
    }

    return newPost;
  }
};

export const load: PageServerLoad = async ({ cookies, params }) => {
	const sessionId = cookies.get(lucia.sessionCookieName);

	if (!sessionId) {
    return redirect(307, '/signin');
	}

  const session = sessionId ? await validateUserAndGetDetails(sessionId) : null;

	if (!session) {
    return redirect(307, '/signin');
	}

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
