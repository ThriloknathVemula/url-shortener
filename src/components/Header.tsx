import { Link, useNavigate } from "react-router-dom"
import logo from "@/assets/logo.png"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LinkIcon, LogOutIcon, User } from "lucide-react";
import { urlState } from "@/context";
import { useFetch } from "@/hooks/useFetch";
import { logout } from "@/utils/auth";
import { BarLoader } from "react-spinners";

export const Header = ()=>{
    const navigate = useNavigate();
    const {user,fetchUser} = urlState();

    const {loading, fn: fnLogout} = useFetch(logout);

    const handleLogout = ()=>{
      fnLogout().then(()=>navigate('/'))
      fetchUser();
    }

    return <> <div className="py-4 w-[screen] flex justify-between items-center mx-5">
        <Link to="/"><img src={logo} className="h-16" alt="Trimly Logo"/></Link>
        {!user ? <Button className="ml-auto" onClick={()=>navigate('/auth')}>Login</Button>
        : <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar className="outline-none w-10 rounded-full overflow-hidden">
                <AvatarImage className="object-contain" src={user.user_metadata.profile_pic} />
                <AvatarFallback>{user.user_metadata.name.toUpperCase()}</AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{user.user_metadata.name[0].toUpperCase()+user.user_metadata.name.slice(1)}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to="/user">
          <DropdownMenuItem> 
            <User/> Profile
          </DropdownMenuItem>
          </Link>
          <Link to="/dashboard">
            <DropdownMenuItem>
              <LinkIcon/>
              Links
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={handleLogout} className="text-red-500">
            <LogOutIcon/>
            Logout
        </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      }
    </div>
    {loading && <BarLoader className="mb-4" width={"100%"} color="white"/>}
    </>
}