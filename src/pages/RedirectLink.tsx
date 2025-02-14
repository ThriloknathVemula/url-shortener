import { initialUrlState, urlType } from "@/types/types";
import { storeClicks } from "@/utils/clicks";
import { getLongUrl } from "@/utils/urls";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { BarLoader } from "react-spinners";

export const RedirectLink = ()=>{
    const {id} = useParams();
    const navigate = useNavigate();
    const [loadingLongUrl, setLoadingLongUrl] = useState(true);
    const [longUrlDetails, setLongUrlDetails] = useState<urlType>(initialUrlState);
    
    useEffect(()=>{
        const getUrlDetails = async()=>{
            if(id !== undefined){
                try{
                    const response = await getLongUrl(id);
                    setLongUrlDetails(response);
                }catch(e){
                    navigate('/not-found')
                }
            }
            setLoadingLongUrl(false);
        }

        getUrlDetails();
    },[])


    useEffect(()=>{
        const storeClicksFunc = async()=>{
            if(!loadingLongUrl && longUrlDetails && id !== undefined){
                await storeClicks(longUrlDetails.id, longUrlDetails.original_url)
            }
        }

        storeClicksFunc();
    },[loadingLongUrl,longUrlDetails])

    {if(loadingLongUrl) return <div>
        <BarLoader width={"100%"} color="white"/>
        Redirecting...    
    </div>}

    if(!loadingLongUrl && longUrlDetails === initialUrlState){
        return <div>
            Error redirecting.....
        </div>
    }

    return null;
}