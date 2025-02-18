import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addQuestion, getAllQuestions, deleteQuestion, updateQuestion } from '../lib/utils/quiz/questionService';

interface Question {
  _id?: string;  // Added _id to interface
  questionText: string;
  options: string[];
  correctOption: number;
}

const AddQuestions = () => {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
    if (!quizId) return;

    try {
      const response = await getAllQuestions({ quizId });
      if (response) {
        setQuestions(response);
      }
      console.log(response);
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError("Failed to load questions");
    } finally {
      setIsFetching(false);
    }
  };
  console.log(isFetching);

  const handleAddQuestion = async () => {
    if (!quizId) {
      setError("Quiz ID is missing");
      return;
    }

    if (
      !currentQuestion ||
      options.some((option) => option === "") ||
      correctOption === null
    ) {
      setError("Please complete all fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await addQuestion({
        quizId,
        questionText: currentQuestion,
        options,
        correctOption,
      });
      console.log(response);

      if (response) {
        const newQuestion: Question = {
          _id: response._id, // Include the _id from response
          questionText: currentQuestion,
          options,
          correctOption,
        };

        setQuestions((prevQuestions) => [...prevQuestions, newQuestion]); // Use functional update
        setCurrentQuestion("");
        setOptions(["", "", "", ""]);
        setCorrectOption(null);
        setError("");
      }
    } catch (err) {
      console.error("Error adding question:", err);
      setError("Failed to add question");
    } finally {
      setIsLoading(false);
    }
    
  };
  

  const handleDeleteQuestion = async (questionId?: string) => {
    if (!questionId) return; // Early return if no questionId

    try {
      await deleteQuestion({ questionId });
      setQuestions((prevQuestions) =>
        prevQuestions.filter((q) => q._id !== questionId)
      ); // Use functional update
    } catch (err) {
      console.error("Error deleting question:", err);
      setError("Failed to delete question");
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleUpdateQuestion = async (questionId?: string) => {
    if (!questionId) return;

    const questionToUpdate = questions.find((q) => q._id === questionId);
    if (!questionToUpdate) return;

    try {
      const response = await updateQuestion({
        questionId,
        questionText: questionToUpdate.questionText,
        options: questionToUpdate.options,
        correctOption: questionToUpdate.correctOption,
      });
      console.log(response);

      setError("");
    } catch (err) {
      console.error("Error updating question:", err);
      setError("Failed to update question");
    }
  };

  return (
    <div className="container mx-auto px-8 mt-24 max-w-4xl">
      <div className="flex flex-col gap-10">
        <div className="border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-900">Create Questions</h1>
          <p className="text-gray-600 mt-2">
            Add and manage questions for your quiz
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <input
            type="text"
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            placeholder="Enter your question"
            className="w-full px-4 py-3 text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          />

          <div className="mt-6 space-y-4">
            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-4">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="flex-1 px-4 py-2 text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                />
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="correctOption"
                    checked={correctOption === index}
                    onChange={() => setCorrectOption(index)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-600">Correct</span>
                </label>
              </div>
            ))}
          </div>

          <button
            onClick={handleAddQuestion}
            disabled={isLoading}
            className="mt-6 w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Adding Question..." : "Add Question"}
          </button>
        </div>

        {questions.length > 0 && (
          <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
            <div className="px-6 py-4 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">
                Added Questions
              </h2>
            </div>
            {questions.map((question, index) => (
              <div key={index} className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">
                    {question.questionText}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateQuestion(question._id)}
                      className="text-gray-600 hover:text-gray-900 px-3 py-1 rounded border border-gray-200 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(question._id)}
                      className="text-red-600 hover:text-red-700 px-3 py-1 rounded border border-gray-200 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <ul className="space-y-2 ml-4">
                  {question.options.map((option, i) => (
                    <li
                      key={i}
                      className={`flex items-center gap-2 ${
                        i === question.correctOption
                          ? "text-green-600 font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      <span className="w-6">{i + 1}.</span>
                      <span>{option}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddQuestions;