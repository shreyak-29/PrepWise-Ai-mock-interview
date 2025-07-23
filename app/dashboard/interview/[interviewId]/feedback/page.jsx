import { db } from "@lib/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import FeedbackList from "./components/FeedbackList";

export default async function FeedbackPage({ params }) {
  const feedback = await db
    .select()
    .from(UserAnswer)
    .where(eq(UserAnswer.mockIdRef, String(params.interviewId)))
    .orderBy(UserAnswer.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-2 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Interview Feedback
        </h1>

        {feedback.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
            No feedback found for Interview ID:{" "}
            <span className="font-semibold">{params.interviewId}</span>
          </div>
        ) : (
          <FeedbackList feedback={feedback} />
        )}
      </div>
    </div>
  );
}
