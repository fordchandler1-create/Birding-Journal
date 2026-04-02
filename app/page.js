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
      minHeight: "100vh",
      padding: 30,
      fontFamily: "Georgia, serif",
      color: "#3b2f2f",
      backgroundColor: "#f4efe6",
      backgroundImage: `url('https://www.transparenttextures.com/patterns/paper-fibers.png')`
    }}>

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>

        {/* Decorative birds */}
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Audubon_Birds_of_America.jpg/320px-Audubon_Birds_of_America.jpg"
          style={{ position: "absolute", top: -60, right: -40, width: 140, opacity: 0.5 }} />

        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Branch_with_leaves_and_flowers_%28PSF%29.png/320px-Branch_with_leaves_and_flowers_%28PSF%29.png"
          style={{ position: "absolute", bottom: -60, left: -40, width: 140, opacity: 0.5 }} />

        {/* Main paper card */}
        <div style={{
          background: "#fffaf3",
          padding: 30,
          borderRadius: 16,
          border: "2px solid #d8cfc2",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          position: "relative"
        }}>

          {/* Inner border */}
          <div style={{
            position: "absolute",
            top: 10,
            left: 10,
            right: 10,
            bottom: 10,
            border: "1px solid #e6dccf",
            borderRadius: 12,
            pointerEvents: "none"
          }} />

          {/* Title */}
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <h1 style={{ fontSize: 48 }}>Field Sketchbook</h1>
            <p style={{ fontStyle: "italic", color: "#6b5e5e" }}>
              Observations of wing and wonder
            </p>
          </div>

          {/* Nav */}
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 30 }}>
            <button onClick={() => setView("gallery")} style={btnStyle}>Gallery</button>
            <button onClick={() => setView("new")} style={btnStyle}>New Entry</button>
          </div>

          {/* Gallery */}
          {view === "gallery" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))", gap: 24 }}>

              {entries.length === 0 && (
                <p style={{ gridColumn: "1/-1", textAlign: "center", fontStyle: "italic" }}>
                  Your sketchbook is empty… begin with your first bird.
                </p>
              )}

              {entries.map((entry) => (
                <div key={entry.id} style={cardStyle}>

                  {entry.image && (
                    <img src={entry.image} style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 6 }} />
                  )}

                  <h3 style={{ fontStyle: "italic" }}>{entry.species}</h3>
                  <p style={{ fontSize: 12 }}>{entry.location}</p>

                  <button onClick={() => deleteEntry(entry.id)} style={deleteBtn}>Remove</button>

                </div>
              ))}
            </div>
          )}

          {/* Form */}
          {view === "new" && (
            <div style={formStyle}>
              <input name="species" placeholder="Species" value={form.species} onChange={handleChange} style={inputStyle} />
              <input name="location" placeholder="Location" value={form.location} onChange={handleChange} style={inputStyle} />
              <input type="date" name="date" value={form.date} onChange={handleChange} style={inputStyle} />
              <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} style={inputStyle} />
              <textarea name="notes" placeholder="Field notes..." value={form.notes} onChange={handleChange} style={{ ...inputStyle, height: 100 }} />
              <button onClick={addEntry} style={btnStyle}>Add to Sketchbook</button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

const cardStyle = {
  background: "#fdfaf5",
  padding: 12,
  borderRadius: 10,
  border: "1px solid #e6dccf",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 10
};

const inputStyle = {
  padding: 10,
  borderRadius: 6,
  border: "1px solid #d8cfc2",
  background: "#fff"
};

const btnStyle = {
  padding: "10px 14px",
  borderRadius: 8,
  border: "none",
  background: "#7a8f63",
  color: "white",
  cursor: "pointer"
};

const deleteBtn = {
  marginTop: 6,
  background: "transparent",
  border: "none",
  color: "#a44",
  cursor: "pointer"
};
