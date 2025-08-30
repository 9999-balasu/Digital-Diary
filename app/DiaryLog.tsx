// "use client";
// import React, { useEffect, useState } from "react";
// import { getEntries, DiaryEntry } from "./lib/db";

// const DiaryLog: React.FC = () => {
//   const [entries, setEntries] = useState<DiaryEntry[]>([]);

//   const loadEntries = async () => {
//     const saved = await getEntries();
//     setEntries(saved.sort((a, b) => b.createdAt - a.createdAt));
//   };

//   useEffect(() => {
//     loadEntries();
//   }, []);

//   return (
//     <div className="mb-4 p-4 bg-yellow-50 rounded shadow">
//       <h2 className="font-semibold mb-2">📂 All Entries</h2>
//       <div className="space-y-2">
//         {entries.map((entry) => (
//           <div
//             key={entry.id}
//             className="p-2 border rounded bg-gray-50"
//           >
//             {entry.type === "text" ? entry.note : entry.type.toUpperCase()}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DiaryLog;
"use client";
import React, { useEffect, useState } from "react";
import { getEntries, DiaryEntry } from "./lib/db";

const DiaryLog: React.FC = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  const loadEntries = async () => {
    const saved = await getEntries();
    setEntries(saved.sort((a, b) => b.createdAt - a.createdAt));
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mb-4 p-4 bg-yellow-50 rounded shadow">
      <h2 className="font-semibold mb-4 text-lg text-black">📂 All Entries</h2>
      <div className="space-y-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="p-3 border rounded bg-gray-100 text-gray-800 flex flex-col gap-2"
          >
            {/* Text Entry */}
            {entry.type === "text" && (
              <div className="text-gray-900 font-medium">{entry.note}</div>
            )}

            {/* Audio Entry */}
            {entry.type === "audio" && entry.blob && (
              <div className="flex flex-col gap-1">
                <audio controls src={URL.createObjectURL(entry.blob)} className="w-full" />
                <button
                  className="px-3 py-1 bg-green-500 text-black rounded hover:bg-green-600 w-32"
                  onClick={() => downloadBlob(entry.blob!, `audio_${entry.id}.webm`)}
                >
                  💾 Save Audio
                </button>
              </div>
            )}

            {/* Video Entry */}
            {entry.type === "video" && entry.blob && (
              <div className="flex flex-col gap-1">
                <video controls src={URL.createObjectURL(entry.blob)} className="w-full rounded" />
                <button
                  className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 w-32"
                  onClick={() => downloadBlob(entry.blob!, `video_${entry.id}.webm`)}
                >
                  💾 Save Video
                </button>
              </div>
            )}

            <div className="text-sm text-gray-500">
              {new Date(entry.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiaryLog;
