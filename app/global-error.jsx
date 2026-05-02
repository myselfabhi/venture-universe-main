"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#030412",
          color: "white",
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: 480, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🌌</div>
          <h1 style={{ fontSize: 28, marginBottom: 12 }}>System failure</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 24 }}>
            A critical error pushed us out of orbit. Reload to re-establish contact.
          </p>
          <button
            onClick={() => reset()}
            style={{
              padding: "10px 20px",
              borderRadius: 999,
              border: "none",
              background: "linear-gradient(90deg, #5c33cc, #7a57db)",
              color: "white",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
