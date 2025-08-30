import React from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import AudioRecorder from "./AudioRecorder";
import VideoRecorder from "./VideoRecorder";
import DiaryLog from "./DiaryLog";
import TextEntries from "@/app/TextEntries";
export default function Home() {
  return (
    <div className="max-w-lg mx-auto mt-10 p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4 text-white">📔 Simple Offline Diary</h1>
     
      <TextEntries/>
    </div>
  );
}
