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

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addEntry = () => {
    if (!form.species) return;
    setEntries([{ ...form, id: Date.now() }, ...entries]);
    setForm({ species: "", location: "", notes: "", date: "", image: "" });
    setView("gallery");
  };

  const deleteEntry = (id: number) => {
    setEntries(entries.filter((e: any) => e.id !== id));
  };

  return (
    <div style={{ background: "#f6f1e7", minHeight: "100vh", padding: 20, fontFamily: "serif" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        <h1 style={{ textAlign: "center", fontSize: 42 }}>Field Sketchbook</h1>
        <p style={{ textAlign: "center", fontStyle: "italic" }}>
          Observations of wing and wonder
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 10, margin: 20 }}>
          <button onClick={() => setView("gallery")}>Gallery</button>
          <button onClick={() => setView("new")}>New Entry</button>
        </div>

        {view === "gallery" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 20 }}>
            {entries.length === 0 && (
              <p style={{ gridColumn: "1/-1", textAlign: "center" }}>
                Your sketchbook is empty…
              </p>
            )}

            {entries.map((entry: any) => (
              <div key={entry.id}>
                {entry.image && (
                  <img src={entry.image} style={{ width: "100%", height: 140, objectFit: "cover" }} />
                )}
                <h3 style={{ fontStyle: "italic" }}>{entry.species}</h3>
                <p>{entry.location}</p>
                <button onClick={() => deleteEntry(entry.id)}>Remove</button>
              </div>
            ))}
          </div>
        )}

        {view === "new" && (
          <div>
            <input name="species" placeholder="Species" value={form.species} onChange={handleChange} /><br /><br />
            <input name="location" placeholder="Location" value={form.location} onChange={handleChange} /><br /><br />
            <input type="date" name="date" value={form.date} onChange={handleChange} /><br /><br />
            <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} /><br /><br />
            <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} /><br /><br />
            <button onClick={addEntry}>Add Entry</button>
          </div>
        )}

      </div>
    </div>
  );
}
