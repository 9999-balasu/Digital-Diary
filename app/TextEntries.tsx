// "use client";

// import { useState } from "react";

// interface Entry {
//   id: number;
//   text: string;
// }

// export default function TextEntries() {
//   const [entries, setEntries] = useState<Entry[]>([]);
//   const [text, setText] = useState("");

//   const handleSave = () => {
//     if (!text.trim()) return;
//     const newEntry: Entry = {
//       id: Date.now(),
//       text,
//     };
//     setEntries([newEntry, ...entries]);
//     setText(""); // clear input
//   };

//   const handleDelete = (id: number) => {
//     setEntries(entries.filter((entry) => entry.id !== id));
//   };

//   return (
//     <div className="p-4 max-w-lg mx-auto bg-gray-900 text-white rounded-lg shadow-lg">
//       <h2 className="text-xl font-bold mb-4">📝 Text Entries</h2>

//       {/* Text Input */}
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Write your note..."
//         className="w-full p-2 mb-2 border rounded text-black"
//         rows={3}
//       />

//       {/* Save Button */}
//       <button
//         onClick={handleSave}
//         className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//       >
//         Save
//       </button>

//       {/* Entries List */}
//       <div className="mt-4 space-y-2">
//         {entries.length === 0 ? (
//           <p className="text-gray-400">No entries yet.</p>
//         ) : (
//           entries.map((entry) => (
//             <div
//               key={entry.id}
//               className="flex justify-between items-center bg-gray-800 p-2 rounded"
//             >
//               <p className="text-white">{entry.text}</p>
//               <button
//                 onClick={() => handleDelete(entry.id)}
//                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useState, useEffect } from "react";

// interface TextEntry {
//   id: number;
//   text: string;
//   time: string; // store time for each entry
// }

// export default function TextEntries() {
//   const [entries, setEntries] = useState<TextEntry[]>([]);
//   const [newText, setNewText] = useState("");

//   // Add new entry with time
//   const addEntry = () => {
//     if (!newText.trim()) return;
//     const now = new Date();
//     const formattedTime = now.toLocaleString(); // readable date+time
//     const entry: TextEntry = {
//       id: Date.now(),
//       text: newText,
//       time: formattedTime,
//     };
//     setEntries([...entries, entry]);
//     setNewText("");
//   };

//   // Delete entry
//   const deleteEntry = (id: number) => {
//     setEntries(entries.filter((entry) => entry.id !== id));
//   };

//   return (
//     <div className="p-4 bg-white shadow-md rounded-2xl">
//       <h2 className="text-lg font-semibold text-gray-800 mb-3">📝 Text Entries</h2>

//       {/* Input Box */}
//       <div className="flex items-center gap-2 mb-4">
//         <input
//           type="text"
//           placeholder="Write something..."
//           value={newText}
//           onChange={(e) => setNewText(e.target.value)}
//           className="border p-2 rounded-lg flex-1 text-black"
//         />
//         <button
//           onClick={addEntry}
//           className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600"
//         >
//           Save
//         </button>
//       </div>

//       {/* Entries List */}
//       <ul className="space-y-2">
//         {entries.map((entry) => (
//           <li
//             key={entry.id}
//             className="flex justify-between items-center bg-gray-100 p-2 rounded-lg"
//           >
//             <div>
//               <p className="text-black">{entry.text}</p>
//               <p className="text-xs text-gray-500">{entry.time}</p>
//             </div>
//             <button
//               onClick={() => deleteEntry(entry.id)}
//               className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
// "use client";
// import { useState } from "react";

// interface Entry {
//   id: number;
//   text: string;
//   time: string;
// }

// export default function TextEntries() {
//   const [entries, setEntries] = useState<Entry[]>([]);
//   const [text, setText] = useState("");
//   const [editingId, setEditingId] = useState<number | null>(null);

//   const handleSave = () => {
//     if (!text.trim()) return;

//     if (editingId !== null) {
//       // update existing entry
//       setEntries(
//         entries.map((entry) =>
//           entry.id === editingId ? { ...entry, text } : entry
//         )
//       );
//       setEditingId(null);
//     } else {
//       // add new entry
//       const newEntry: Entry = {
//         id: Date.now(),
//         text,
//         time: new Date().toLocaleString(),
//       };
//       setEntries([...entries, newEntry]);
//     }

//     setText("");
//   };

//   const handleDelete = (id: number) => {
//     setEntries(entries.filter((entry) => entry.id !== id));
//   };

//   const handleEdit = (entry: Entry) => {
//     setText(entry.text);
//     setEditingId(entry.id);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold text-white mb-2">📝 Text Entries</h2>
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         className="w-full p-2 border rounded text-white"
//         placeholder="Write something..."
//       />
//       <button
//         onClick={handleSave}
//         className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
//       >
//         {editingId !== null ? "Update" : "Save"}
//       </button>

//       <ul className="mt-4 space-y-2">
//         {entries.map((entry) => (
//           <li
//             key={entry.id}
//             className="border p-2 rounded bg-gray-800 text-white flex justify-between items-center"
//           >
//             <div>
//               <p>{entry.text}</p>
//               <small className="text-gray-400">{entry.time}</small>
//             </div>
//             <div className="space-x-2">
//               <button
//                 onClick={() => handleEdit(entry)}
//                 className="bg-yellow-500 text-white px-2 py-1 rounded"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(entry.id)}
//                 className="bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// "use client";
// import { useState } from "react";

// interface Entry {
//   id: number;
//   text: string;
//   time: string;
// }

// export default function TextEntries() {
//   const [entries, setEntries] = useState<Entry[]>([]);
//   const [text, setText] = useState("");
//   const [editingId, setEditingId] = useState<number | null>(null);

//   const handleSave = () => {
//     if (!text.trim()) return;

//     if (editingId !== null) {
//       // update existing entry
//       setEntries(
//         entries.map((entry) =>
//           entry.id === editingId ? { ...entry, text } : entry
//         )
//       );
//       setEditingId(null);
//     } else {
//       // add new entry
//       const newEntry: Entry = {
//         id: Date.now(),
//         text,
//         time: new Date().toLocaleString(),
//       };
//       setEntries([...entries, newEntry]);
//     }

//     setText("");
//   };

//   const handleDelete = (id: number) => {
//     setEntries(entries.filter((entry) => entry.id !== id));
//   };

//   const handleEdit = (entry: Entry) => {
//     setText(entry.text);
//     setEditingId(entry.id);
//   };

//   const handleDownloadAll = () => {
//     if (entries.length === 0) return;
//     const content = entries
//       .map((entry) => `${entry.time}\n${entry.text}\n\n`)
//       .join("");
//     const blob = new Blob([content], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);

//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `diary_entries_${new Date().toLocaleDateString()}.txt`;
//     link.click();

//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold text-white mb-2">📝 Text Entries</h2>
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         className="w-full p-2 border rounded text-white"
//         placeholder="Write something..."
//       />
//       <div className="flex gap-2 mt-2">
//         <button
//           onClick={handleSave}
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           {editingId !== null ? "Update" : "Save"}
//         </button>
//         <button
//           onClick={handleDownloadAll}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Download All
//         </button>
//       </div>

//       <ul className="mt-4 space-y-2">
//         {entries.map((entry) => (
//           <li
//             key={entry.id}
//             className="border p-2 rounded bg-gray-800 text-white flex justify-between items-center"
//           >
//             <div>
//               <p>{entry.text}</p>
//               <small className="text-gray-400">{entry.time}</small>
//             </div>
//             <div className="space-x-2">
//               <button
//                 onClick={() => handleEdit(entry)}
//                 className="bg-yellow-500 text-white px-2 py-1 rounded"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(entry.id)}
//                 className="bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// "use client";
// import { useState, useRef } from "react";

// interface Entry {
//   id: number;
//   text: string;
//   time: string;
// }

// export default function TextEntries() {
//   const [entries, setEntries] = useState<Entry[]>([]);
//   const [text, setText] = useState("");
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const recognitionRef = useRef<SpeechRecognition | null>(null);
//   const [listening, setListening] = useState(false);

//   // Save or Update Entry
//   const handleSave = () => {
//     if (!text.trim()) return;

//     if (editingId !== null) {
//       setEntries(
//         entries.map((entry) =>
//           entry.id === editingId ? { ...entry, text } : entry
//         )
//       );
//       setEditingId(null);
//     } else {
//       const newEntry: Entry = {
//         id: Date.now(),
//         text,
//         time: new Date().toLocaleString(),
//       };
//       setEntries([...entries, newEntry]);
//     }

//     setText("");
//   };

//   const handleDelete = (id: number) => {
//     setEntries(entries.filter((entry) => entry.id !== id));
//   };

//   const handleEdit = (entry: Entry) => {
//     setText(entry.text);
//     setEditingId(entry.id);
//   };

//   const handleDownloadAll = () => {
//     if (entries.length === 0) return;
//     const content = entries
//       .map((entry) => `${entry.time}\n${entry.text}\n\n`)
//       .join("");
//     const blob = new Blob([content], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);

//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `diary_entries_${new Date().toLocaleDateString()}.txt`;
//     link.click();

//     URL.revokeObjectURL(url);
//   };

//   // Speech-to-Text
//   const toggleListening = () => {
//     if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
//       alert("Speech Recognition not supported in this browser.");
//       return;
//     }

//     const SpeechRecognition =
//       (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
//     if (!recognitionRef.current) {
//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.continuous = true;
//       recognitionRef.current.interimResults = true;
//       recognitionRef.current.lang = "en-US";

//       recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
//         const transcript = Array.from(event.results)
//           .map((result) => result[0].transcript)
//           .join("");
//         setText(transcript);
//       };

//       recognitionRef.current.onend = () => setListening(false);
//     }

//     if (!listening) {
//       recognitionRef.current.start();
//       setListening(true);
//     } else {
//       recognitionRef.current.stop();
//       setListening(false);
//     }
//   };




// / Mock translation function (Telugu → English)
//   const translateToEnglish = async (text: string) => {
//     // Replace this with actual API call to OpenAI or Google Translate
//     return `Translated(EN): ${text}`;
//   };

//   // Speech-to-Telugu & Translate to English
//   const toggleTeluguSpeech = async () => {
//     if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
//       alert("Speech Recognition not supported in this browser.");
//       return;
//     }

//     const SpeechRecognition =
//       (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

//     if (!recognitionRef.current) {
//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.continuous = true;
//       recognitionRef.current.interimResults = true;
//       recognitionRef.current.lang = "te-IN"; // Telugu

//       recognitionRef.current.onresult = async (event: SpeechRecognitionEvent) => {
//         const transcript = Array.from(event.results)
//           .map((result) => result[0].transcript)
//           .join("");
//         const translated = await translateToEnglish(transcript);
//         setText(translated);
//       };

//       recognitionRef.current.onend = () => setListening(false);
//     }

//     if (!listening) {
//       recognitionRef.current.start();
//       setListening(true);
//     } else {
//       recognitionRef.current.stop();
//       setListening(false);
//     }
//   };




//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold text-white mb-2">📝 Text Entries</h2>
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         className="w-full p-2 border rounded text-white"
//         placeholder="Write something..."
//       />
//       <div className="flex gap-2 mt-2">
//         <button
//           onClick={handleSave}
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           {editingId !== null ? "Update" : "Save"}
//         </button>
//         <button
//           onClick={handleDownloadAll}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Download All
//         </button>
//         <button
//           onClick={toggleListening}
//           className={`px-4 py-2 rounded text-white ${
//             listening ? "bg-red-500" : "bg-purple-500"
//           }`}
//         >
//           {listening ? "Stop Speaking" : "Speak to Write"}
//         </button>
//       </div>

//       <ul className="mt-4 space-y-2">
//         {entries.map((entry) => (
//           <li
//             key={entry.id}
//             className="border p-2 rounded bg-gray-800 text-white flex justify-between items-center"
//           >
//             <div>
//               <p>{entry.text}</p>
//               <small className="text-gray-400">{entry.time}</small>
//             </div>
//             <div className="space-x-2">
//               <button
//                 onClick={() => handleEdit(entry)}
//                 className="bg-yellow-500 text-white px-2 py-1 rounded"
//               >
//                 Edit
//              </button>

//  <button
//           onClick={toggleTeluguSpeech}
//           className={`px-4 py-2 rounded text-white ${
//             listening ? "bg-red-500" : "bg-purple-500"
//           }`}
//         >
//           {listening ? "Stop Telugu → English" : "Speak in Telugu"}
//         </button>


//               <button
//                 onClick={() => handleDelete(entry.id)}
//                 className="bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }






"use client";
import { useState, useRef } from "react";

interface Entry {
  id: number;
  text: string;
  time: string;
}

export default function TextEntries() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [listening, setListening] = useState(false);
  const [teluguListening, setTeluguListening] = useState(false);

  // Save or Update Entry
  const handleSave = () => {
    if (!text.trim()) return;

    if (editingId !== null) {
      setEntries(
        entries.map((entry) =>
          entry.id === editingId ? { ...entry, text } : entry
        )
      );
      setEditingId(null);
    } else {
      const newEntry: Entry = {
        id: Date.now(),
        text,
        time: new Date().toLocaleString(),
      };
      setEntries([...entries, newEntry]);
    }

    setText("");
  };

  const handleDelete = (id: number) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const handleEdit = (entry: Entry) => {
    setText(entry.text);
    setEditingId(entry.id);
  };

  const handleDownloadAll = () => {
    if (entries.length === 0) return;
    const content = entries
      .map((entry) => `${entry.time}\n${entry.text}\n\n`)
      .join("");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `diary_entries_${new Date().toLocaleDateString()}.txt`;
    link.click();

    URL.revokeObjectURL(url);
  };

  // Speech-to-Text English
  const toggleListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setText(transcript);
      };

      recognitionRef.current.onend = () => setListening(false);
    }

    if (!listening) {
      recognitionRef.current.start();
      setListening(true);
    } else {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  // Mock translation function (Telugu → English)
  const translateToEnglish = async (text: string) => {
    return `Translated(EN): ${text}`;
  };

  // Speech-to-Telugu & Translate to English
  // const toggleTeluguSpeech = async () => {
  //   if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
  //     alert("Speech Recognition not supported in this browser.");
  //     return;
  //   }

  //   const SpeechRecognition =
  //     (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  //   if (!recognitionRef.current) {
  //     recognitionRef.current = new SpeechRecognition();
  //     recognitionRef.current.continuous = true;
  //     recognitionRef.current.interimResults = true;
  //     recognitionRef.current.lang = "te-IN"; // Telugu

  //     recognitionRef.current.onresult = async (event: SpeechRecognitionEvent) => {
  //       const transcript = Array.from(event.results)
  //         .map((result) => result[0].transcript)
  //         .join("");
  //       const translated = await translateToEnglish(transcript);
  //       setText(translated);
  //     };

  //     recognitionRef.current.onend = () => setTeluguListening(false);
  //   }

  //   if (!teluguListening) {
  //     recognitionRef.current.start();
  //     setTeluguListening(true);
  //   } else {
  //     recognitionRef.current.stop();
  //     setTeluguListening(false);
  //   }
  // };
// Speech-to-Telugu & Translate to English
const toggleTeluguSpeech = async () => {
  if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
    alert("Speech Recognition not supported in this browser.");
    return;
  }

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!teluguListening) {
    // Create a new instance for Telugu
    const teluguRec = new SpeechRecognition();
    teluguRec.continuous = true;
    teluguRec.interimResults = true;
    teluguRec.lang = "te-IN";

    teluguRec.onresult = async (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      const translated = await translateToEnglish(transcript);
      setText(translated);
    };

    teluguRec.onend = () => setTeluguListening(false);

    teluguRec.start();
    setTeluguListening(true);

    // Save the instance so we can stop it
    recognitionRef.current = teluguRec;
  } else {
    recognitionRef.current?.stop();
    setTeluguListening(false);
  }
};

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-white mb-2">📝 Text Entries</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded bg-gray-700 text-white"
        placeholder="Write something..."
      />
      <div className="flex gap-2 mt-2 flex-wrap">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {editingId !== null ? "Update" : "Save"}
        </button>
        <button
          onClick={handleDownloadAll}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Download All
        </button>
        <button
          onClick={toggleListening}
          className={`px-4 py-2 rounded text-white ${
            listening ? "bg-red-500" : "bg-purple-500"
          }`}
        >
          {listening ? "Stop Speaking" : "Speak to Write"}
        </button>
        <button
          onClick={toggleTeluguSpeech}
          className={`px-4 py-2 rounded text-white ${
            teluguListening ? "bg-red-500" : "bg-yellow-500"
          }`}
        >
          {teluguListening ? "Stop Telugu → English" : "Speak in Telugu"}
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className="border p-2 rounded bg-gray-800 text-white flex justify-between items-center"
          >
            <div>
              <p>{entry.text}</p>
              <small className="text-gray-400">{entry.time}</small>
            </div>
            <div className="space-x-2 flex flex-wrap">
              <button
                onClick={() => handleEdit(entry)}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(entry.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}







