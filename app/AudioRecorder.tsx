"use client";
import React, { useState, useRef } from "react";
import { addEntry } from "./lib/db";

const AudioRecorder: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => chunksRef.current.push(e.data);
    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      setAudioURL(URL.createObjectURL(blob));
      await addEntry({ type: "audio", blob, createdAt: Date.now() });
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <div className="mb-4 p-4 bg-green-50 rounded shadow">
      <h2 className="font-semibold mb-2 text-black">🎙️ Audio Recorder</h2>
      <div className="flex gap-2 mb-2">
        <button
          onClick={startRecording}
          disabled={recording}
          className="px-3 py-1 bg-green-500 text-black rounded hover:bg-green-600"
        >
          Start
        </button>
        <button
          onClick={stopRecording}
          disabled={!recording}
          className="px-3 py-1 bg-red-500 text-black rounded hover:bg-red-600"
        >
          Stop
        </button>
      </div>
      {audioURL && <audio src={audioURL} controls className="w-full" />}
    </div>
  );
};

export default AudioRecorder;
