import { Link, useNavigate } from "react-router-dom"
import logo from "@/assets/logo.png"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LinkIcon, LogOut, LogOutIcon, User } from "lucide-react";

export const Header = ()=>{
    const navigate = useNavigate();
    const user = false;

    return <div className="py-4 w-[screen] flex justify-between items-center mx-5">
        <Link to="/"><img src={logo} className="h-16" alt="Trimly Logo"/></Link>
        {!user ? <Button className="ml-auto" onClick={()=>navigate('/auth')}>Login</Button>
        : <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar className="outline-none w-10 rounded-full overflow-hidden">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User/>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LinkIcon/>
            Links
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-500">
            <LogOutIcon/>
            Logout
        </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      }
    </div>
}