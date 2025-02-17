import {axiosInstance} from "../axiosInstance.ts";

interface RegisterTeacherParams {
    name: string;
    email: string;
    password: string;
}

interface LoginTeacherParams {
    email: string;
    password: string;
}


export const registerTeacher = async ({name, email, password}: RegisterTeacherParams) => {
   try{
       const response = await axiosInstance.post('api/user/register', {
           name,
           email,
           password,
       })
       return response.data;
   }catch (error) {
       console.log("Registering Teacher Error",error);
       throw new Error("Failed to register Teacher");
   }
}

export const loginTeacher = async ({ email, password }: LoginTeacherParams) => {
    try {
        const response = await axiosInstance.post("/api/user/login", {
            email,
            password,
        });

        if (response.status !== 200) {
            throw new Error("Invalid login credentials");
        }

        return response.data;
    } catch (error) {
        console.error("LoginTeacher Error:", error);
        throw new Error("Login failed. Please check your credentials.");
    }
};