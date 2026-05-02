// Newsletter signup endpoint.
// In production wire to Buttondown, ConvertKit, or Resend via env vars.
// For now this validates and "stores" via a stub log so the UI works end-to-end.

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, message: "Please provide a valid email." },
        { status: 400 }
      );
    }

    const provider = process.env.NEWSLETTER_PROVIDER;

    if (provider === "buttondown" && process.env.BUTTONDOWN_API_KEY) {
      const r = await fetch("https://api.buttondown.email/v1/subscribers", {
        method: "POST",
        headers: {
          Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_address: email, type: "regular" }),
      });
      if (!r.ok) {
        const text = await r.text();
        if (r.status === 400 && text.includes("already")) {
          return NextResponse.json({ ok: true, message: "You're already subscribed!" });
        }
        return NextResponse.json(
          { ok: false, message: "Could not subscribe right now." },
          { status: 502 }
        );
      }
    } else {
      console.log("[newsletter] (stub) subscribe", email);
    }

    return NextResponse.json({
      ok: true,
      message: "Welcome aboard! Check your inbox to confirm.",
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, message: "Unexpected error." },
      { status: 500 }
    );
  }
}
