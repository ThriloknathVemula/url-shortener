import { Copy, DeleteIcon, Download, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { deleteUrl } from "@/utils/urls";
import { BeatLoader } from "react-spinners";
import { useFetch } from "@/hooks/useFetch";

export const LinkCard = ({urlDetails, fetchUrls}:any)=>{
    const {qr,title,original_url,short_url,custom_url,created_at,id} = urlDetails;
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

    return <div className="flex flex-row items-center border-solid border-gray-800 p-2 md:p-5 rounded-md border-2 mt-4 justify-between">
        {/* <div>
            {qr !== null ? 
            <img  src={qr} className="h-32 object-contain ring ring-blue-500 self-start" alt="qr-image"/> 
            : <p>qr not available</p>}
        </div> */}
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
            {/* <Button variant="ghost"><Download/></Button> */}
            <Button variant="ghost" onClick={onClickDelete}>
                {loadingDelete ? <BeatLoader size={2}/> :<Trash/>}
            </Button>
        </div>
    </div>
}