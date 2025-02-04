import { useContext } from 'react';
import { authContext } from '../context/AuthContext';
import CreateQuiz from './createQuiz';
import QuizList from './QuizList';
const TeacherHome = () => {
  const { user } = useContext(authContext);
  return (
    <div className="mt-20">
      <CreateQuiz />
       <h1 className='text-2xl mt-10 font-bold'>{user?.name }'s Scheduled Quizes</h1>
       <h2 className='mt-1'>Manage and organize your quiz collection</h2>
      <QuizList />
    </div>
  );
};

export default TeacherHome;