import { CreateLink } from "@/components/CreateLink";
import { Error } from "@/components/Error";
import { LinkCard } from "@/components/LinkCard";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { urlState } from "@/context";
import { useFetch } from "@/hooks/useFetch";
import { getClicksForUrls } from "@/utils/clicks";
import { getUrls } from "@/utils/urls";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react"
import { ScaleLoader } from "react-spinners";
  

export const Dashboard = ()=>{
    const {user} = urlState();

    const {loading: loadingUrls, data:urls,error, fn:fnGetUrls} = useFetch(getUrls, user.id);
    const {loading: loadingClicks, data:clicks, fn:fnGetClicks} = useFetch(getClicksForUrls, urls?.map(url => url.id));
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(()=>{
        fnGetUrls();
    },[])

    let filteredUrls = urls?.filter(url => (
        url.title.toLowerCase().includes(searchQuery.toLowerCase())
    ))

    useEffect(()=>{
        if(urls !== null){
            fnGetClicks()
        }
    },[urls])

    return <div className="p-10">
        {(loadingClicks || loadingUrls) ? 
        <ScaleLoader className="text-center mt-44" color= "rgb(226 232 240 / var(--tw-text-opacity, 1))"/>
        :
        <div className="grid grid-cols-1 md:grid-cols-2 mt-2 gap-3">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl md:text-4xl font-bold">Links</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="font-semibold">{urls !== null ? urls?.length : 0} Links</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl md:text-4xl font-bold">Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="font-semibold">{clicks?.length} Clicks</p>
                </CardContent>
            </Card>
        </div>}
        <div className="flex justify-between items-center mt-5">
            <h1 className="text-2xl md:text-4xl font-bold mb-5">My Links</h1>
            <CreateLink/>
        </div>
        <div className="mt-3 flex items-center relative">
            <Input type="search" 
             value={searchQuery}
             onChange={e=>setSearchQuery(e.target.value)}
             placeholder="Search your URLs" 
             className="p-5"/>
            <Filter className="absolute top-2 right-2 p-1"/>
        </div>
        <div>
            {error && <Error message={error?.message}/>}
            {(loadingClicks || loadingUrls) ? 
            <ScaleLoader className="text-center mt-44" color= "rgb(226 232 240 / var(--tw-text-opacity, 1))"/>
            :(filteredUrls || [])?.map(eachUrl => (
                <LinkCard urlDetails={eachUrl} key={eachUrl.id} fetchUrls={fnGetUrls}/>
            ))}
        </div>
        <div><Toaster/></div>
    </div>
}