import { redirect } from '@sveltejs/kit';
import mongoDbClient from '$lib/db/mongo';
import type { LayoutServerLoad } from './$types';
import { lucia, validateUserAndGetDetails } from "$lib/server/auth";

export const load: LayoutServerLoad = async ({ cookies, url }) => {
  const sessionId = cookies.get(lucia.sessionCookieName);

  const session = sessionId ? await validateUserAndGetDetails(sessionId) : null;

	const client = (await mongoDbClient).db();

  const collection = client.collection("topics")

  const topics = await collection.find().toArray();

  const topicsWithPosts = await collection
  .aggregate([
    {
      $lookup: {
        from: "posts",
        localField: "name",
        foreignField: "topic",
        as: "posts"
      }
    },
    { $match: { 
      posts: { $ne: [] },
      "posts.published": { $eq: true }
    } },
    { $project: { _id: 0, name: 1 } }
  ])
  .toArray();

  if(!session &&
		(url.pathname.startsWith('/admin/add-post') || url.pathname.startsWith('/admin/posts'))
    ) {
      throw redirect(302, '/signin');
    }

    if(session && url.pathname.startsWith('/signin')) {
      throw redirect(302, "/admin/posts");
    }

  return { authenticated : !!session, topics, topicsWithPosts};
};
