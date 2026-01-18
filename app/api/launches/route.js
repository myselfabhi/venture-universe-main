import { NextResponse } from 'next/server';

/**
 * Launch Library API Route
 * Cache: 60 minutes (launches scheduled in advance)
 * Revalidation: On-demand or background
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '50';
    const ordering = searchParams.get('ordering') || 'net';

    // Fetch with Next.js 15 caching - 60 minutes (3600 seconds)
    const response = await fetch(
      `https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=${limit}&ordering=${ordering}`,
      {
        next: { 
          revalidate: 3600, // 60 minutes - launches don't change frequently
          tags: ['launches'] // For on-demand revalidation
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Launch Library API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Return cached response
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
      },
    });
  } catch (error) {
    console.error('Error fetching launches:', error);
    return NextResponse.json(
      { error: 'Failed to fetch launches', message: error.message },
      { status: 500 }
    );
  }
}