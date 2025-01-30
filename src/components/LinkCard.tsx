import { Copy, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { deleteUrl } from "@/utils/urls";
import { BeatLoader } from "react-spinners";
import { useFetch } from "@/hooks/useFetch";
import { useNavigate } from "react-router-dom";

export const LinkCard = ({urlDetails, fetchUrls}:any)=>{
    const {title,original_url,short_url,custom_url,created_at,id} = urlDetails;
    const navigate = useNavigate();
    const {toast} = useToast();

    const onClickCopy = ()=>{
        navigator.clipboard.writeText(`https://trimly/${custom_url !== null ? custom_url : short_url}`)
        toast({
            title:"Link copied to clipboard"
        })
    }


    const {loading: loadingDelete, fn: fnDelete} = useFetch(deleteUrl,id);

    const onClickDelete = async()=>{
        await fnDelete();
        fetchUrls();
    }

    return <div onClick={()=>navigate(`/link/${id}`)} className="flex flex-row items-center border-solid border-gray-800 p-2 md:p-5 rounded-md border-2 mt-4 justify-between cursor-pointer">
        <div className="flex flex-col items-start gap-1">
            <h1 className="font-bold md:text-3xl text-xl">{title}</h1>
            <p className="text-lg md:text-2xl font-semibold text-blue-600">https://trimly/{custom_url !== null ? custom_url : short_url}</p>
            <p className="italic text-sm text-gray-500">{original_url}</p>
            <p className="mt-2 text-sm text-gray-200">{new Date(created_at).toLocaleString()}</p>
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
}