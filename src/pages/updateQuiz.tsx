import { useParams } from "react-router-dom"
const UpdateQuiz = () => {
  const { quizId } = useParams();
  
  return (
    <div className="mt-20">
        <h1 className="font-bold text-2xl">Update Quiz {quizId}</h1>
    </div>
  )
}

export default UpdateQuiz