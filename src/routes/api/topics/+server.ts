import { v4 as uuidv4 } from 'uuid';
import { fail } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';
import mongoDbClient from '$lib/db/mongo';
import type { RequestEvent } from './$types';

export async function POST({ cookies, request }: RequestEvent) {
	const sessionId = cookies.get(lucia.sessionCookieName);

	if (!sessionId) {
		return fail(403, {
			message: 'Forbidden'
		});
	}

	const {name} = await request.json();

  const newTopic = {
    _id: uuidv4() as any,
    name,
  };

	const db = (await mongoDbClient).db();

	const topics = db.collection('topics');

	if (await topics.findOne({ name: { $regex: `^${name}$`, $options: 'i' } })) {
		return new Response(JSON.stringify({
			message: 'Already exists'
		}), {
      status: 409,
    });
	}

  const topic = await topics.insertOne(newTopic);

  return new Response(JSON.stringify(await topics.findOne({ _id: topic.insertedId })), {status: 200});
}
