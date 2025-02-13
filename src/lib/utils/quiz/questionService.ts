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
interface updateQuestionParams {
    questionId: string;
    questionText: string;
    options: string[];
    correctOption: number;
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
export const updateQuestion = async ({questionId, questionText, options, correctOption}: updateQuestionParams) => {
  try {
      const response = await axiosInstance.patch(`api/question/${questionId}`, {
          questionText,
          options,
          correctOption,
      });
      return response.data;
  } catch (error) {
      console.log("Updating Question Error", error);
  }
};
