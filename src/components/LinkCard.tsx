import { Copy, DeleteIcon, Download, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

export const LinkCard = ({urlDetails, fetchUrls}:any)=>{
    const {qr,title,original_url,short_url,custom_url,created_at} = urlDetails;
    const {toast} = useToast();

    const onClickCopy = ()=>{
        navigator.clipboard.writeText(`https://trimly/${custom_url !== null ? custom_url : short_url}`)
        toast({
            title:"Link copied to clipboard"
        })
    }

    return <div className="flex flex-col md:flex-row md:items-center border-solid border-gray-800 p-2 md:p-5 rounded-md border-2 mt-4 justify-center md:justify-between">
        <div>
            {qr !== null ? 
            <img  src={qr} className="h-32 object-contain ring ring-blue-500 self-start" alt="qr-image"/> 
            : <p>qr not available</p>}
        </div>
        <div className="flex flex-col items-start gap-1">
            <h1 className="font-bold md:text-2xl text-lg">{title}</h1>
            <p className="italic">https://trimly/{custom_url !== null ? custom_url : short_url}</p>
            <p className="italic">{original_url}</p>
            <p className="mt-2 text-sm text-gray-200">{new Date(created_at).toLocaleString()}</p>
        </div>
        <div className="flex items-center">
            <Button variant="ghost" onClick={onClickCopy}>
                <Copy/>
            </Button>
            <Button variant="ghost"><Download/></Button>
            <Button variant="ghost"><Trash/></Button>
        </div>
    </div>
}