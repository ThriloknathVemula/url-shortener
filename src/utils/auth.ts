import supabase from "./supabase";

export const login = async({email,password}: {email:string,password:string})=>{
    const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if(error) throw new Error(error.message);

    return data;
}

export const getCurrentUser = async()=>{
    const {data:session, error} = await supabase.auth.getSession();

    if(!session.session) return null;
    if(error) throw new Error(error.message);

    return session.session?.user;
}