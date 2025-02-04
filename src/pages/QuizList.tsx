import { useEffect, useState } from 'react';
import { getUserQuizes, deleteQuiz } from '../lib/utils/quiz/quizService';
import { authContext } from '../context/AuthContext';
import { useContext } from 'react';

const QuizList = () => {
  const { user } = useContext(authContext);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const userId = user?.id ?? ''; // Default to empty string if user is null or undefined

  const fetchQuizzes = async () => {
    try {
      if (user?.id) {
        const result = await getUserQuizes({ userId });
        setQuizzes(result);
      }
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    } 
  };

  useEffect(() => {
    fetchQuizzes();
  }, [userId]);

  const handleDelete = async (quizId: string) => {
    try {
      const result = await deleteQuiz({quizId});
      console.log(result)
      setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.id !== quizId));
      fetchQuizzes();
    } 
    catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="space-y-4">
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="border border-gray-300 rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold">{quiz.title}</h3>
            <p className="text-sm text-gray-600">Created At: {new Date(quiz.createdAt).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600">Status: {quiz.isLive ? 'Live' : 'Not Live'}</p>
            <button
              onClick={() => handleDelete(quiz._id)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;
