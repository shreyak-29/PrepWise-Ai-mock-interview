"use client";
import { useEffect, useState } from "react";
import React, { use } from "react";
import { eq } from "drizzle-orm";
import { db } from "@lib/utils/db";
import { MockInterview } from "@lib/utils/schema";
import QuestionSection from "./components/QuestionSection";
import dynamic from "next/dynamic";
import {Button} from "@components/ui/button";
import Link from "next/link";



function StartInterview({ params }) {
  const { interviewId } = use(params);
  const [interviewData, setInterviewData] = useState();
  const[mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {GetInterviewDetails()}, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId));
    setInterviewData(result[0]);
    const jsonMockResponse=JSON.parse( result[0].jsonMockResponse);
    console.log("jsonMockResponse", jsonMockResponse);
    setMockInterviewQuestions(jsonMockResponse);
    setInterviewData(result[0]);
  };
const RecordAnswerSection = dynamic(
  () => import("./components/RecordAnswerSection"),
  { ssr: false } // 🔥 disables server-side rendering for this component
);

  return <div>
   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
    {/* Questions */}
  <QuestionSection 
  mockInterviewQuestions={mockInterviewQuestions}
  activeQuestionIndex={activeQuestionIndex}
  setActiveQuestionIndex={setActiveQuestionIndex}
  interviewData={interviewData} 
/>
    

    {/* Video/Audio recording */}
    <RecordAnswerSection
      mockInterviewQuestions = {mockInterviewQuestions}
    activeQuestionIndex={activeQuestionIndex}
    setActiveQuestionIndex={setActiveQuestionIndex}
    interviewData={interviewData}/>
   </div>

   {/* <div className="flex justify-end gap-5 mt-5">
  { activeQuestionIndex>0 && 
  <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
   {  activeQuestionIndex!=mockInterviewQuestions.length-1  &&
   <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
{  activeQuestionIndex==mockInterviewQuestions.length-1 && 
<Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
<Button>Submit Interview</Button>
</Link>}
   </div> */}

  </div>;
}

export default StartInterview;
