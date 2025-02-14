import supabase from "./supabase"

export const getClicksForUrls = async(urlIds:any[]) =>{
    const {data,error} = await supabase.from("clicks").select("*").in("url_id",urlIds);

    if(error){
        throw new Error(error.message);
    }

    return data;
}

export const storeClicks = async(urlId:string | number, originalUrl:string)=>{
    try{
        const response = await fetch("https://ipapi.co/json");
        const {country_name:country, city} = await response.json();
        await supabase.from("clicks").insert({
            url_id:urlId,
            country,
            city
        })
        window.location.href = originalUrl;

    }catch(error){
        throw new Error("Error");
    }
}

export const getClicksForSingleUrl = async(urlId:any)=>{
    console.log(urlId)
    const {data,error} = await supabase.from("clicks").select("*").eq("url_id",urlId);

    if(error){
        throw new Error("Error fetching details")
    }

    return data;
}