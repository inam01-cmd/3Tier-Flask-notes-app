import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");

  const fetchNotes = async () => {
    const res = await axios.get("/api/notes");
    setNotes(res.data);
  };

  const addNote = async () => {
    if (note.trim() === "") return;
    await axios.post("/api/notes", { note });
    setNote("");
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">📝 My Notes App</h1>
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Enter your note..." value={note} onChange={e => setNote(e.target.value)} />
        <button className="btn btn-primary" onClick={addNote}>Add</button>
      </div>
      <ul className="list-group">
        {notes.map((n, index) => (
          <li className="list-group-item" key={index}>{n.note}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
