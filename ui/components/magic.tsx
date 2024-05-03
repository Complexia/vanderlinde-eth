"use client";

import { useEffect, useState } from "react";
import { LoginButtonGoogle } from "./auth/loginWithGoogle";
import { useAuth } from "./providers/authProvider";
import { createClient } from "@/utils/supabase/client";
import { useAccount, useAuthenticate, useSmartAccountClient } from "@alchemy/aa-alchemy/react";
import { ProfileCard } from "./ProfileCard";
import { useLogout } from "@alchemy/aa-alchemy/react";
import SupabaseComponent from "./supabaseComponent";
import AlchemyComponent from "./alchemyComponent";




const Magic = () => {

    const signOut = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        logout();

    };

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

    console.log(client)

    const { logout } = useLogout({
        onSuccess: () => {
            // [optional] Do something after the user has been logged out
        },
        onError: (error) => {
            // [optional] Do something with the error
        },
        // [optional] ...additional mutationArgs
    });



    return (
        <div className="flex flex-col items-center justify-center space-y-6">
            <div className="flex flex-row items-center justify-center space-x-6">
                <div className="card  bg-base-300 shadow-xl">
                    <div className="card-body">
                        <SupabaseComponent />
                    </div>
                </div>

                <div className="card  bg-base-300 shadow-xl">
                    <div className="card-body">
                        <AlchemyComponent />
                    </div>
                </div>
            </div>

            <button className="btn w-full" onClick={() => signOut()}>Sign out</button>

        </div>
    );
}

export default Magic;