import mongoDbClient from '$lib/db/mongo';
import { validate as validUUID } from 'uuid';
import type { RequestEvent } from './$types';

export async function GET({ params }: RequestEvent) {
  const { slug : id } = params;

  if(!id || !validUUID(id)) {
    return new Response(JSON.stringify({
      message: 'Not found'
    }), { status: 404 });
  }

  const db = (await mongoDbClient).db();

  const posts = db.collection('post-images');

  const { headerImage } = await posts.findOne({ _id: id as any }) as any;

  if (headerImage) {
    return new Response(headerImage.buffer, {
      headers: { 'Content-Type': 'image/jpeg' }
    })
  } else {
    return new Response(JSON.stringify({
      message: 'Not found'
    }), { status: 404 });
  }
}
