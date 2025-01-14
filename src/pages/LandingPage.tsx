import { Brand } from "@/components/Brand"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import banner from "@/assets/banner1.png"
import { FaqComponent } from "@/components/FaqComponent"

export const LandingPage = ()=>{
    return <div className="flex flex-col items-center">
        <Brand/>
        <div className="mt-10">
            <h2 className="font-bold text-2xl md:text-4xl text-slate-200 px-10">
                The only URL shortener you'll ever need 👇
            </h2>
            <div className="py-5 px-10 flex flex-col md:flex-row items-center gap-2 w-[full] md:w-[2/4]">
                <Input placeholder="Enter your loooong URL" type="url" className="outline-none h-full py-4 px-4 md:w-[2/4]"/>
                <Button className="p-2 px-4">Shorten</Button>
            </div>
            <div className="flex justify-center">
                <img src={banner} className="h-72 w-4/5 my-10 px-10"/>
            </div>
        </div>
        <div className="w-4/5 py-10">
            <p className="font-bold text-xl mb-3">FREQUENTLY ASKED QUESTIONS</p>
            <FaqComponent/>
        </div>
    </div>
}