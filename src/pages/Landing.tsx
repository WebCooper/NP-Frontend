
const Landing = () => {
  return (
    <div className="min-h-screen  flex flex-col justify-center items-center p-4 ">
      <div className="w-full max-w-md mt-10 bg-white shadow-2xl rounded-xl overflow-hidden">
        <div className="bg-blue-600 text-white p-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-12 h-12 mx-auto mb-4">
            <path d="M17 6.1H3" strokeWidth="2" strokeLinecap="round"/>
            <path d="M21 10.1H3" strokeWidth="2" strokeLinecap="round"/>
            <rect x="3" y="14.1" width="8" height="6" strokeWidth="2" strokeLinecap="round"/>
            <path d="M16 17.1H21" strokeWidth="2" strokeLinecap="round"/>
            <path d="M18 14.1V20.1" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <h1 className="text-3xl font-bold">QuizCrash</h1>
          <p className="text-blue-100 mt-2">Schedule and Take Quizzes with Ease</p>
        </div>
        
        <div className="p-6 space-y-4">
          <button onClick={() => window.location.href = '/login'} className="w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Login
          </button>
          
          <button onClick={() => window.location.href = '/register'} className="w-full flex items-center justify-center bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="8.5" cy="7" r="4"/>
              <line x1="20" y1="8" x2="20" y2="14"/>
              <line x1="23" y1="11" x2="17" y2="11"/>
            </svg>
            Sign Up
          </button>
          
          <div className="text-center text-gray-500 my-4 relative">
            <span className="px-2 bg-white relative z-10">or</span>
            <div className="border-t absolute left-0 right-0 top-1/2 transform -translate-y-1/2 z-0"></div>
          </div>
          
          <div className="space-y-3">
            <input 
              type="text" 
              placeholder="Enter Quiz Room ID" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300">
              Enter Quiz Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;