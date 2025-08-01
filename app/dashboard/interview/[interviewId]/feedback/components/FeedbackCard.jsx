"use client";

import { Star, MessageSquare, CheckCircle, AlertCircle, Lightbulb } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

export default function FeedbackCard({ item, idx }) {
  const [expanded, setExpanded] = useState(false);

  // Parse JSON feedback and extract the feedback text
  const parseFeedback = (feedbackString) => {
    try {
      // If it's already a JSON object, use it directly
      if (typeof feedbackString === 'object') {
        return feedbackString.feedback || feedbackString;
      }
      
      // If it's a JSON string, parse it
      const parsed = JSON.parse(feedbackString);
      return parsed.feedback || feedbackString;
    } catch (error) {
      // If parsing fails, return the original string
      console.log('Failed to parse feedback JSON:', error);
      return feedbackString;
    }
  };

  // Better text cleaning - handle multiple types of newline characters
  const rawFeedback = parseFeedback(item.feedback);
  const cleanText = rawFeedback
    .replace(/\\n/g, "\n")
    .replace(/\\r\\n/g, "\n")
    .replace(/\\r/g, "\n")
    .replace(/\n\n+/g, "\n\n"); // Remove excessive newlines

  const shouldTruncate = cleanText.length > 300;
  const displayText = expanded
    ? cleanText
    : shouldTruncate
    ? cleanText.slice(0, 300) + "..."
    : cleanText;

  // Determine feedback type for styling
  const getFeedbackType = (text) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes("excellent") || lowerText.includes("great") || lowerText.includes("good")) {
      return "positive";
    } else if (lowerText.includes("improve") || lowerText.includes("better") || lowerText.includes("consider")) {
      return "suggestive";
    } else if (lowerText.includes("avoid") || lowerText.includes("don't") || lowerText.includes("incorrect")) {
      return "negative";
    }
    return "neutral";
  };

  const feedbackType = getFeedbackType(cleanText);

  const getFeedbackIcon = () => {
    switch (feedbackType) {
      case "positive":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "suggestive":
        return <Lightbulb className="w-5 h-5 text-yellow-600" />;
      case "negative":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <MessageSquare className="w-5 h-5 text-blue-600" />;
    }
  };

  const getFeedbackStyle = () => {
    switch (feedbackType) {
      case "positive":
        return "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-800";
      case "suggestive":
        return "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 text-yellow-800";
      case "negative":
        return "bg-gradient-to-r from-red-50 to-pink-50 border-red-200 text-red-800";
      default:
        return "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-800";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
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

      {/* Question Section */}
      <div className="mb-4">
        <div className="flex items-start gap-2 mb-2">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xs font-bold text-blue-600">Q</span>
          </div>
          <div className="flex-1">
            <p className="text-gray-900 text-base leading-relaxed font-medium">
              {item.question}
            </p>
          </div>
        </div>
      </div>

      {/* Your Answer Section */}
      <div className="mb-4">
        <div className="flex items-start gap-2 mb-2">
          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xs font-bold text-gray-600">A</span>
          </div>
          <div className="flex-1">
            <p className="text-gray-800 bg-gray-50 rounded-lg p-3 border border-gray-200 text-sm leading-relaxed">
              {item.userAnswer}
            </p>
          </div>
        </div>
      </div>

      {/* AI Feedback Section */}
      <div>
        <div className="flex items-start gap-2 mb-3">
          {getFeedbackIcon()}
          <div className="flex-1">
            <h4 className="font-semibold text-gray-700 mb-2">AI Feedback</h4>
            <div className={`rounded-lg p-4 border ${getFeedbackStyle()} text-sm leading-relaxed`}>
              <div className="whitespace-pre-line">
                {displayText.split('\n').map((line, lineIndex) => (
                  <p key={lineIndex} className="mb-2 last:mb-0">
                    {line}
                  </p>
                ))}
              </div>
            </div>
            {shouldTruncate && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-blue-600 text-sm mt-3 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors duration-200"
              >
                {expanded ? (
                  <>
                    <span>Show Less</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Show More</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
