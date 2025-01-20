import supabase from "./supabase"

export const getUrls = async(userId: any)=>{
    const {data,error} = await supabase.from("urls").select("*").eq("user_id",userId);

    if(error){
        throw new Error(error.message);
    }

    return data;
}