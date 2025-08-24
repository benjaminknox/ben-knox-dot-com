import mongoDbClient from '$lib/db/mongo';

export async function GET() {
	const db = (await mongoDbClient).db();

	const posts = db.collection('posts');

  const post = (await posts.find({ ['published']: true, }).sort({ publishedDate: -1 }).limit(1).toArray())[0];

  return new Response(JSON.stringify(post), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    status: 200
  });
}
