import { useContext } from 'react';
import { authContext } from '../context/AuthContext';
const TeacherHome = () => {
  const { user } = useContext(authContext);
  return (
    <div className="mt-20">
       <h1 className='text-2xl'>Welcome, {user?.name}</h1>
    </div>
  );
};

export default TeacherHome;