export interface urlType {
    id:string | number,
    title:string,
    original_url:string,
    created_at: Date,
    custom_url?: string,
    short_url: string
}

export interface clicksType {
    created_at: Date,
    url_id: number | string,
    city: string,
    country: string
}

export const initialUrlState = {title:"",original_url:"",created_at:new Date(), custom_url:"",short_url:""};
