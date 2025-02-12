import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useEffect, useState } from "react"
import { urlState } from "@/context"
import { useNavigate, useSearchParams } from "react-router-dom"
import { createUrl } from "@/utils/urls"
import * as Yup from 'yup'
import { Error } from "./Error"
import { PulseLoader } from "react-spinners"
import { useFetch } from "@/hooks/useFetch"
  
const initialState = {title:"",longUrl:"",customUrl:""}
export const CreateLink = ()=>{
    const {user} = urlState();

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const longLink = searchParams.get("createNew");

    const [formData, setFormData] = useState({
        title:"",
        customUrl:"",
        longUrl:longLink ? longLink : ""
    });

    const {data, error, loading, fn:fnCreateUrl} = useFetch(createUrl, {...formData, userId: user.id});

    const [errors, setErrors] = useState(initialState);

    useEffect(()=>{
        if(error === null && data){
            navigate(`/link/${data[0].id}`)
        }
    },[data,error])

    const onFormDataChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setFormData((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }



    const onClickCreateLink = async()=>{
        setErrors(initialState);

        try{
            const schema = Yup.object().shape({
                title: Yup.string().required("Title is required"),
                longUrl: Yup.string().url("Invalid URL").required("URL is required"),
                customUrl: Yup.string().optional()
            });

            await schema.validate(formData, {abortEarly: false});
            await fnCreateUrl();
            setFormData(initialState);
        }catch(error:any){
            const newErrors:any = {};

            error.inner?.forEach((err:any)=>{
                newErrors[err.path] = err.message
            })

            setErrors(newErrors);
        }
    }

    return <Dialog defaultOpen={longLink}
    onOpenChange={(res)=>{if(!res) setSearchParams({})}}>
    <DialogTrigger><Button>Create New Link</Button></DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="font-semibold text-2xl mb-2">Trimlify your Long URL</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-3">
        <Input placeholder="Title of your URL" 
         name="title" 
         onChange={onFormDataChange} 
         value={formData.title}/>
         {errors.title && <Error message={errors.title}/>}
        <Input placeholder="Enter your long URL"
         name="longUrl" 
         onChange={onFormDataChange} 
         value={formData.longUrl}/>
         {errors.longUrl && <Error message={errors.longUrl}/>}
        <Input placeholder="Custom URL (Optional)"
         name="customUrl" 
         onChange={onFormDataChange} 
         value={formData.customUrl}/>
         {error && <Error message={error.message}/>}
      </div>
      <DialogFooter className="justify-start">
          <Button disabled = {loading} type="submit" onClick={onClickCreateLink}>{loading ? <PulseLoader size={10}/> : "Trimlify"}</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  
}