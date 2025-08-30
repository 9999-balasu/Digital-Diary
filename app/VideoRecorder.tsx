"use client";
import React, { useState, useRef } from "react";
import { addEntry } from "./lib/db";

const VideoRecorder: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if (videoRef.current) videoRef.current.srcObject = stream;

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => chunksRef.current.push(e.data);
    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      setVideoURL(URL.createObjectURL(blob));
      await addEntry({ type: "video", blob, createdAt: Date.now() });
      if (videoRef.current) videoRef.current.srcObject = null;
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <div className="mb-4 p-4 bg-purple-50 rounded shadow">
      <h2 className="font-semibold mb-2 text-black">🎥 Video Recorder</h2>
      <video ref={videoRef} autoPlay className="w-full mb-2 rounded border" />
      <div className="flex gap-2">
        <button
          onClick={startRecording}
          disabled={recording}
          className="px-3 py-1 bg-purple-500 text-black rounded hover:bg-purple-600"
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
      {videoURL && <video src={videoURL} controls className="mt-2 w-full rounded border" />}
    </div>
  );
};

export default VideoRecorder;
