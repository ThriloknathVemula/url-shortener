import { createContext, useContext, useEffect } from "react"
import { useFetch } from "./hooks/useFetch";
import { getCurrentUser } from "./utils/auth";

const userContext = createContext();

export const UserProvider = ({children}:any)=>{
    const {data:user, loading, fn:fetchUser} = useFetch(getCurrentUser)

    const isAuthenticated = user?.role === "authenticated";

    useEffect(()=>{
        fetchUser();
    },[])

    return <userContext.Provider value={{user,fetchUser,isAuthenticated,loading}}>
        {children}
    </userContext.Provider>
}

export const urlState = ()=>{
    return useContext(userContext);
}