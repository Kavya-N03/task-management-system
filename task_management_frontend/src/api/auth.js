import { BASE_URL } from "../../config";
import { getAccessToken, getRefreshToken, setAccessToken ,setRefreshToken} from "../utils/token";

export const registerUser = async(userData)=>{
    try{
        const response = await fetch(`${BASE_URL}/register`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userData)
        });

        const data = await response.json()

        if(!response.ok){
            throw new Error(data?.detail || JSON.stringify(data))
        }
        return data
    }catch(err){
        throw err
    }
}


export const loginUser = async(userData)=>{
    try{
        const response = await fetch(`${BASE_URL}/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userData)
        });
        const data = await response.json()

        if(!response.ok){
            throw new Error(data?.detail || JSON.stringify(data))
        }
        setAccessToken(data.access);
        setRefreshToken(data.refresh);

        return data
    }
    catch(err){
        throw err
    }
}

export const logoutUser=async()=>{
    try{
        const response = await fetch(`${BASE_URL}/logout`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${getAccessToken()}`
            },
            body:JSON.stringify({
                refresh:getRefreshToken()
            })
        });
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data?.detail || JSON.stringify(data));
        }
        return data;
    }
    catch(err){
        throw err
    }
}