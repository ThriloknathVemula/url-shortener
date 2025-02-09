import { useState } from "react"

interface errorType {
    message:string
}

export const useFetch = (callbackFn:any,options={})=>{
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState<errorType | null>(null);
    const [data,setData] = useState(null);

    const fn = async(...args: any[])=>{
        setLoading(true);
        try{
            const response = await callbackFn(options,...args)
            setData(response);
        }catch(error:any){
            setError(error)
        }finally{
            setLoading(false);
        }
    }

    return {data,error,loading,fn};
}