import {axiosInstance} from "../axiosInstance.ts";

interface addQuestionParams {
    quizId: string;
    questionText: string;
    options: string[];
    correctOption: number;
}
interface getAllQuestionsParams {
    quizId: string;
}
interface deleteQuestionParams {
    questionId: string;
}
  
export const addQuestion = async ({quizId, questionText, options, correctOption}: addQuestionParams) => {
    try {
      const response = await axiosInstance.post(`api/question/add`, {
        quizId,
        questionText,
        options,
        correctOption,
      });
      return response.data;
    } catch (error) {
      console.log("Adding Question Error",error);
    }
}

export const getAllQuestions = async ({quizId}: getAllQuestionsParams) => {
    try {
      const response = await axiosInstance.get(`api/question/quiz/${quizId}`);
      return response.data;
    } catch (error) {
      console.log("Getting All Questions Error",error);
    }
}

export const deleteQuestion = async ({questionId}: deleteQuestionParams) => {
    try {
      const response = await axiosInstance.delete(`api/question/${questionId}`);
      return response.data;
    } catch (error) {
      console.log("Deleting Question Error",error);
    }
}
