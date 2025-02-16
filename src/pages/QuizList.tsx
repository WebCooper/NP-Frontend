import { useEffect, useState } from 'react';
import { getUserQuizes, deleteQuiz ,setLiveQuiz} from '../lib/utils/quiz/quizService';
import { authContext } from '../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizList = () => {
  const { user } = useContext(authContext);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const userId = user?.id ?? ""; // Default to empty string if user is null or undefined

  const navigate = useNavigate();

  interface Quiz {
    _id: string;
    title: string;
    createdAt: string;
    isLive: boolean;
  }

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        if (userId) {
          const result = await getUserQuizes({ userId });
          setQuizzes(result);
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes().then(() => console.log("Quizzes fetched successfully!"));
  }, [userId, quizzes]);

  const handleDelete = async (quizId: string) => {
    try {
      const result = await deleteQuiz({ quizId });
      console.log(result);
      setQuizzes((prevQuizzes) =>
        prevQuizzes.filter((quiz) => quiz._id !== quizId)
      );
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const handleUpdate = (quizId: string) => {
    navigate(`/quiz/edit/${quizId}`);
  };

  const handleAddQuestions = (quizId: string) => {
    navigate(`/quiz/add-questions/${quizId}`);
  };

  const handleSetLive = async (quizId: string) => {
    try {
      const response = await setLiveQuiz({ quizId });

      if (response && response.data.roomId) {
        navigate(`/waiting-room/${response.data.roomId}`); // Redirect to the correct room
      } else {
        console.error("Failed to get room ID");
      }
    } catch (error) {
      console.error("Error setting quiz live:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {quizzes.map((quiz) => (
        <div
          key={quiz._id}
          className="border border-gray-200 rounded-lg p-6 bg-white"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-gray-900">
                {quiz.title}
              </h3>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <span>
                  {new Date(quiz.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span
                  className={`flex items-center gap-1.5 ${
                    quiz.isLive ? "text-green-600" : "text-gray-600"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      quiz.isLive ? "bg-green-600" : "bg-gray-600"
                    }`}
                  ></span>
                  {quiz.isLive ? "Live" : "Not Live"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleAddQuestions(quiz._id)}
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Add Questions
              </button>
              <button
                onClick={() => handleUpdate(quiz._id)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleSetLive(quiz._id)}
                className="px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
              >
                Start Quiz
              </button>
              <button
                onClick={() => handleDelete(quiz._id)}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizList;