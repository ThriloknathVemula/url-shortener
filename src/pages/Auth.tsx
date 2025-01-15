import { useSearchParams } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Login } from "@/components/login"
import { Register } from "@/components/Register"


export const Auth = ()=>{
    const [searchParams] = useSearchParams()
    return <div className="flex flex-col items-center">
        <div className="font-bold text-2xl md:text-5xl text-slate-200 p-10">
            {searchParams.get("createNew") ? 
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