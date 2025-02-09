import { createContext, ReactNode, useContext, useEffect } from "react"
import { useFetch } from "./hooks/useFetch";
import { getCurrentUser } from "./utils/auth";

interface userObjectType{
    role?:string,
    id?: string | number,
    user_metadata: {
        profile_pic: string,
        name:string
    }
}

interface userContextType {
    user: userObjectType,
    fetchUser:()=>void,
    isAuthenticated: boolean,
    loading: boolean
}

const userContext = createContext<userContextType>({user:{},fetchUser:()=>{},isAuthenticated:false,loading:true});

export const UserProvider = ({children}:{children:ReactNode})=>{
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