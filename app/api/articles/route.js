import { NextResponse } from 'next/server';

/**
 * Articles API Route (for recent articles from Spaceflight News)
 * Cache: 15 minutes (articles from prestigious sources)
 * Revalidation: On-demand or background
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '20';
    const ordering = searchParams.get('ordering') || '-published_at';

    // Fetch with Next.js 15 caching - 15 minutes (900 seconds)
    const response = await fetch(
      `https://api.spaceflightnewsapi.net/v4/articles/?limit=${limit}&ordering=${ordering}`,
      {
        next: { 
          revalidate: 900, // 15 minutes - articles from prestigious sources
          tags: ['articles'] // For on-demand revalidation
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Articles API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Return cached response
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=450',
      },
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles', message: error.message },
      { status: 500 }
    );
  }
}