"use client";

import { useState } from "react";

export default function Page() {
  const [view, setView] = useState("gallery");

  return (
    <div style={{
      minHeight: "100vh",
      padding: 30,
      fontFamily: "Georgia, serif",
      background: "#f4efe6"
    }}>

      {/* TOP BIRD IMAGE (WORKING) */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <img
          src="https://images.unsplash.com/photo-1444464666168-49d633b86797?q=80&w=800"
          style={{ width: 200, borderRadius: 8 }}
        />
      </div>

      {/* MAIN PAGE */}
      <div style={{
        maxWidth: 800,
        margin: "0 auto",
        background: "#fffaf3",
        padding: 30,
        border: "4px solid #cbbfae",
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

      {/* BOTTOM PLANT IMAGE (WORKING) */}
      <div style={{ textAlign: "center", marginTop: 30 }}>
        <img
          src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=800"
          style={{ width: 200, borderRadius: 8 }}
        />
      </div>

    </div>
  );
}
