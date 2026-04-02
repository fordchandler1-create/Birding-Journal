"use client";

import { useState, useEffect } from "react";

export default function Page() {
  const [entries, setEntries] = useState([]);
  const [view, setView] = useState("gallery");

  return (
    <div style={{
      minHeight: "100vh",
      padding: 30,
      fontFamily: "Georgia, serif",
      background: "#f4efe6"
    }}>

      {/* BIG visible decorative header */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/American_Goldfinch_%28Audubon%29.jpg/400px-American_Goldfinch_%28Audubon%29.jpg"
          style={{ width: 200 }}
        />
      </div>

      {/* MAIN PAGE */}
      <div style={{
        maxWidth: 800,
        margin: "0 auto",
        background: "#fffaf3",
        padding: 30,
        border: "4px solid #cbbfae",   // thick visible border
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
      }}>

        {/* INNER BORDER */}
        <div style={{
          border: "1px solid #d8cfc2",
          padding: 20
        }}>

          <h1 style={{ textAlign: "center", fontSize: 42 }}>
            Field Sketchbook
          </h1>

          <p style={{ textAlign: "center", fontStyle: "italic" }}>
            Observations of wing and wonder
          </p>

          <div style={{ textAlign: "center", margin: 20 }}>
            <button onClick={() => setView("gallery")}>Gallery</button>
            <button onClick={() => setView("new")} style={{ marginLeft: 10 }}>
              New Entry
            </button>
          </div>

          {view === "gallery" && (
            <p style={{ textAlign: "center" }}>
              🌿 Your illustrated bird journal will appear here
            </p>
          )}

          {view === "new" && (
            <p style={{ textAlign: "center" }}>
              ✍️ Entry form here
            </p>
          )}

        </div>
      </div>

      {/* BIG botanical footer */}
      <div style={{ textAlign: "center", marginTop: 30 }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Branch_with_leaves_and_flowers_%28PSF%29.png/400px-Branch_with_leaves_and_flowers_%28PSF%29.png"
          style={{ width: 200 }}
        />
      </div>

    </div>
  );
}
