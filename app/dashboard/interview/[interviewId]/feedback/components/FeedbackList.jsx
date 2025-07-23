"use client";

import FeedbackCard from "./FeedbackCard";

export default function FeedbackList({ feedback }) {
  return (
    <div className="space-y-6">
      {feedback.map((item, idx) => (
        <FeedbackCard key={item.id} item={item} idx={idx} />
      ))}
    </div>
  );
}
