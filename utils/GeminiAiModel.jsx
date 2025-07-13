import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Function to call Gemini API with job data
export async function generateInterviewQuestions(
  jobPosition,
  jobDescription,
  jobExperience
) {
  const prompt = `Job Position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${jobExperience}. Based on this information, give me ${
    process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT || 5
  } interview questions along with answers in JSON format. Provide each as an object with 'question' and 'answer' fields.`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    console.log("Raw Gemini Response:", text);

    const cleanJson = text
      .trim()
      .replace(/^```(?:json)?[\s\n]*/i, "")
      .replace(/[\s\n]*```$/, "");

    // console.log("Cleaned JSON string:", cleanJson);
    return cleanJson;
  } catch (error) {
    console.error("Error generating interview questions:", error);
    return null;
  }
}

// Function to get feedback for a user's answer to a question
export async function getAnswerFeedback(question, userAnswer) {
  const prompt = `
You are an expert evaluator. Based on the following:

Question: ${question}
User Answer: ${userAnswer}

1. Evaluate how accurate and complete the user's answer is.
2. Provide the correct answer if the user’s answer is wrong, incomplete, or partially correct.
3. Give a concise feedback in bullet points (max 3 lines) explaining areas of improvement.
4. Give a rating out of 10.

Respond ONLY in strict JSON format with the following fields:
{
  "rating": "<numeric rating out of 10>",
  "feedback": "<short feedback in max 3 lines>",
  "correctAns": "<the correct answer to the question>"
}
Do not include any explanation outside the JSON structure.
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    console.log("Raw Gemini Response:", text);

    const cleaned = text
      .trim()
      .replace(/^```(?:json)?[\s\n]*/i, "")
      .replace(/[\s\n]*```$/, "");

    const feedbackResult = JSON.parse(cleaned);

    console.log("Parsed feedbackResult:", feedbackResult); 

    return feedbackResult;
  } catch (error) {
    console.error("Error getting feedback:", error);
    return null;
  }
}
