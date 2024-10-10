import { createContext, useEffect, useState } from "react";
import { URL } from "../url";
import axios from "axios";
import Notiflix from 'notiflix';

export const UserContext = createContext({})

export function UserContextProvider({children}){
    const [user,setUser] = useState(null)

    useEffect(() => {
        getUser()
    }, [])
    
    const getUser = async () => {
        try {
            const token = localStorage.getItem("token") // Retrieve the token from local storage
            const res = await axios.get(URL + "/api/auth/refetch", {
                headers: {
                    Authorization: `Bearer ${token}` // Include the token in the request headers
                },
                withCredentials: true
            })
            setUser(res.data)
        } catch (err) {
            Notiflix.Notify.failure('Please Login');
        }
    }
    
    return (<UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>)
}