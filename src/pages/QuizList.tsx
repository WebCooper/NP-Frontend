import { useEffect, useState } from 'react';
import { getUserQuizes, deleteQuiz } from '../lib/utils/quiz/quizService';
import { authContext } from '../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizList = () => {
  const { user } = useContext(authContext);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const userId = user?.id ?? ''; // Default to empty string if user is null or undefined
  
  const navigate = useNavigate();
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

  const handleUpdate = (quizId: string) => {
    navigate(`/quiz/edit/${quizId}`);
  }
  
  const handleaddQuestions = (quizId: string) => {
    navigate(`/quiz/add-questions/${quizId}`);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 gap-4">
  {quizzes.map((quiz) => (
    <div
      key={quiz._id}
      className="flex items-center justify-between border border-gray-300 rounded-lg p-5 shadow-sm hover:shadow-md transition"
    >
      <div className="flex space-x-10">
        <h3 className="text-lg font-semibold">{quiz.title}</h3>
        <p className="text-sm text-gray-600">
          Created At: {new Date(quiz.createdAt).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-600">
          Status: <span className={quiz.isLive ? 'text-green-600' : 'text-red-600'}>{quiz.isLive ? 'Live' : 'Not Live'}</span>
        </p>
      </div>
      <div className="flex space-x-3">
        <button
          onClick={() => handleaddQuestions(quiz._id)}
          className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md"
        >
        AddQuestions+
        </button>
        <button
          onClick={() => handleUpdate(quiz._id)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-md"
        >
          Update
        </button>
        <button
          onClick={() => handleDelete(quiz._id)}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default QuizList;
