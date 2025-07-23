import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import Image from "next/image";
import { 
  CircleStop, 
  Mic, 
  Video, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  MessageSquare,
  Loader2,
  Volume2
} from "lucide-react";
import { toast } from "sonner";
import { getAnswerFeedback } from "@/utils/GeminiAiModel";
import { db } from "@/utils/db";
import { UserAnswer as UserAnswerTable } from "@/utils/schema";
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
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
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
    if (isRecording) {
      const id = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
      setIntervalId(id);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
      if (userAnswer && userAnswer.length < 5) {
        toast.error("Recording too short, please try again with a longer response");
      }
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRecording]);

  useEffect(() => {
    if (error) {
      console.error("Speech-to-text error:", error);
      toast.error("Speech recognition error. Please try again.");
    }
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
        setLoading(true);
        try {
          const feedbackResult = await getAnswerFeedback(question, userAnswer);
          setFeedback(feedbackResult);
          saveToDatabase(feedbackResult);
        } catch (err) {
          console.error("Feedback error:", err);
          toast.error("Failed to fetch feedback.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchFeedback();
  }, [isRecording, userAnswer, mockInterviewQuestions, activeQuestionIndex]);

  const handleToggleRecording = () => {
    if (isRecording) {
      stopSpeechToText();
      setRecordingDuration(0);
    } else {
      setUserAnswer("");
      setFeedback(null);
      startSpeechToText();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Video Recording Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-red-50 to-pink-50 px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
              <Video className="w-5 h-5 text-red-600" />
              Record Your Answer
            </h3>
            {isRecording && (
              <div className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                Recording • {formatTime(recordingDuration)}
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          {/* Camera Display */}
          <div className="relative mx-auto max-w-md">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              {/* Webcam Frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl overflow-hidden">
                <Webcam
                  mirrored={true}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Recording Overlay */}
              {isRecording && (
                <div className="absolute inset-0 border-4 border-red-500 rounded-2xl animate-pulse"></div>
              )}
              
              {/* Status Indicators */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                  isRecording 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-800/80 text-white'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    isRecording ? 'bg-white animate-pulse' : 'bg-gray-400'
                  }`}></div>
                  {isRecording ? 'Recording' : 'Ready'}
                </div>
                
                {isRecording && (
                  <div className="bg-gray-800/80 text-white px-2 py-1 rounded text-xs font-mono">
                    {formatTime(recordingDuration)}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recording Controls */}
          <div className="mt-6 text-center">
            <Button
              onClick={handleToggleRecording}
              disabled={loading}
              className={`px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 ${
                isRecording
                  ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                {isRecording ? (
                  <>
                    <CircleStop className="w-6 h-6" />
                    <span>Stop Recording</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-6 h-6" />
                    <span>Start Recording</span>
                  </>
                )}
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Real-time Transcript */}
      {/* {(isRecording || interimResult || userAnswer) && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              Live Transcript
            </h3>
          </div>
          
          <div className="p-6">
            <div className="bg-gray-50 rounded-xl p-4 min-h-[100px] max-h-[200px] overflow-y-auto">
              {isRecording && interimResult && (
                <p className="text-gray-500 italic mb-2">
                  <span className="text-blue-600 font-medium">Speaking:</span> {interimResult}
                </p>
              )}
              
              {userAnswer ? (
                <p className="text-gray-800 leading-relaxed">
                  <span className="text-green-600 font-medium">Final Answer:</span> {userAnswer}
                </p>
              ) : (
                <p className="text-gray-400 text-center py-8">
                  {isRecording ? "Listening... speak clearly into your microphone" : "Click 'Start Recording' to begin"}
                </p>
              )}
            </div>
          </div>
        </div>
      )} */}

      {/* Processing Status */}
      {loading && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-center gap-3 text-blue-600">
            <Loader2 className="w-6 h-6 animate-spin" />
            <div className="text-center">
              <p className="font-medium">Processing your answer...</p>
              <p className="text-sm text-gray-500 mt-1">Generating AI feedback</p>
            </div>
          </div>
        </div>
      )}

      {/* Success State */}
      {!loading && userAnswer && userAnswer.length >= 5 && !isRecording && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Answer Recorded Successfully
            </h3>
          </div>
          
          <div className="p-6">
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-800 mb-1">Response Saved</p>
                  <p className="text-sm text-green-700">
                    Your answer has been recorded and will be included in your final feedback report.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-red-50 to-pink-50 px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              Recording Error
            </h3>
          </div>
          
          <div className="p-6">
            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-red-800 mb-1">Speech Recognition Error</p>
                  <p className="text-sm text-red-700">
                    There was an issue with speech recognition. Please check your microphone and try again.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tips Card */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100">
        <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-indigo-600" />
          Recording Tips
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>Speak clearly and at a moderate pace</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>Ensure your microphone is working</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>Keep background noise to a minimum</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>Take your time to think before speaking</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecordAnswerSection;