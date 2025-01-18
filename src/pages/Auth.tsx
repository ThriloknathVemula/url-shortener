import { useNavigate, useSearchParams } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Login } from "@/components/Login"
import { Register } from "@/components/Register"
import { urlState } from "@/context"
import { useEffect } from "react"


export const Auth = ()=>{
    const [searchParams] = useSearchParams()
    const navigate = useNavigate();
    const longLink = searchParams.get("createNew")
    const {isAuthenticated,loading} = urlState();

    useEffect(()=>{
        if(isAuthenticated && !loading) navigate(`/dashboard?${longLink ? `createNew=${longLink}`:""}`)
    },[isAuthenticated,loading])

    return <div className="flex flex-col items-center">
        <div className="font-bold text-2xl md:text-5xl text-slate-200 p-10">
            {longLink ? 
            "Hold on! Let's Login first..."
            : "Login/ Register"}
        </div>
        <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login"><Login/></TabsContent>
        <TabsContent value="register"><Register/></TabsContent>
        </Tabs>

    </div>
}