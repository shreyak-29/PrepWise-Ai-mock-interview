import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);



// Function to call Gemini API with job data
export async function generateInterviewQuestions(jobPosition, jobDescription, jobExperience) {
  const prompt = `Job Position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${jobExperience}. Based on this information, give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT || 5} interview questions along with answers in JSON format. Provide each as an object with 'question' and 'answer' fields.`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    console.log("Raw Gemini Response:", text);

const cleanJson = text
  .trim()
  .replace(/^```(?:json)?[\s\n]*/i, '')
  .replace(/[\s\n]*```$/, '');

  // console.log("Cleaned JSON string:", cleanJson); 
    return cleanJson;


  } catch (error) {
    console.error("Error generating interview questions:", error);
    return null;
  }
}
