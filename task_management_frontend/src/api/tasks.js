import { BASE_URL } from "../../config";
import { getAccessToken } from "../utils/token";

export const getTasks = async()=>{
    const token = getAccessToken();
    if(!token){
        throw new Error("No authentication token found");
    }
    const response = await fetch(`${BASE_URL}/tasks/`,{
        method:"GET",
        headers:{
            Authorization:`Bearer ${token}`
        },
    });
    const data = await response.json();

    if(!response.ok){
        throw new Error(data?.detail || JSON.stringify(data))
    }
    return data
}


export const createTask = async(taskData)=>{
    const token = getAccessToken();
    if(!token){
        throw new Error("No authentication token found");
    }
    const response = await fetch(`${BASE_URL}/tasks/`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(taskData)
    });
    const data = await response.json();

    if(!response.ok){
        throw new Error(data?.detail || JSON.stringify(data))
    }
    return data
}

export const updateTask = async (id, taskData) => {
    const token = getAccessToken();

    const response = await fetch(`${BASE_URL}/tasks/${id}/`, {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(taskData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.detail || JSON.stringify(data));
    }

    return data;
};


export const deleteTask = async (id) => {
    const token = getAccessToken();

    const response = await fetch(`${BASE_URL}/tasks/${id}/`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to delete task");
    }
};