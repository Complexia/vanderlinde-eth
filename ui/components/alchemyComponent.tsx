"use client";

import { useEffect, useState } from "react";
import { LoginButtonGoogle } from "./auth/loginWithGoogle";
import { useAuth } from "./providers/authProvider";
import { createClient } from "@/utils/supabase/client";
import { useAccount, useAuthenticate, useSmartAccountClient } from "@alchemy/aa-alchemy/react";
import { ProfileCard } from "./ProfileCard";
import { useLogout } from "@alchemy/aa-alchemy/react";




const AlchemyComponent = () => {

    // @ts-ignore
    const { user, public_user } = useAuth();



    const { authenticate, isPending: isAuthenticatingUser } = useAuthenticate();
    const { isLoadingAccount } = useAccount({
        type: "MultiOwnerModularAccount",
        skipCreate: true,
    });

    // create AA wallet here if user is true

    const { client } = useSmartAccountClient({
        type: "MultiOwnerModularAccount",
    });







    return (
        <div>
            {client ? (
                <div className="flex flex-col items-center justify-center space-y-4">
                    <ProfileCard />
                </div>
            ) : (
                user && (isAuthenticatingUser || isLoadingAccount) ? (
                    <div className="text-[18px] font-semibold">Check your email!</div>
                ) : (
                    <div className="flex flex-col space-y-2">
                        <h1>No wallet currently connected</h1>
                        <button className="btn btn-primary" onClick={() => authenticate({ "type": "email", "email": user.email })}>Create Smart Wallet</button>
                    </div>
                )
            )}
        </div>

    );
}

export default AlchemyComponent;