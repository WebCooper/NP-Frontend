import {axiosInstance} from '../axiosInstance.ts'

interface createQuizParams {
  title: string;
  userId: string;
}

interface getUserQuizesParams {
  userId: string;
}
interface deleteQuizParams {
  quizId: string;
}

interface setLiveQuizParams {
  quizId: string;
}

export const createQuiz = async ({title, userId}: createQuizParams) => {
  try {
    const response = await axiosInstance.post('api/quiz/create', {
      title,
      userId,
    })
    return response.data;
  } catch (error) {
    console.log("Creating Quiz Error",error);
  }
}

export const getUserQuizes = async ({userId}: getUserQuizesParams) => {
  try {
    const response = await axiosInstance.get(`api/quiz/user/${userId}`);
    return response.data;
  } catch (error) {
    console.log("Getting User Quizes Error",error);
  }
}
export const deleteQuiz = async ({quizId}: deleteQuizParams) => {
  try {
    const response = await axiosInstance.delete(`api/quiz/${quizId}`);
    return response.data;
  } catch (error) {
    console.log("Deleting Quiz Error",error);
  }
}

export const setLiveQuiz = async ({quizId}: setLiveQuizParams) => {
  try {
    const response = await axiosInstance.patch(`api/quiz/set-live/${quizId}`);
    return response;
  } catch (error) {
    console.log("Setting Live Quiz Error",error);
  }
}

export const stopQuiz = async ({quizId}: deleteQuizParams) => {
  try {
    const response = await axiosInstance.patch(`api/quiz/set-not-live/${quizId}`);
    return response;
  } catch (error) {
    console.log("Stopping Quiz Error",error);
  }
}