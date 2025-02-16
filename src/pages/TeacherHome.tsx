import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import QuizList from "./QuizList";

const TeacherHome = () => {
  const { user } = useContext(authContext);
  
  return (
    <div className="container mx-auto px-8 mt-24 max-w-7xl">
      <div className="flex flex-col gap-12">
        {/* Header Section */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-8">
          <div className="text-left">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              Teaching Space
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Great to see you, {user?.name}
            </p>
          </div>
          <button 
            onClick={() => window.location.href = '/create-quiz'} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 font-medium transition-all duration-200 text-base"
          >
            <span>Create quiz</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        
        {/* Quiz Section */}
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Quiz Collection</h2>
            <p className="text-gray-600 mt-1">All your created quizzes in one place</p>
          </div>
          <QuizList />
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;