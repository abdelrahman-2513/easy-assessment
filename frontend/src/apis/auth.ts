import type { ILogin, IRegister } from "../interfaces/authInterface";
import axiosInstance from "./axios";


/**
 * This Function is used to handle the Login Process
 * @param loginData {email: string , password:string}
 * @returns response
 */
export const login = async (loginData: ILogin) => {
    // No Need for try and catch as we handle global errors on the axios interceptor
    const resposne = await axiosInstance.post("auth/Signin", loginData);

    if (resposne.data)
    {
        return resposne.data
    } else {
        throw new Error("Something went wrong");
    }
}

/**
 * This Function is used to handle register process
 * @param registerData {name:string, email:string, password:string}
 * @returns response
 */

export const register = async (registerData: IRegister) => {
    const resposne = await axiosInstance.post("auth/Signup", registerData);
    if (resposne.data)
        {
            return resposne.data
        } else {
            throw new Error("Something went wrong");
        }
}

/**
 * This Function is used to check user authorization
 * @returns reposone
 */
export const getWelcomeMessage = async () => {
    const resposne = await axiosInstance.get("auth/welcome");
    if (resposne.data)
        {
            return resposne.data
        } else {
            throw new Error("Something went wrong");
        }
}