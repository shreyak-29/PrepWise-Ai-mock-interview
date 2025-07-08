"use client";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import {Button } from "@components/ui/button";
import useSpeechToText from 'react-hook-speech-to-text';
import Image from "next/image";
import { CircleStop, Mic, Mic2Icon } from "lucide-react";
import { toast, Toaster } from "sonner";


function RecordAnswerSection() {
  const [userAnswer, setuserAnswer] = useState('');
  const {
    error,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    console.log("Speech results:", results);
    setuserAnswer(results.map(r => r.transcript).join(' '));
  }, [results]);
  
  useEffect(() => {
    if (!isRecording && userAnswer) {
      if (userAnswer.length < 10) {
        toast("Error while recording answer, please try again");
      }
    }
  }, [isRecording, userAnswer]);
  
  const SaveUserAnswer = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  }

  useEffect(() => {
    if (error) console.error("Speech-to-text error:", error);
  }, [error]);

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

<Button className="my-5" variant="outline" onClick={SaveUserAnswer}
>
  {isRecording ? (
    <h2 className="text-red-400  flex gap-2">
      <CircleStop />Stop Recording...
    </h2>
  ) : (
    <div className="flex gap-2"><Mic/>
    Record Answer</div>
  
  )}
</Button>
<Button onClick={() => {
  console.log("User answer:", userAnswer);
  alert("User answer: " + userAnswer);
}}>Show answer</Button>
{error && <div style={{color: 'red'}}>Speech-to-text error: {error}</div>}
 </div>
  );
}


export default RecordAnswerSection;
