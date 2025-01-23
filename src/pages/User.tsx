import { Avatar } from "@/components/ui/avatar"
import { urlState } from "@/context"
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import {format} from 'date-fns'

export const User = ()=>{
    const {user} = urlState();
    const registeredAt = format(new Date(user?.created_at).toLocaleDateString(), "MMMM yyyy");
    return <div className="flex flex-col justify-center items-center mt-12 md:mt-24">
        <h1 className="font-bold md:text-4xl mb-10 text-2xl">User Details</h1>
        <div className="p-10 rounded-md border-solid border-2 flex flex-col items-center shadow-lg">
            <Avatar className="outline-none w-24 h-24 rounded-full overflow-hidden">
                    <AvatarImage className="object-contain" src={user?.user_metadata.profile_pic} />
                    <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1 items-center mt-4 mb-4">
                <p><span className="font-semibold">Name</span>: <span className="mr-3">{user?.user_metadata.name}</span></p>
                <p><span className="font-semibold">Email</span>: <span>{user?.email}</span></p>
            </div>
            <p>Member since <span className="font-semibold">{registeredAt}</span></p>
        </div>
    </div>
}