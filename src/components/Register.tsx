import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "./ui/input"
import { Error } from "./Error"
import { PulseLoader } from "react-spinners"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import * as Yup from "yup"
import { useFetch } from "@/hooks/useFetch"
import { signup } from "@/utils/auth"
import { useNavigate, useSearchParams } from "react-router-dom"
import { urlState } from "@/context"

const initialState = {email:"",password:"",name:"",profile_pic:""}
export const Register = ()=>{
    const [credentials,setCredentials] = useState({email:"",password:"",name:"",profile_pic:null});
    const [errors,setErrors] = useState(initialState);

    const {data,error,loading,fn:fnSignup} = useFetch(signup,credentials);
    const {getUser} = urlState();

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");

    useEffect(()=>{
        if(data && error === null){
            console.log(data);
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`)
            getUser();
        }
    },[data,loading,error])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value,files} = e.target;

        setCredentials((prev)=>({
            ...prev,
            [name]: files ? files[0] : value
        }))
    }

    const handleSignup = async()=>{
        setErrors(initialState);
        try{
            const schema = Yup.object().shape({
                email: Yup.string().email("Invalid Email").required("Email is required"),
                password: Yup.string().min(6,"Password should be atleast 6 characters").required("Password is required"),
                name: Yup.string().required("Name is required"),
                profile_pic: Yup.mixed().required("Profile pic is required")
            })

            await schema.validate(credentials,{abortEarly:false});
            await fnSignup();
        }catch(error:any){
            const newErrors:any = {};

            error.inner?.forEach((err:any)=>{
                newErrors[err.path] = err.message
            })

            setErrors(newErrors);
        }
    }


    return <Card>
    <CardHeader>
      <CardTitle className="text-xl">Register</CardTitle>
      <CardDescription>if you haven't already signed up!!</CardDescription>
      {error && <Error message={error.message}/>}
    </CardHeader>
    
    <CardContent className="space-y-2">
        <div className="space-y-1">
            <Input 
            type="text" 
            name="name" 
            value={credentials.name}
            placeholder="Enter your Name"
            onChange={handleInputChange}
            />
            {errors.name !== "" && <Error message={errors.name}/>}
        </div>
      <div className="space-y-1">
        <Input 
        type="email" 
        name="email" 
        value={credentials.email}
        placeholder="Enter your Email"
        onChange={handleInputChange}
        />
        {errors.email !== "" && <Error message={errors.email}/>}
      </div>
      <div className="space-y-1">
        <Input 
        type="password" 
        name="password" 
        placeholder="Enter your Password"
        value={credentials.password}
        onChange={handleInputChange}/>
        {errors.password !== "" && <Error message={errors.password}/>}
      </div>
      <div className="space-y-1">
        <p>Avatar</p>
        <Input 
        type="file" 
        name="profile_pic" 
        accept="image/*"
        onChange={handleInputChange}/>
        {errors.profile_pic !== "" && <Error message={errors.profile_pic}/>}
      </div>
    </CardContent>
    <CardFooter className="flex justify-center">
      <Button onClick={handleSignup}>
        {loading ? <PulseLoader size={10}/> : "Create Account"}
      </Button>
    </CardFooter>
  </Card>
}