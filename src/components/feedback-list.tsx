import React, { useState } from "react";

interface Feedback {
  id: string;
  name: string;
  comment: string;
  response: string;
}

interface FeedbackListProps {
  feedbacks: Feedback[];
  removeFeedback: (id: string) => void;
  editFeedback: (
    id: string,
    updatedName: string,
    updatedComment: string
  ) => void;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
}

const FeedbackList: React.FC<FeedbackListProps> = ({
  feedbacks,
  removeFeedback,
  editFeedback,
  editingId,
  setEditingId,
}) => {
  const [editName, setEditName] = useState<string>("");
  const [editComment, setEditComment] = useState<string>("");

  const startEditing = (feedback: Feedback) => {
    setEditingId(feedback.id);
    setEditName(feedback.name);
    setEditComment(feedback.comment);
  };

  const handleSave = (id: string) => {
    editFeedback(id, editName, editComment);
  };

  return (
    <ul className="mt-6 space-y-4">
      {feedbacks.map((fb) => (
        <li key={fb.id} className="border p-4 rounded shadow-sm">
          {editingId === fb.id ? (
            <div>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="border w-full p-2 rounded mb-2 outline-none text-black"
              />
              <textarea
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                className="border w-full p-2 rounded mb-2 outline-none text-black"
              />
              <button
                onClick={() => handleSave(fb.id)}
                className="bg-green-500 text-white px-3 py-1 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setEditingId(null)}
                className="bg-gray-500 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <p>
                <strong>{fb.name}:</strong> {fb.comment}
              </p>
              <p className="text-blue-500 mt-2">{fb.response}</p>
              <button
                onClick={() => startEditing(fb)}
                className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => removeFeedback(fb.id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default FeedbackList;
