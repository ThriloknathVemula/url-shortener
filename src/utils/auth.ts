import supabase from "./supabase";

export const login = async({email,password}: {email:string,password:string})=>{
    const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if(error) throw new Error(error.message);

    return data
}