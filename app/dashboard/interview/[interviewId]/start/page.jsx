"use client";
import { useEffect, useState } from "react";
import React, { use } from "react";
import { eq } from "drizzle-orm";
import { db } from "@lib/utils/db";
import { MockInterview } from "@lib/utils/schema";
import QuestionSection from "./components/QuestionSection";
import RecordAnswerSection from "./components/RecordAnswerSection";

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const[mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  useEffect(() => {GetInterviewDetails()}, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    setInterviewData(result[0]);
    const jsonMockResponse=JSON.parse( result[0].jsonMockResponse);
    console.log("jsonMockResponse", jsonMockResponse);
    setMockInterviewQuestions(jsonMockResponse);
    setInterviewData(result[0]);
  };
  return <div>
   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
    {/* Questions */}
    <QuestionSection 
    mockInterviewQuestions = {mockInterviewQuestions}
    activeQuestionIndex={activeQuestionIndex}
    />
    

    {/* Video/Audio recording */}
    <RecordAnswerSection/>
   </div>

  </div>;
}

export default StartInterview;
