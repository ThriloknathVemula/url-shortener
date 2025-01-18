import { urlState } from "@/context";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

export const ProtectedRoute = ({children}:{children:ReactNode})=>{
    const {loading,isAuthenticated} = urlState();

    const navigate = useNavigate();

    useEffect(()=>{
        if(!isAuthenticated && loading==false) navigate('/auth')
    },[isAuthenticated,loading]);

    if(loading) return <ScaleLoader className="text-center" color= "rgb(226 232 240 / var(--tw-text-opacity, 1))"/>

    if(isAuthenticated) return children;
}