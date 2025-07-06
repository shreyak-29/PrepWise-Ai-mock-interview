"use client";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import {Button } from "../../../../../../components/ui/button";
import useSpeechToText from 'react-hook-speech-to-text';
import Image from "next/image";
import { CircleStop, Mic, Mic2Icon } from "lucide-react";


function RecordAnswerSection() {
  const [userAnswer, setuserAnswer] = useState('');
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

  useEffect(() => {
    results.map((result) => {
      setuserAnswer(prevAns => prevAns + result?.transcript);
    });
  }, [results]);
  
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center rounded-lg p-5 mt-15">
        <Image alt="webcam"
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

<Button className="my-5" variant="outline" onClick={isRecording?stopSpeechToText:startSpeechToText}>
  {isRecording ? (
    <h2 className="text-red-400  flex gap-2">
      <CircleStop />Stop Recording...
    </h2>
  ) : (
    <div className="flex gap-2"><Mic/>
    Record Answer</div>
  
  )}
</Button>
 </div>
  );
}

export default RecordAnswerSection;
