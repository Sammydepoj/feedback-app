import { useState, ChangeEvent, FormEvent } from "react";

interface FormProps {
  addFeedback: (feedback: { name: string; comment: string }) => void;
}

const Form: React.FC<FormProps> = ({ addFeedback }) => {
  const [name, setName] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() && comment.trim()) {
      addFeedback({ name, comment });
      setName("");
      setComment("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        className="border w-full p-2 rounded outline-none text-black"
      />
      <textarea
        placeholder="Your Comment"
        value={comment}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setComment(e.target.value)
        }
        className="border w-full p-2 rounded outline-none text-black resize-none"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
