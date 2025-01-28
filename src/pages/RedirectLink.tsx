import { useFetch } from "@/hooks/useFetch";
import { getLongUrl } from "@/utils/urls";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { BarLoader } from "react-spinners";

export const RedirectLink = ()=>{
    const {id} = useParams();
    const {loading,data, fn:fnGetLongUrl} = useFetch(getLongUrl,id);

    useEffect(()=>{
        fnGetLongUrl();
    },[])

    useEffect(()=>{
        if(!loading && data){
            window.location.href = data.original_url;
        }
    },[loading,data])

    {if(loading) return <div>
        <BarLoader width={"100%"} color="white"/>
        Redirecting...    
    </div>}

    if(!loading && data === null){
        return <div>
            Error redirecting.....
        </div>
    }

    return null;
}