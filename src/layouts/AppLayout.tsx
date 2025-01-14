import { Header } from "@/components/Header"
import { Outlet } from "react-router-dom"

export const AppLayout = ()=>{
    return <div>
        <main className="min-h-screen">
            <Header/>
            <Outlet/>
        </main>

        <div className="bg-gray-800 p-10 text-center mt-10">Made with 🖤 by <span className="font-bold">THRILOK</span></div>
    </div>
}