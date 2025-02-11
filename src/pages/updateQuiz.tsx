import { useParams } from "react-router-dom"
const updateQuiz = () => {
  const { quizId } = useParams();
  return (
    <div className="mt-20">
        <h1>{quizId}</h1>
    </div>
  )
}

export default updateQuiz