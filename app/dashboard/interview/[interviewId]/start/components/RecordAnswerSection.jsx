import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import Image from "next/image";
import { CircleStop, Mic } from "lucide-react";
import { toast } from "sonner";
import { getAnswerFeedback } from "utils/GeminiAiModel";
import { db } from "utils/db";
import { UserAnswer as UserAnswerTable } from "utils/schema";
import dayjs from "dayjs";
import { useUser } from "@clerk/nextjs";

function RecordAnswerSection({
  mockInterviewQuestions,
  activeQuestionIndex,
  setActiveQuestionIndex,
  userEmail,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (results.length > 0) {
      const latestResult = results[results.length - 1];
      setUserAnswer(latestResult.transcript);
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer) {
      if (userAnswer.length < 5) {
        toast("Error while recording answer, please try again");
      }
    }
  }, [isRecording, userAnswer]);

  useEffect(() => {
    if (error) console.error("Speech-to-text error:", error);
  }, [error]);

  const saveToDatabase = async (feedbackResult) => {
    const questionObj = mockInterviewQuestions[activeQuestionIndex];
    if (!questionObj) return;

    try {
      await db.insert(UserAnswerTable).values({
        mockIdRef: interviewData?.mockId || "mock-unknown",
        question: questionObj.question,
        correctAns: feedbackResult?.correctAns || "",
        userAnswer: userAnswer,
        feedback: JSON.stringify(feedbackResult),
        rating: feedbackResult?.rating || "",
        userEmail:
          user?.primaryEmailAddress?.emailAddress || "unknown@example.com",
        createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      });
      console.log("User answer and feedback inserted into DB");
          toast.success("Answer saved successfully!");

    } catch (err) {
      console.error("DB insert error:", err);
      toast.error("Failed to save answer to database");
    }
  };

  useEffect(() => {
    const fetchFeedback = async () => {
      if (!isRecording && userAnswer.length >= 5) {
        const question = mockInterviewQuestions[activeQuestionIndex]?.question;
        if (!question) return;
        setFeedback(null);
        setLoading(true); // start loading
        try {
          const feedbackResult = await getAnswerFeedback(question, userAnswer);
          setFeedback(feedbackResult);
          saveToDatabase(feedbackResult);
        } catch (err) {
          console.error("Feedback error:", err);
          toast.error("Failed to fetch feedback.");
        } finally {
          setLoading(false); // stop loading
        }
      }
    };
    fetchFeedback();
  }, [isRecording, userAnswer, mockInterviewQuestions, activeQuestionIndex]);

  const handleToggleRecording = () => {
    isRecording ? stopSpeechToText() : startSpeechToText();
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center rounded-lg p-5 mt-10">
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

      <Button
        className="my-5"
        variant="outline"
        onClick={handleToggleRecording}
      >
        {isRecording ? (
          <h2 className="text-red-400 flex gap-2">
            <CircleStop /> Stop Recording...
          </h2>
        ) : (
          <div className="flex gap-2">
            <Mic /> Record Answer
          </div>
        )}
      </Button>

      {/* <div className="mt-4">
        <h2 className="font-semibold">Final Answer:</h2>
        <p className="bg-gray-100 p-2 rounded w-[300px]">{userAnswer}</p>
      </div>

      <div className="mt-4">
        <h3 className="font-medium">All Transcripts:</h3>
        <ul className="list-disc pl-5 text-left w-[300px]">
          {results.map((result) => (
            <li key={result.timestamp}>{result.transcript}</li>
          ))}
          {interimResult && <li className="italic text-gray-500">{interimResult}</li>}
        </ul>
      </div> */}

      {/* <Button onClick={() => alert("User answer: " + userAnswer)}>Show Answer</Button> */}

      {error && (
        <div style={{ color: "red" }}>Speech-to-text error: {error}</div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="mt-4">
          <div className="flex items-center gap-2 text-blue-600">
            <div className="h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span>Recording Answer...</span>
          </div>
        </div>
      )}

      {/* Feedback Display
      {!loading && feedback && (
        <div className="mt-4 bg-green-50 p-4 rounded w-[350px]">
          <h3 className="font-semibold mb-2">Feedback:</h3>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(feedback, null, 2)}
          </pre>
        </div>
      )} */}
    </div>
  );
}

export default RecordAnswerSection;
