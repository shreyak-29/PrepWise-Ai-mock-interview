import React, { useState } from "react";
import { Lightbulb, Volume2, VolumeX, Play, Pause, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@components/ui/button";

function QuestionSection({ mockInterviewQuestions, activeQuestionIndex, setActiveQuestionIndex, interviewData }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechInstance, setSpeechInstance] = useState(null);

  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      // Stop any current speech
      if (speechInstance) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setSpeechInstance(null);
        return;
      }

      const speech = new SpeechSynthesisUtterance(text);
      speech.rate = 0.9;
      speech.pitch = 1;
      speech.volume = 0.8;
      
      speech.onstart = () => setIsSpeaking(true);
      speech.onend = () => {
        setIsSpeaking(false);
        setSpeechInstance(null);
      };
      speech.onerror = () => {
        setIsSpeaking(false);
        setSpeechInstance(null);
      };

      setSpeechInstance(speech);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, browser doesn't support text to speech");
    }
  };

  const stopSpeech = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeechInstance(null);
    }
  };

  if (!mockInterviewQuestions || mockInterviewQuestions.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-center h-32">
          <div className="text-center text-gray-500">
            <MessageCircle className="w-8 h-8 mx-auto mb-2" />
            <p>Loading interview questions...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Question Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 border-b border-gray-100">
          <h3 className="font-semibold text-base text-gray-800 flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-blue-600" />
            Interview Questions
            <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
              {activeQuestionIndex + 1} of {mockInterviewQuestions.length}
            </span>
          </h3>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
            {mockInterviewQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setActiveQuestionIndex(index)}
                className={`relative p-2 rounded-lg text-xs font-medium transition-all duration-200 border hover:scale-105 ${
                  activeQuestionIndex === index
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-md"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                }`}
              >
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-xs opacity-75">Q</span>
                  <span className="text-sm font-bold">{index + 1}</span>
                </div>
                {activeQuestionIndex === index && (
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Current Question Display */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 px-4 py-3 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h3 className="font-semibold text-base text-gray-800">
              Question #{activeQuestionIndex + 1}
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => textToSpeech(mockInterviewQuestions[activeQuestionIndex]?.question)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium text-xs transition-all duration-200 ${
                  isSpeaking
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                }`}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-3 h-3" />
                    <span className="hidden sm:inline">Stop</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3 h-3" />
                    <span className="hidden sm:inline">Listen</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-100">
            <p className="text-base md:text-lg text-gray-800 leading-relaxed font-medium">
              {mockInterviewQuestions[activeQuestionIndex]?.question}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-600">Progress</span>
              <span className="text-xs font-medium text-gray-800">
                {Math.round(((activeQuestionIndex + 1) / mockInterviewQuestions.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${((activeQuestionIndex + 1) / mockInterviewQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions Card */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-amber-200 bg-gradient-to-r from-amber-100 to-orange-100">
          <h3 className="font-semibold text-base text-amber-800 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            Instructions
          </h3>
        </div>
        
        <div className="p-4">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-amber-800">1</span>
              </div>
              <div>
                <p className="font-medium text-amber-800 text-sm mb-0.5">Record Your Answer</p>
                <p className="text-xs text-amber-700">Click "Record Answer" when ready to respond.</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-amber-800">2</span>
              </div>
              <div>
                <p className="font-medium text-amber-800 text-sm mb-0.5">Take Your Time</p>
                <p className="text-xs text-amber-700">Think carefully before you start recording.</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-amber-800">3</span>
              </div>
              <div>
                <p className="font-medium text-amber-800 text-sm mb-0.5">Get Feedback</p>
                <p className="text-xs text-amber-700">Receive detailed feedback after all questions.</p>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-amber-200">
            <div className="bg-amber-100 rounded-lg p-2">
              <p className="text-xs text-amber-800 font-medium flex items-center gap-1">
                <Lightbulb className="w-3 h-3" />
                <span><strong>Tip:</strong> Use audio feature to hear questions again!</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Helper */}
      {mockInterviewQuestions.length > 1 && (
        <div className="flex justify-between items-center bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <button
            onClick={() => setActiveQuestionIndex(Math.max(0, activeQuestionIndex - 1))}
            disabled={activeQuestionIndex === 0}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          <span className="text-xs text-gray-500 font-medium">
            {activeQuestionIndex + 1} of {mockInterviewQuestions.length}
          </span>

          <button
            onClick={() => setActiveQuestionIndex(Math.min(mockInterviewQuestions.length - 1, activeQuestionIndex + 1))}
            disabled={activeQuestionIndex === mockInterviewQuestions.length - 1}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Next
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Submit Interview Button - Only show on last question */}
      {activeQuestionIndex === mockInterviewQuestions.length - 1 && interviewData && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-green-200 bg-gradient-to-r from-green-100 to-emerald-100">
            <h3 className="font-semibold text-base text-green-800 flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Ready to Submit?
            </h3>
          </div>
          
          <div className="p-4">
            <div className="text-center space-y-3">
              <p className="text-green-700 font-medium text-sm">
                Great job! You've reached the final question.
              </p>
              <p className="text-xs text-green-600">
                Submit to receive detailed feedback and analysis.
              </p>
              
              <div className="pt-2">
                <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 mx-auto">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Submit Interview
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionSection;