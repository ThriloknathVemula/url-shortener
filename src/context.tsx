import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { getCurrentUser } from "./utils/auth";
import { User } from "@supabase/supabase-js";



interface userContextType {
    user: User | null | undefined,
    getUser:()=>void,
    isAuthenticated: boolean,
    loading: boolean
}

const userContext = createContext<userContextType>({user:null,getUser:()=>Promise<void>,isAuthenticated:false,loading:true});

export const UserProvider = ({children}:{children:ReactNode})=>{
    // const {data:user, loading, fn:fetchUser} = useFetch(getCurrentUser)
    const [user, setUser] = useState<User | null>();
    const [loading, setLoading] = useState(true);

    const getUser = async()=>{
        const response = await getCurrentUser();
        setUser(response);
        setLoading(false);
    }

    useEffect(()=>{
        getUser();
    },[])

    const isAuthenticated = user?.role === "authenticated";


    return <userContext.Provider value={{user,getUser,isAuthenticated,loading}}>
        {children}
    </userContext.Provider>
}

export const urlState = ()=>{
    return useContext(userContext);
}