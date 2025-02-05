import { useContext } from 'react';
import { authContext } from '../context/AuthContext';
import QuizList from './QuizList';
const TeacherHome = () => {
  const { user } = useContext(authContext);
  return (
    <div className="mt-20">
       <button onClick={() => window.location.href = '/create-quiz'} className="bg-blue-500 p-3 rounded-lg text-white">Create new Quiz +</button>
       <h1 className='text-2xl mt-5 font-bold'>{user?.name }'s Scheduled Quizes</h1>
       <h2 className='mt-1'>Manage and organize your quiz collection</h2>
       <QuizList />
    </div>
  );
};

export default TeacherHome;