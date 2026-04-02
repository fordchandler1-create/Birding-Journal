"use client";

import { useState, useEffect } from "react";

export default function Page() {
  const [entries, setEntries] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("birds");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [view, setView] = useState("gallery");

  const [form, setForm] = useState({
    species: "",
    location: "",
    notes: "",
    date: "",
    image: "",
  });

  useEffect(() => {
    localStorage.setItem("birds", JSON.stringify(entries));
  }, [entries]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addEntry = () => {
    if (!form.species) return;
    setEntries([{ ...form, id: Date.now() }, ...entries]);
    setForm({ species: "", location: "", notes: "", date: "", image: "" });
    setView("gallery");
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  return (
    <div style={{
      background: "#f4efe6",
      minHeight: "100vh",
      padding: 30,
      fontFamily: "Georgia, serif",
      color: "#3b2f2f"
    }}>

      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <h1 style={{ fontSize: 48, letterSpacing: 1 }}>
            Field Sketchbook
          </h1>
          <p style={{ fontStyle: "italic", color: "#6b5e5e" }}>
            Observations of wing and wonder
          </p>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 30 }}>
          <button onClick={() => setView("gallery")} style={btnStyle}>Gallery</button>
          <button onClick={() => setView("new")} style={btnStyle}>New Entry</button>
        </div>

        {/* Gallery */}
        {view === "gallery" && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))",
            gap: 24
          }}>

            {entries.length === 0 && (
              <p style={{ gridColumn: "1/-1", textAlign: "center", fontStyle: "italic" }}>
                Your sketchbook is empty… begin with your first bird.
              </p>
            )}

            {entries.map((entry) => (
              <div key={entry.id} style={cardStyle}>

                {entry.image && (
                  <img
                    src={entry.image}
                    alt={entry.species}
                    style={{
                      width: "100%",
                      height: 150,
                      objectFit: "cover",
                      borderRadius: 8,
                      marginBottom: 10
                    }}
                  />
                )}

                <h3 style={{ fontStyle: "italic", marginBottom: 4 }}>
                  {entry.species}
                </h3>

                <p style={{ fontSize: 12, color: "#6b5e5e" }}>
                  {entry.location}
                </p>

                <p style={{ fontSize: 12 }}>{entry.date}</p>

                <button onClick={() => deleteEntry(entry.id)} style={deleteBtn}>
                  Remove
                </button>

              </div>
            ))}
          </div>
        )}

        {/* New Entry */}
        {view === "new" && (
          <div style={formStyle}>

            <input name="species" placeholder="Species" value={form.species} onChange={handleChange} style={inputStyle} />
            <input name="location" placeholder="Location" value={form.location} onChange={handleChange} style={inputStyle} />
            <input type="date" name="date" value={form.date} onChange={handleChange} style={inputStyle} />
            <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} style={inputStyle} />

            <textarea name="notes" placeholder="Field notes..." value={form.notes} onChange={handleChange} style={{ ...inputStyle, height: 100 }} />

            <button onClick={addEntry} style={btnStyle}>
              Add to Sketchbook
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

/* Styles */

const cardStyle = {
  background: "#fffaf3",
  padding: 14,
  borderRadius: 12,
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  border: "1px solid #e6dccf"
};

const formStyle = {
  background: "#fffaf3",
  padding: 20,
  borderRadius: 12,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  border: "1px solid #e6dccf"
};

const inputStyle = {
  padding: 10,
  borderRadius: 8,
  border: "1px solid #d8cfc2",
  fontFamily: "inherit"
};

const btnStyle = {
  padding: "10px 16px",
  borderRadius: 10,
  border: "none",
  background: "#7a8f63",
  color: "white",
  cursor: "pointer"
};

const deleteBtn = {
  marginTop: 8,
  background: "transparent",
  border: "none",
  color: "#a44",
  cursor: "pointer"
};
