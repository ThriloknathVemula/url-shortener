import supabase from "./supabase"

export const getClicksForUrls = async(urlIds:any[]) =>{
    const {data,error} = await supabase.from("clicks").select("*").in("url_id",urlIds);

    if(error){
        throw new Error(error.message);
    }

    return data;
}

export const storeClicks = async(urlId:any)=>{
    try{
        const response = await fetch("https://ipapi.co/json");
        const {country_name:country, city} = await response.json();
        await supabase.from("clicks").insert({
            url_id:urlId,
            country,
            city
        })

    }catch(error){
        throw new Error("Error");
    }
}

export const getClicksForSingleUrl = async(urlId:any)=>{
    const {data,error} = await supabase.from("clicks").select("*").eq("url_id",urlId);

    if(error){
        throw new Error("Error fetching details")
    }

    return data;
}