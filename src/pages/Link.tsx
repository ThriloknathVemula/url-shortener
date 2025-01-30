import LocationStats from "@/components/LocationStats";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { urlState } from "@/context";
import { toast } from "@/hooks/use-toast";
import { useFetch } from "@/hooks/useFetch";
import { getClicksForSingleUrl } from "@/utils/clicks";
import { deleteUrl, getUrl } from "@/utils/urls";
import { Copy, Trash } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { BeatLoader, ScaleLoader } from "react-spinners";

export const Link = ()=>{
    const {id} = useParams();
    const {user} = urlState();

    const {fn:fnGetUrl, loading, data:url, error} = useFetch(getUrl,{id,userId: user?.id});
    const {fn:fnGetClicks, loading:loadingClicks, data:clicks} = useFetch(getClicksForSingleUrl, id);

    useEffect(()=>{
        fnGetUrl()
    },[])

    useEffect(()=>{
        fnGetClicks()
    },[])

    const onClickCopy = ()=>{
        navigator.clipboard.writeText(`https://trimly/${url.custom_url !== null ? url?.custom_url : url?.short_url}`)
        toast({
            title:"Link copied to clipboard"
        })
    }


    const {loading: loadingDelete, fn: fnDelete} = useFetch(deleteUrl,id);

    const onClickDelete = async()=>{
        await fnDelete();
    }

    if(loading || loadingClicks) return <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader className="mb-4" color="white"/>
    </div>
    
    return <div className="px-5 pt-5">
            <h1 className="font-bold text-xl md:text-3xl">Link Details</h1>
            <div className="flex flex-row items-center border-solid border-gray-800 p-2 md:p-5 rounded-md border-2 mt-4 justify-between">
            <div className="flex flex-col items-start gap-1">
                <h1 className="font-bold md:text-3xl text-xl">{url?.title}</h1>
                <p className="text-lg md:text-2xl font-semibold text-blue-600">https://trimly/{url?.custom_url !== null ? url?.custom_url : url?.short_url}</p>
                <p className="italic text-sm text-gray-500">{url?.original_url}</p>
                <p className="mt-2 text-sm text-gray-200">{new Date(url?.created_at).toLocaleString()}</p>
            </div>
            <div className="flex flex-col md:flex-row items-center">
                <Button variant="ghost" onClick={onClickCopy}>
                    <Copy/>
                </Button>
                <Button variant="ghost" onClick={onClickDelete}>
                    {loadingDelete ? <BeatLoader size={2}/> :<Trash/>}
                </Button>
            </div>
        </div>
        <h1 className="font-bold text-xl md:text-3xl mt-7 px-5">Analytics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 items-center justify-center">
            <div className="border-solid border-gray-800 border-2 rounded-md p-5">
                <h1 className="font-bold text-lg md:text-2xl">Clicks</h1>
                <p className="text-lg md:text-xl">Total Clicks: <span className="font-semibold">{clicks?.length}</span></p>
            </div>
            <LocationStats clicks={clicks}/>
        </div>
        <div><Toaster/></div>
    </div>

}