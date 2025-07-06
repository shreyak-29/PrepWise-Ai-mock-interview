"use client";
import { eq } from "drizzle-orm";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Ghost, Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use } from "react";
function Interview({ params }) {
    const { interviewId } = use(params);
  
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  useEffect(() => {
    console.log(interviewId);
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId));
    setInterviewData(result[0]);
  };
  return (
    <div className="m-10 ">
      <h2 className="font-bold text-2xl ">Let's get started</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-5 rounded-lg">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col gap-5 rounded-lg border-black border p-5">
            {interviewData && (
              <h2 className="text-lg">
                <strong>Job Position / Job Role:</strong>{" "}
                {interviewData.jobPosition}
              </h2>
            )}
            {interviewData && (
              <h2 className="text-lg">
                <strong>Job Description/Tech Stack:</strong>{" "}
                {interviewData.jobDesc}
              </h2>
            )}

            {interviewData && (
              <h2 className="text-lg">
                <strong>Years of Experience:</strong>{" "}
                {interviewData.jobExperience}
              </h2>
            )}
          </div>

          <div className="p-5 border rounded-lg border-black bg-amber-100">
            <h2 className=" flex items-center ">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <div className="space-y-1 text-sm">
              <p>Enable the camera and microphone to record the interview.</p>
              <p>
                The recording will be used to generate a transcript and analysis
                of your performance.
              </p>
              <p>
                You will have to answer 5 questions in total, and a report will
                be provided based on that.
              </p>
              <p>
                <strong>Note:</strong> We never store any personal information
                or data. The data is used only for the purpose of generating the
                report and is deleted after the interview is completed.
              </p>
            </div>
          </div>
        </div>

        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
              <Button
                className="w-full"
                variant="ghost"
                onClick={() => setWebCamEnabled(true)}
              >
                {" "}
                Enable Webcam and Microphone{" "}
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Link href={`/dashboard/interview/${interviewId}/start`}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
