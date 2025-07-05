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
import { Ghost, LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { generateInterviewQuestions } from "@/utils/GeminiAiModel";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment/moment";
import { useUser } from "@clerk/nextjs";



function AddNewInterview() {
  const {user} = useUser();
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setjobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  // const router = useRouter();

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
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="!max-w-2xl w-full">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Describe the Job Interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2 className="text-gray-700">
                    Add Details about job position/role, job description, and
                    years of experience
                  </h2>

                  <div className="mt-4 my-3">
                    <label className="font-medium text-gray-700">
                      Job Position
                    </label>
                    <Input
                      placeholder="Ex. AI Engineer"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    ></Input>
                  </div>

                  <div className="mt-4 my-3">
                    <label className="font-medium text-gray-700">
                      Job Description/ Tech stack
                    </label>
                    <Textarea
                      placeholder="Ex. React, Java , Python"
                      required
                      onChange={(event) =>
                        setJobDescription(event.target.value)
                      }
                    ></Textarea>
                  </div>

                  <div className="mt-4 my-3">
                    <label className="font-medium text-gray-700">
                      Years of Experience
                    </label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      required
                      max="50"
                      onChange={(event) => setjobExperience(event.target.value)}
                    ></Input>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button disabled={loading} type="submit">
                    {loading ? (
                      <div className="flex items-center">
                        <LoaderCircle className="w-4 h-4 mr-2 animate-spin text-color-red" />
                        Generating...
                      </div>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
