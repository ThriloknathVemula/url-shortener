import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { urlState } from "@/context";
import { useFetch } from "@/hooks/useFetch";
import { getClicksForUrls } from "@/utils/clicks";
import { getUrls } from "@/utils/urls";
import { url } from "inspector";
import { useEffect, useState } from "react"
import { ScaleLoader } from "react-spinners";
  

export const Dashboard = ()=>{
    const {user} = urlState();

    const {loading: loadingUrls, data:urls, fn:fnGetUrls} = useFetch(getUrls, user.id);
    const {loading: loadingClicks, data:clicks, fn:fnGetClicks} = useFetch(getClicksForUrls, urls?.map(url => url.id));
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(()=>{
        fnGetUrls();
    },[])

    const filteredUrls = urls?.filter(url => {
        url.title.toLowerCase().includes(searchQuery.toLowerCase())
    })

    useEffect(()=>{
        if(urls?.length){
            fnGetClicks()
        }
    },[urls.length])



    return <div className="p-10">
        <h1 className="text-4xl font-bold mb-5">Dashboard</h1>
        {(loadingClicks && loadingUrls) ? 
        <ScaleLoader className="text-center mt-44" color= "rgb(226 232 240 / var(--tw-text-opacity, 1))"/>
        :
        <div className="grid grid-cols-2 gap-3">
            <Card>
                <CardHeader>
                    <CardTitle className="text-4xl font-bold">Links</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="font-semibold">{urls} Links</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-4xl font-bold">Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="font-semibold">{clicks} Clicks</p>
                </CardContent>
            </Card>
        </div>}
        <Input type="search"/>
    </div>
}