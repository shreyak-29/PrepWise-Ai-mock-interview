"use client";
import React from "react";
import Webcam from "react-webcam";
import {Button } from "../../../../../../components/ui/button";
import useSpeechToText from 'react-hook-speech-to-text';
import Image from "next/image";


function RecordAnswerSection() {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });
  
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center rounded-lg p-5 mt-15">
        <Image
          src={"/webcam.png"}
          width={350}
          height={350}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 400,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>

<Button className="my-5" variant="outline">Record Audio and Video</Button>
<h1>Recording: {isRecording.toString()}</h1>
      <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul>
      {error && <div style={{color: 'red'}}>Speech-to-text error: {error}</div>}
 </div>
  );
}

export default RecordAnswerSection;
