import { useState } from "react"

export const useFetch = (callbackFn ,options={})=>{
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
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