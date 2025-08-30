// "use client";
// import React, { useEffect, useState } from "react";
// import { getEntries, deleteEntry, DiaryEntry } from "./lib/db";

// const DiaryList: React.FC = () => {
//   const [entries, setEntries] = useState<DiaryEntry[]>([]);

//   const loadEntries = async () => {
//     const saved = await getEntries();
//     setEntries(saved.sort((a, b) => b.createdAt - a.createdAt));
//   };

//   useEffect(() => {
//     loadEntries();
//   }, []);

//   const handleDelete = async (id: number) => {
//     await deleteEntry(id);
//     loadEntries();
//   };

//   return (
//     <div className="space-y-2 mb-4">
//       <h2 className="font-semibold mb-2">📜 Entries</h2>
//       {entries.map((entry) => (
//         <div
//           key={entry.id}
//           className="p-2 border rounded bg-gray-50 flex justify-between items-center text-black"
//         >
//           <span>
//             {entry.type === "text" ? entry.note : entry.type.toUpperCase()}
//           </span>
//           <button
//             className="px-2 py-1 bg-red-500 text-bkack rounded hover:bg-red-600"
//             onClick={() => handleDelete(entry.id)}
//           >
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DiaryList;
"use client";
import React, { useEffect, useState } from "react";
import { getEntries, deleteEntry, DiaryEntry } from "./lib/db";

const DiaryList: React.FC = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  const loadEntries = async () => {
    const saved = await getEntries();
    setEntries(saved.sort((a, b) => b.createdAt - a.createdAt));
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteEntry(id);
    loadEntries();
  };

  const handleSave = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 mb-6">
      <h2 className="font-semibold text-lg mb-2">📜 Entries</h2>
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="p-3 border rounded bg-gray-100 text-gray-900 flex flex-col gap-2"
        >
          {/* Text entry */}
          {entry.type === "text" && (
            <div className="flex justify-between items-center">
              <span className="font-medium">{entry.note}</span>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleDelete(entry.id)}
              >
                Delete
              </button>
            </div>
          )}

          {/* Audio entry */}
          {entry.type === "audio" && entry.blob && (
            <div>
              <audio controls src={URL.createObjectURL(entry.blob)} className="w-full mb-2" />
              <div className="flex gap-2">
                <button
                  className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => handleSave(entry.blob!, `audio_${entry.id}.webm`)}
                >
                  💾 Save
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDelete(entry.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          )}

          {/* Video entry */}
          {entry.type === "video" && entry.blob && (
            <div>
              <video
                controls
                src={URL.createObjectURL(entry.blob)}
                className="w-full rounded mb-2"
              />
              <div className="flex gap-2">
                <button
                  className="px-2 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
                  onClick={() => handleSave(entry.blob!, `video_${entry.id}.webm`)}
                >
                  💾 Save
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDelete(entry.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          )}

          <div className="text-xs text-gray-500">
            {new Date(entry.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiaryList;
