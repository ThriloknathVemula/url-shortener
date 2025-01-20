import supabase from "./supabase"

export const getClicksForUrls = async(urlIds:any[]) =>{
    const {data,error} = await supabase.from("clicks").select("*").in("url_id",urlIds);

    if(error){
        throw new Error(error.message);
    }

    return data;
}