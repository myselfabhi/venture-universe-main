import { NextResponse } from 'next/server';

/**
 * NASA APOD API Route
 * Cache: 24 hours (APOD changes once per day)
 * Revalidation: On-demand or background
 */
export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY || 'DEMO_KEY';
    
    // Fetch with Next.js 15 caching - 24 hours (86400 seconds)
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`,
      {
        next: { 
          revalidate: 86400, // 24 hours - APOD changes once per day
          tags: ['apod'] // For on-demand revalidation
        }
      }
    );

    if (!response.ok) {
      throw new Error(`NASA API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Return cached response
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    console.error('Error fetching APOD:', error);
    return NextResponse.json(
      { error: 'Failed to fetch APOD', message: error.message },
      { status: 500 }
    );
  }
}