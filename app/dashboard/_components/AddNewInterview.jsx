"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Ghost, LoaderCircle, Plus, Briefcase, FileText, Clock, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { generateInterviewQuestions } from "@/utils/GeminiAiModel";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment/moment";
import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

function AddNewInterview() {
  const {user} = useUser();
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setjobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let parsed ;
    let jsonOutput;

    try {
       jsonOutput = await generateInterviewQuestions(
        jobPosition,
        jobDescription,
        jobExperience
      );

      if (!jsonOutput) {
      throw new Error("generateInterviewQuestions returned null/undefined");
    }
      parsed = JSON.parse(jsonOutput);
      console.log(parsed);
      setOpenDialog(false); // Close dialog if success
      setJsonResponse(parsed);
    } 
    catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
      return;
    }

    try {
      console.log("jsonOutput:", jsonOutput);
console.log("typeof jsonOutput:", typeof jsonOutput);
console.log("jsonOutput is null?", jsonOutput === null);

    const resp = await db.insert(MockInterview)
    .values({
      mockId:uuidv4(),
      jsonMockResponse: jsonOutput,
      jobPosition: jobPosition,
      jobDesc: jobDescription,
      jobExperience:jobExperience,
      createdBy:user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format('DD-MM-YYYY')

    }).returning({mockId:MockInterview.mockId})

    console.log("inserted id:", resp)
    if (resp){
      setOpenDialog(false); 
      router.push(`/dashboard/interview/${resp[0].mockId}`);
    }
  }
  catch(dbError){
    console.log("error",dbError);
  }
    setLoading(false);
  };

  return (
    <div>
      {/* Enhanced Add New Card */}
      <div
        className="group relative bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-dashed border-blue-300 rounded-2xl p-4 sm:p-6 md:p-8 hover:from-blue-100 hover:to-indigo-200 hover:border-blue-400 hover:scale-105 hover:shadow-xl cursor-pointer transition-all duration-300 overflow-hidden"
        onClick={() => setOpenDialog(true)}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-200/30 to-indigo-300/30 rounded-full -translate-y-8 sm:-translate-y-10 translate-x-8 sm:translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-tr from-purple-200/30 to-blue-300/30 rounded-full translate-y-6 sm:translate-y-8 -translate-x-6 sm:-translate-x-8 group-hover:scale-150 transition-transform duration-500"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg">
            <Plus className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
          </div>
          
          <h2 className="font-bold text-lg sm:text-xl md:text-xl text-gray-800 mb-1 sm:mb-2 group-hover:text-blue-700 transition-colors duration-300">
            Create New Interview
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300 px-2">
            Start your AI-powered mock interview session
          </p>
          
          {/* Quick stats */}
          <div className="flex justify-center gap-3 sm:gap-4 mt-3 sm:mt-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span className="hidden sm:inline">AI-Generated</span>
              <span className="sm:hidden">AI</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>~15 mins</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="!max-w-xs sm:!max-w-lg md:!max-w-2xl lg:!max-w-3xl w-[95%] sm:w-full bg-white rounded-xl sm:rounded-2xl border-0 shadow-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-4 sm:pb-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <DialogTitle className="font-bold text-xl sm:text-2xl text-gray-800">
                  Create Your Mock Interview
                </DialogTitle>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Powered by AI • Personalized for your role
                </p>
              </div>
            </div>
          </DialogHeader>
          
          <DialogDescription className="pt-2">
            <div className="mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-100">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-gray-800 mb-1">AI-Powered Interview Experience</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Our AI will generate tailored questions based on your job details, experience level, and industry requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
              {/* Job Position Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-semibold text-sm sm:text-base text-gray-800">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  Job Position / Role
                </label>
                <Input
                  placeholder="e.g., Senior Software Engineer, Product Manager"
                  required
                  onChange={(event) => setJobPosition(event.target.value)}
                  className="h-10 sm:h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-700 placeholder-gray-400"
                />
                <p className="text-xs text-gray-500">Enter the specific role you're interviewing for</p>
              </div>

              {/* Job Description Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-semibold text-sm sm:text-base text-gray-800">
                  <FileText className="w-4 h-4 text-blue-600" />
                  Job Description & Tech Stack
                </label>
                <Textarea
                  placeholder="e.g., React, Node.js, TypeScript, AWS, Agile methodology..."
                  required
                  onChange={(event) => setJobDescription(event.target.value)}
                  className="min-h-[80px] sm:min-h-[100px] border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-700 placeholder-gray-400 resize-none"
                />
                <p className="text-xs text-gray-500">Include technologies, methodologies, and key responsibilities</p>
              </div>

              {/* Experience Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-semibold text-sm sm:text-base text-gray-800">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Years of Experience
                </label>
                <Input
                  placeholder="e.g., 3"
                  type="number"
                  required
                  max="50"
                  min="0"
                  onChange={(event) => setjobExperience(event.target.value)}
                  className="h-10 sm:h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-700 placeholder-gray-400"
                />
                <p className="text-xs text-gray-500">Total years of professional experience in this field</p>
              </div>

              {/* Expected outcome info */}
              <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200">
                <h4 className="font-semibold text-sm sm:text-base text-gray-800 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  What to expect:
                </h4>
                <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                  <li>• 5 tailored interview questions</li>
                  <li>• Questions matched to your experience level</li>
                  <li>• AI feedback on your responses</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-4 border-t border-gray-100">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setOpenDialog(false)}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-colors duration-200 text-sm sm:text-base"
                >
                  Cancel
                </Button>
                <Button 
                  disabled={loading} 
                  type="submit"
                  className="w-full sm:w-auto px-6 sm:px-8 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <LoaderCircle className="w-4 h-4 animate-spin" />
                      <span className="hidden sm:inline">Generating Questions...</span>
                      <span className="sm:hidden">Generating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Start Interview</span>
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;