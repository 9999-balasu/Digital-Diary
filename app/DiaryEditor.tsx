"use client";
import React, { useState } from "react";
import { addEntry } from "./lib/db";

const DiaryEditor: React.FC<{ onAdd?: () => void }> = ({ onAdd }) => {
  const [note, setNote] = useState("");

  const handleAdd = async () => {
    if (!note.trim()) return;
    await addEntry({ type: "text", note, createdAt: Date.now() });
    setNote("");
    onAdd?.();
  };

  return (
    <div className="mb-4 p-4 bg-blue-50 rounded shadow">
      <h2 className="font-semibold mb-2 text-gray-950">📝 New Entry</h2>
      <textarea
        className="w-full p-2 border rounded mb-2 text-black"
        placeholder="Write your note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleAdd}
      >
        Add Entry
      </button>
    </div>
  );
};

export default DiaryEditor;
