"use client";

import { useAuth } from "./providers/authProvider";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../registry/new-york/ui/avatar"
import { Button } from "../registry/new-york/ui/button"
import Link from "next/link";

const DropDown = () => {

    //@ts-ignore
    const { user, public_user } = useAuth();
    let first_name = public_user?.personal_info?.first_name;
    let last_name = public_user?.personal_info?.last_name;
    let initials = first_name?.charAt(0).toUpperCase() + last_name?.charAt(0).toUpperCase()

    // console.log(user.user_metadata.avatar_url)
    


    return (
        <details className="dropdown">
            <summary className="btn btn-ghost hover:bg-transparent  bg-transparent border-0 relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={public_user.avatar_from_auth} alt="@shadcn" />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
            </summary>

            {/* <Button variant="ghost" className="relative h-8 w-8 rounded-full">

                <Avatar className="h-8 w-8">
                    <AvatarImage src={public_user?.image_url?.url} alt="@shadcn" />
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
            </Button> */}



            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                
                <Link href="/gallery">
                    <li><span>Home</span></li>
                </Link>

                <Link href="/">
                    <li><span>Station</span></li>
                </Link>

                <Link href={`/${public_user?.display_name}`}> 
                    <li><span>Profile</span></li>
                </Link>

                
                
            </ul>
        </details>
    )
}

export default DropDown
