





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
//   const [teluguListening, setTeluguListening] = useState(false);

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

//   // Speech-to-Text English
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

//   // Mock translation function (Telugu → English)
//   const translateToEnglish = async (text: string) => {
//     return `Translated(EN): ${text}`;
//   };

//   // Speech-to-Telugu & Translate to English
//   // const toggleTeluguSpeech = async () => {
//   //   if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
//   //     alert("Speech Recognition not supported in this browser.");
//   //     return;
//   //   }

//   //   const SpeechRecognition =
//   //     (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

//   //   if (!recognitionRef.current) {
//   //     recognitionRef.current = new SpeechRecognition();
//   //     recognitionRef.current.continuous = true;
//   //     recognitionRef.current.interimResults = true;
//   //     recognitionRef.current.lang = "te-IN"; // Telugu

//   //     recognitionRef.current.onresult = async (event: SpeechRecognitionEvent) => {
//   //       const transcript = Array.from(event.results)
//   //         .map((result) => result[0].transcript)
//   //         .join("");
//   //       const translated = await translateToEnglish(transcript);
//   //       setText(translated);
//   //     };

//   //     recognitionRef.current.onend = () => setTeluguListening(false);
//   //   }

//   //   if (!teluguListening) {
//   //     recognitionRef.current.start();
//   //     setTeluguListening(true);
//   //   } else {
//   //     recognitionRef.current.stop();
//   //     setTeluguListening(false);
//   //   }
//   // };
// // Speech-to-Telugu & Translate to English
// const toggleTeluguSpeech = async () => {
//   if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
//     alert("Speech Recognition not supported in this browser.");
//     return;
//   }

//   const SpeechRecognition =
//     (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

//   if (!teluguListening) {
//     // Create a new instance for Telugu
//     const teluguRec = new SpeechRecognition();
//     teluguRec.continuous = true;
//     teluguRec.interimResults = true;
//     teluguRec.lang = "te-IN";

//     teluguRec.onresult = async (event: SpeechRecognitionEvent) => {
//       const transcript = Array.from(event.results)
//         .map((result) => result[0].transcript)
//         .join("");
//       const translated = await translateToEnglish(transcript);
//       setText(translated);
//     };

//     teluguRec.onend = () => setTeluguListening(false);

//     teluguRec.start();
//     setTeluguListening(true);

//     // Save the instance so we can stop it
//     recognitionRef.current = teluguRec;
//   } else {
//     recognitionRef.current?.stop();
//     setTeluguListening(false);
//   }
// };

//   return (
//     <div className="p-4 max-w-lg mx-auto">
//       <h2 className="text-xl font-bold text-white mb-2">📝 Text Entries</h2>
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         className="w-full p-2 border rounded bg-gray-700 text-white"
//         placeholder="Write something..."
//       />
//       <div className="flex gap-2 mt-2 flex-wrap">
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
//         <button
//           onClick={toggleTeluguSpeech}
//           className={`px-4 py-2 rounded text-white ${
//             teluguListening ? "bg-red-500" : "bg-yellow-500"
//           }`}
//         >
//           {teluguListening ? "Stop Telugu → English" : "Speak in Telugu"}
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
//             <div className="space-x-2 flex flex-wrap">
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

// // Extend window interface to avoid `any`
// declare global {
//   interface Window {
//     SpeechRecognition: typeof SpeechRecognition;
//     webkitSpeechRecognition: typeof SpeechRecognition;
//   }
// }

// export default function TextEntries() {
//   const [entries, setEntries] = useState<Entry[]>([]);
//   const [text, setText] = useState("");
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const recognitionRef = useRef<SpeechRecognition | null>(null);
//   const [listening, setListening] = useState(false);
//   const [teluguListening, setTeluguListening] = useState(false);

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

//   // English Speech-to-Text
//   const toggleListening = () => {
//     const SpeechRecognitionClass =
//       window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognitionClass) {
//       alert("Speech Recognition not supported in this browser.");
//       return;
//     }

//     if (!recognitionRef.current) {
//       recognitionRef.current = new SpeechRecognitionClass();
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

//   // Telugu Speech → English
//   const translateToEnglish = async (input: string) => {
//     // Replace with real API translation if needed
//     return `Translated(EN): ${input}`;
//   };

//   const toggleTeluguSpeech = async () => {
//     const SpeechRecognitionClass =
//       window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognitionClass) {
//       alert("Speech Recognition not supported in this browser.");
//       return;
//     }

//     if (!teluguListening) {
//       const teluguRec = new SpeechRecognitionClass();
//       teluguRec.continuous = true;
//       teluguRec.interimResults = true;
//       teluguRec.lang = "te-IN";

//       teluguRec.onresult = async (event: SpeechRecognitionEvent) => {
//         const transcript = Array.from(event.results)
//           .map((result) => result[0].transcript)
//           .join("");
//         const translated = await translateToEnglish(transcript);
//         setText(translated);
//       };

//       teluguRec.onend = () => setTeluguListening(false);

//       teluguRec.start();
//       setTeluguListening(true);
//       recognitionRef.current = teluguRec;
//     } else {
//       recognitionRef.current?.stop();
//       setTeluguListening(false);
//     }
//   };

//   return (
//     <div className="p-4 max-w-lg mx-auto">
//       <h2 className="text-xl font-bold text-white mb-2">📝 Text Entries</h2>
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         className="w-full p-2 border rounded bg-gray-700 text-white"
//         placeholder="Write something..."
//       />
//       <div className="flex gap-2 mt-2 flex-wrap">
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
//         <button
//           onClick={toggleTeluguSpeech}
//           className={`px-4 py-2 rounded text-white ${
//             teluguListening ? "bg-red-500" : "bg-yellow-500"
//           }`}
//         >
//           {teluguListening ? "Stop Telugu → English" : "Speak in Telugu"}
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
//             <div className="space-x-2 flex flex-wrap">
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

  // English Speech-to-Text
  const toggleListening = () => {
    const SpeechRecognitionClass =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    if (!recognitionRef.current || recognitionRef.current.lang !== "en-US") {
      const rec = new SpeechRecognitionClass();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "en-US";

      rec.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setText(transcript);
      };

      rec.onend = () => setListening(false);

      rec.start();
      setListening(true);
      recognitionRef.current = rec;
    } else {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  // Mock translation function (Telugu → English)
  const translateToEnglish = async (text: string) => {
    return `Translated(EN): ${text}`;
  };

  // Telugu Speech-to-English
  const toggleTeluguSpeech = async () => {
    const SpeechRecognitionClass =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    if (!teluguListening) {
      const rec = new SpeechRecognitionClass();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "te-IN";

      rec.onresult = async (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        const translated = await translateToEnglish(transcript);
        setText(translated);
      };

      rec.onend = () => setTeluguListening(false);

      rec.start();
      setTeluguListening(true);
      recognitionRef.current = rec;
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
