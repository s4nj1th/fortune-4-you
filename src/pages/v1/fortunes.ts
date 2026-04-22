import { getFortunes } from '../../lib/db';

export const prerender = false;

export async function GET({ request }: { request: Request }) {
  try {
    const fortunes = await getFortunes();
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '100');
    const skip = parseInt(url.searchParams.get('skip') || '0');
    
    const results = fortunes.slice(skip, skip + limit);

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
}
