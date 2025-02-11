import React, { useContext, useState } from 'react';
import { createQuiz } from '../lib/utils/quiz/quizService';
import { authContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateQuiz: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [isLive, setIsLive] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user } = useContext(authContext);
  const userId: string = user?.id ?? ''; 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const quizData = { title, userId};
      const result = await createQuiz(quizData);
      navigate('/home')
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg mt-20">
      <h2 className="text-xl font-bold mb-4">Create a New Quiz</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="quizTitle" className="block mb-2 text-sm font-medium">
          Quiz Title:
        </label>
        <input
          id="quizTitle"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter quiz title"
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex items-center mb-4">
          <input
            id="makeLive"
            type="checkbox"
            checked={isLive}
            onChange={() => setIsLive(!isLive)}
            className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label htmlFor="makeLive" className="text-sm font-medium">
            Make Live
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;
