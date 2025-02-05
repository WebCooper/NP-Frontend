import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addQuestion, getAllQuestions, deleteQuestion } from '../lib/utils/quiz/questionService';

interface Question {
  _id?: string;  // Added _id to interface
  questionText: string;
  options: string[];
  correctOption: number;
}

const AddQuestions = () => {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
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
      setError('Failed to load questions');
    } finally {
      setIsFetching(false);
    }
  };

  const handleAddQuestion = async () => {
    if (!quizId) {
      setError('Quiz ID is missing');
      return;
    }

    if (!currentQuestion || options.some(option => option === '') || correctOption === null) {
      setError('Please complete all fields');
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
          _id: response._id,  // Include the _id from response
          questionText: currentQuestion,
          options,
          correctOption,
        };
        
        setQuestions(prevQuestions => [...prevQuestions, newQuestion]);  // Use functional update
        setCurrentQuestion('');
        setOptions(['', '', '', '']);
        setCorrectOption(null);
        setError('');
      }
    } catch (err) {
      setError('Failed to add question');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteQuestion = async (questionId?: string) => {
    if (!questionId) return;  // Early return if no questionId
    
    try {
      await deleteQuestion({ questionId });
      setQuestions(prevQuestions => prevQuestions.filter(q => q._id !== questionId));  // Use functional update
    } catch (err) {
      setError('Failed to delete question');
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };


  return (
    <div className="mt-20 max-w-4xl p-6 mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Your Questions</h1>
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <input
          type="text"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          placeholder="Enter question"
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mr-2"
            />
            <input
              type="radio"
              name="correctOption"
              checked={correctOption === index}
              onChange={() => setCorrectOption(index)}
              className="h-4 w-4 text-blue-600"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddQuestion}
          disabled={isLoading}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mt-4 disabled:opacity-50"
        >
          {isLoading ? 'Adding Question...' : 'Add Question'}
        </button>
      </div>

      {questions.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Questions Added:</h3>
          <div className="space-y-4">
            {questions.map((q, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <strong className="text-lg">{q.questionText}</strong>
                <ul className="mt-2 space-y-1">
                  {q.options.map((opt, i) => (
                    <li
                      key={i}
                      className={`pl-4 ${
                        i === q.correctOption ? 'text-green-600 font-medium' : ''
                      }`}
                    >
                      {i + 1}. {opt}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(q._id)}
                  className="mt-2 bg-red-600 py-2 px-4 rounded-md text-white hover:text-red-800"
                >
                  Delete Question
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddQuestions;