import supabase from "./supabase"

export const getUrls = async(userId: any)=>{
    const {data,error} = await supabase.from("urls").select("*").eq("user_id",userId);

    if(error){
        throw new Error("Unable to fetch urls");
    }

    return data;
}

export const createUrl = async(props:{title:string,longUrl:string,customUrl:string|null,userId:any})=>{
    console.log(props);
    const {title,longUrl,customUrl,userId} = props;
    const shortUrl = Math.random().toString(36).substring(2,8);

    console.log(title);
    console.log(longUrl);
    console.log(customUrl);
    console.log(userId)

    const {data,error} = await supabase.from("urls").insert([{
        title,
        original_url: longUrl,
        custom_url: customUrl || null,
        short_url: shortUrl,
        user_id: userId
    }]).select();

    if(error){
        console.error(error.message);
        throw new Error("Error creating short URL")
    }

    return data;
}

export const deleteUrl = async(urlId: any)=>{
    const {data,error} = await supabase.from("urls").delete().eq("id",urlId);

    if(error){
        throw new Error("Unable to delete url");
    }

    return data;
}