"use client";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@components/ui/button";
import useSpeechToText from 'react-hook-speech-to-text';
import Image from "next/image";
import { CircleStop, Mic } from "lucide-react";
import { toast } from "sonner";

function RecordAnswerSection() {
  const [userAnswer, setUserAnswer] = useState('');
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

  // Update userAnswer to only the latest result
  useEffect(() => {
    if (results.length > 0) {
      const latestResult = results[results.length - 1];
      console.log("Latest speech result:", latestResult);
      setUserAnswer(latestResult.transcript);
    }
  }, [results]);

  // Handle recording stop with validation
  useEffect(() => {
    if (!isRecording && userAnswer) {
      if (userAnswer.length < 5) {
        toast("Error while recording answer, please try again");
      }
    }
  }, [isRecording, userAnswer]);

  // Handle speech-to-text errors
  useEffect(() => {
    if (error) console.error("Speech-to-text error:", error);
  }, [error]);

  const handleToggleRecording = () => {
    isRecording ? stopSpeechToText() : startSpeechToText();
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center rounded-lg p-5 mt-15">
        <Image
          alt="webcam"
          src="/webcam.png"
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

      {/* Start/Stop Button */}
      <Button className="my-5" variant="outline" onClick={handleToggleRecording}>
        {isRecording ? (
          <h2 className="text-red-400 flex gap-2">
            <CircleStop /> Stop Recording...
          </h2>
        ) : (
          <div className="flex gap-2"><Mic /> Record Answer</div>
        )}
      </Button>

      {/* Display final user answer */}
      <div className="mt-4">
        <h2 className="font-semibold">Final Answer:</h2>
        <p className="bg-gray-100 p-2 rounded w-[300px]">{userAnswer}</p>
      </div>

      {/* Show all speech results */}
      <div className="mt-4">
        <h3 className="font-medium">All Transcripts:</h3>
        <ul className="list-disc pl-5 text-left w-[300px]">
          {results.map((result) => (
            <li key={result.timestamp}>{result.transcript}</li>
          ))}
          {interimResult && <li className="italic text-gray-500">{interimResult}</li>}
        </ul>
      </div>

      {/* Debug Button */}
      <Button onClick={() => alert("User answer: " + userAnswer)}>Show Answer</Button>

      {/* Error display */}
      {error && <div style={{ color: 'red' }}>Speech-to-text error: {error}</div>}
    </div>
  );
}

export default RecordAnswerSection;
