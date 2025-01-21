import FeedbackList from "@/components/feedback-list";
import Form from "@/components/form";
import { useState, useEffect } from "react";

interface Feedback {
  id: string;
  name: string;
  comment: string;
  response: string;
}

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const savedFeedbacks = localStorage.getItem("feedbacks");
    if (savedFeedbacks) {
      try {
        setFeedbacks(JSON.parse(savedFeedbacks));
      } catch (error) {
        console.error("Error parsing feedbacks from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
  }, [feedbacks]);

  const addFeedback = ({
    name,
    comment,
  }: {
    name: string;
    comment: string;
  }) => {
    setLoading(true);

    setTimeout(() => {
      const newFeedback: Feedback = {
        id: crypto.randomUUID(),
        name,
        comment,
        response: `Thank you for your comment, ${name}!`,
      };

      setFeedbacks((prev) => [newFeedback, ...prev]);
      setLoading(false);
    }, 2000);
  };
  const removeFeedback = (id: string) => {
    setFeedbacks((prev) => prev.filter((feedback) => feedback.id !== id));
  };
  const editFeedback = (
    id: string,
    updatedName: string,
    updatedComment: string
  ) => {
    setFeedbacks((prev) =>
      prev.map((feedback) =>
        feedback.id === id
          ? { ...feedback, name: updatedName, comment: updatedComment }
          : feedback
      )
    );
    setEditingId(null);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">Feedback App</h1>
      <Form addFeedback={addFeedback} />
      {loading && (
        <p className="text-gray-500 mt-4">Processing your feedback...</p>
      )}
      <FeedbackList
        feedbacks={feedbacks}
        removeFeedback={removeFeedback}
        editFeedback={editFeedback}
        editingId={editingId}
        setEditingId={setEditingId}
      />
    </div>
  );
};

export default FeedbackPage;
