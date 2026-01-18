import { NextResponse } from 'next/server';

/**
 * Spaceflight News API Route
 * Cache: 10 minutes (news updates frequently)
 * Revalidation: On-demand or background
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '50';
    const ordering = searchParams.get('ordering') || '-published_at';

    // Fetch with Next.js 15 caching - 10 minutes (600 seconds)
    const response = await fetch(
      `https://api.spaceflightnewsapi.net/v4/articles/?limit=${limit}&ordering=${ordering}`,
      {
        next: { 
          revalidate: 600, // 10 minutes - news updates frequently
          tags: ['news'] // For on-demand revalidation
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Spaceflight News API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Return cached response
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news', message: error.message },
      { status: 500 }
    );
  }
}