"use client";
import { eq } from "drizzle-orm";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Ghost, Lightbulb, WebcamIcon, Video, Mic, Shield, Clock, CheckCircle, PlayCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use } from "react";

function Interview({ params }) {
  const { interviewId } = use(params);
  
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(interviewId);
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading interview details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Interview Setup</h1>
              <p className="text-sm text-gray-500">Prepare for your mock interview session</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="w-6 h-6 text-green-200" />
              <h2 className="text-xl sm:text-2xl font-bold">Ready to begin your interview! 🎯</h2>
            </div>
            <p className="text-blue-100 text-sm sm:text-base">
              Your AI-powered mock interview is set up and ready. Review the details below and test your camera setup.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Left Column - Interview Details */}
          <div className="space-y-6">
            {/* Job Details Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                  <Ghost className="w-5 h-5 text-blue-600" />
                  Interview Details
                </h3>
              </div>
              
              <div className="p-6 space-y-4">
                {interviewData && (
                  <>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        JOB POSITION
                      </div>
                      <div className="font-semibold text-gray-800 text-base sm:text-lg">
                        {interviewData.jobPosition}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-2 text-purple-600 font-medium text-sm">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        TECH STACK & DESCRIPTION
                      </div>
                      <div className="text-gray-700 text-sm sm:text-base leading-relaxed">
                        {interviewData.jobDesc}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-2 text-green-600 font-medium text-sm">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        EXPERIENCE LEVEL
                      </div>
                      <div className="font-semibold text-gray-800 text-base sm:text-lg">
                        {interviewData.jobExperience} {interviewData.jobExperience === "1" ? "Year" : "Years"}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Information Card */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-amber-200 bg-gradient-to-r from-amber-100 to-orange-100">
                <h3 className="font-bold text-lg text-amber-800 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                  Important Information
                </h3>
              </div>
              
              <div className="p-6">
                <div className="space-y-4 text-sm text-amber-800">
                  <div className="flex items-start gap-3">
                    <Video className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p>Enable your camera and microphone to record the interview session for analysis.</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p>You'll answer 5 carefully selected questions. Each response will be analyzed for feedback.</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Shield className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p>Your privacy is protected - recordings are processed securely and deleted after analysis.</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-amber-200">
                  <p className="text-xs text-amber-700 font-medium">
                    <strong>Privacy Note:</strong> No personal data is stored. All recordings are used solely for generating your performance report.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Camera Setup */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                  <WebcamIcon className="w-5 h-5 text-purple-600" />
                  Camera & Audio Setup
                </h3>
              </div>
              
              <div className="p-6">
                <div className="aspect-square max-w-sm mx-auto mb-6">
                  {webCamEnabled ? (
                    <div className="relative">
                      <Webcam
                        onUserMedia={() => setWebCamEnabled(true)}
                        onUserMediaError={() => setWebCamEnabled(false)}
                        mirrored={true}
                        className="w-full h-full object-cover rounded-xl shadow-lg"
                      />
                      <div className="absolute top-3 right-3 flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        Live
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-300">
                      <WebcamIcon className="w-16 h-16 mb-4 text-gray-400" />
                      <p className="text-sm font-medium mb-2">Camera Disabled</p>
                      <p className="text-xs text-center px-4">Click below to enable your camera and microphone</p>
                    </div>
                  )}
                </div>

                {!webCamEnabled && (
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl py-3 shadow-lg hover:shadow-xl transition-all duration-200"
                    onClick={() => setWebCamEnabled(true)}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Video className="w-4 h-4" />
                      <Mic className="w-4 h-4" />
                      <span>Enable Camera & Microphone</span>
                    </div>
                  </Button>
                )}

                {webCamEnabled && (
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-green-600 font-medium mb-4">
                      <CheckCircle className="w-5 h-5" />
                      <span>Camera and microphone are ready!</span>
                    </div>
                    <Button
                      variant="outline"
                      className="text-gray-600 border-gray-300 hover:bg-gray-50"
                      onClick={() => setWebCamEnabled(false)}
                    >
                      Disable Camera
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-indigo-600" />
                Quick Tips for Success
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Ensure good lighting on your face</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Speak clearly and at a moderate pace</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Look directly at the camera when speaking</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Take your time to think before answering</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Start Interview Button */}
        <div className="mt-8 flex justify-center">
          <Link href={`/dashboard/interview/${interviewId}/start`}>
            <Button 
              disabled={!webCamEnabled}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-3">
                <PlayCircle className="w-6 h-6" />
                <span>Start Interview</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </Button>
          </Link>
        </div>

        {!webCamEnabled && (
          <p className="text-center text-sm text-gray-500 mt-4">
            Please enable your camera and microphone to start the interview
          </p>
        )}
      </div>
    </div>
  );
}

export default Interview;