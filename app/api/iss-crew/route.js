import { NextResponse } from "next/server";

export async function GET() {
  try {
    const r = await fetch("http://api.open-notify.org/astros.json", {
      next: { revalidate: 3600 },
    });
    if (!r.ok) throw new Error("crew fetch failed");
    const data = await r.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { number: 0, people: [], error: "unavailable" },
      { status: 200 }
    );
  }
}
