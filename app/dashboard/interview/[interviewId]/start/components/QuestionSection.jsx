import React from "react";
import { Lightbulb, Volume2 } from "lucide-react"

function QuestionSection({ mockInterviewQuestions, activeQuestionIndex, setActiveQuestionIndex }) {
  const textToSpeech = (text)=> {
    if ('speechSynthesis' in window ){
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech)
    }
    else{
      alert("Sorry, browser doesn't support text to speech");
    }
  }
  return (
    <div className="p-5 border rounded-lg  my-">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockInterviewQuestions &&
          mockInterviewQuestions.map((question, index) => (
            <h2
              key={index}
              onClick={() => setActiveQuestionIndex(index)}
              className={`p-2 rounded-full text-sm md:text-sm text-center cursor-pointer 
                ${
                  activeQuestionIndex === index
                    ? "bg-primary text-white"
                    : "bg-secondary "
                }`}
            >
              Question #{index + 1}
            </h2>
          ))}
      </div>
      <h2 className="my-5 text-md md:text-lg">{mockInterviewQuestions[activeQuestionIndex]?.question}</h2>
    <Volume2 className="cursor-pointer" onClick={()=>textToSpeech(mockInterviewQuestions[activeQuestionIndex]?.question)}/>
    
    <div className="border rounded-lg p-5 bg-gray-100 mt-20">
      <h2  className="gap-2 items-center flex text-primary">
        <Lightbulb/>
        <strong>Note: </strong>
      </h2>
        <div>
        <p>Click on Record Answer when you want to answer the question</p>
        <p>At the end feedback along with correct answers will be provided</p>
        </div>

    </div>
    </div>
  );
}

export default QuestionSection;
