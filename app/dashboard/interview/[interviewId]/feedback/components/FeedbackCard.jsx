"use client";

import { Star } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

export default function FeedbackCard({ item, idx }) {
  const [expanded, setExpanded] = useState(false);

  const cleanText = item.feedback.replace(/\\n/g, "\n"); // handle literal \n
  const shouldTruncate = cleanText.length > 400;
  const displayText = expanded
    ? cleanText
    : shouldTruncate
    ? cleanText.slice(0, 400) + "..."
    : cleanText;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          Question {idx + 1}
        </span>
        <div className="flex items-center ml-auto gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < (item.rating || 0)
                  ? "text-yellow-400 fill-yellow-300"
                  : "text-gray-300"
              }`}
              fill={i < (item.rating || 0) ? "currentColor" : "none"}
            />
          ))}
        </div>
      </div>

      <div className="mb-2">
        <span className="block text-gray-700 font-medium mb-1">Q:</span>
        <p className="text-gray-900 text-base leading-relaxed">{item.question}</p>
      </div>

      <div className="mb-2">
        <span className="block text-gray-700 font-medium mb-1">
          Your Answer:
        </span>
        <p className="text-gray-800 bg-gray-50 rounded-lg p-3 border border-gray-100 text-sm">
          {item.userAnswer}
        </p>
      </div>

      <div>
        <span className="block text-gray-700 font-medium mb-1">
          AI Feedback:
        </span>
        <div className="text-gray-800 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3 border border-green-100 text-sm whitespace-pre-line">
          <ReactMarkdown>{displayText}</ReactMarkdown>
        </div>
        {shouldTruncate && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-500 text-xs mt-2 hover:underline"
          >
            {expanded ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    </div>
  );
}
