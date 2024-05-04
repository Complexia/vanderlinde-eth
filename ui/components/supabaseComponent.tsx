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
                    <div className="flex flex-col space-y-4">
                        <h1>Logged in as {user.email}</h1>

                    </div>

                    :

                    <LoginButtonGoogle />}

        </div>
    );
}

export default SupabaseComponent;