import { Avatar } from "@/components/ui/avatar"
import { urlState } from "@/context"
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

export const User = ()=>{
    const {user} = urlState();
    return <div className="flex justify-center items-center">
        <div className="p-10 border-1 rounded-md bg-gray-800 flex flex-col items-center">
            <Avatar className="outline-none w-24 h-24 rounded-full overflow-hidden">
                    <AvatarImage className="object-contain" src={user.user_metadata.profile_pic} />
                    <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="mt-2 mb-2">
                <p><span>Name</span>: Rahul</p>
                <p><span>Email</span>: rahul@example.com</p>
            </div>
            <p>Member since <span>December 2024</span></p>
        </div>
    </div>
}