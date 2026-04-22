import { getRandomCookie, getFortunes, getLessons } from '../../lib/db';

export const prerender = false;

export async function GET({ request }: { request: Request }) {
  try {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '1');
    
    if (limit === 1) {
      const cookie = await getRandomCookie();
      return new Response(JSON.stringify(cookie), {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    const cookies = [];
    for (let i = 0; i < Math.min(limit, 100); i++) {
      cookies.push(await getRandomCookie());
    }

    return new Response(JSON.stringify(cookies), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
}
