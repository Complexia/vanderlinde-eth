"use client";

import { useEffect, useState } from "react";
import { LoginButtonGoogle } from "./auth/loginWithGoogle";
import { useAuth } from "./providers/authProvider";
import { createClient } from "@/utils/supabase/client";
import { useAccount, useAuthenticate, useSmartAccountClient } from "@alchemy/aa-alchemy/react";
import { ProfileCard } from "./ProfileCard";
import { useLogout } from "@alchemy/aa-alchemy/react";




const SupabaseComponent = () => {



    // @ts-ignore
    const { user, public_user } = useAuth();






    console.log(user, public_user)
    return (
        <div>
            {

                user ?
                    <div className="">
                        <span className="indicator-item badge badge-primary">Vanderlinded</span>
                        <div className="rating gap-1">
                            <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" checked />
                            <input type="radio" name="rating-3" className="mask mask-heart bg-orange-400" checked />
                            <input type="radio" name="rating-3" className="mask mask-heart bg-yellow-400" checked />
                            <input type="radio" name="rating-3" className="mask mask-heart bg-lime-400" checked />
                            <input type="radio" name="rating-3" className="mask mask-heart bg-green-400" />
                        </div>
                    </div>

                    // <div className="flex flex-col space-y-4">
                    //     <h1>Logged in as {user.email}</h1>
                    // </div>

                    :

                    <LoginButtonGoogle />}

        </div>
    );
}

export default SupabaseComponent;