import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import {PulseLoader} from "react-spinners"
import { Error } from "./Error"
import { useEffect, useState } from "react"
import * as Yup from 'yup'
import { useFetch } from "@/hooks/useFetch"
import { login } from "@/utils/auth"
import { useNavigate, useSearchParams } from "react-router-dom"

const initialState = {email:"",password:""};
  

export const Login = ()=>{
    const [credentials,setCredentials] = useState(initialState);
    const [errors,setErrors] = useState(initialState);

    const {data,error,loading,fn: fnLogin} = useFetch(login,credentials);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const longLink =searchParams.get("createNew")

    useEffect(()=>{
      if(error===null && data){
        console.log(data);
        navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`)
      }
    },[data,error])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setCredentials((prev)=>({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    const handleLogin = async()=>{
        setErrors(initialState)
        try{
            const schema = Yup.object().shape({
                email: Yup.string().email("Invalid Email").required("Email is required"),
                password: Yup.string().min(6,"Password should be atleast 6 characters").required("Password is required")
            })

            await schema.validate(credentials, {abortEarly: false})

            //api call
            await fnLogin();
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
      <CardTitle className="text-xl">Login</CardTitle>
      <CardDescription>to your account if you already have one</CardDescription>
      {error && <Error message={error.message}/>}
    </CardHeader>
    
    <CardContent className="space-y-2">
      <div className="space-y-1">
        <Input 
        type="email" 
        name="email" 
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
        onChange={handleInputChange}/>
        {errors.password !== "" && <Error message={errors.password}/>}
      </div>
    </CardContent>
    <CardFooter className="flex justify-center">
      <Button onClick={handleLogin}>
        {loading ? <PulseLoader size={10}/> : "Login"}
      </Button>
    </CardFooter>
  </Card>
  
}