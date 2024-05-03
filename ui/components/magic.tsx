"use client";

import { useEffect, useState } from "react";
import { LoginButtonGoogle } from "./auth/loginWithGoogle";
import { useAuth } from "./providers/authProvider";
import { createClient } from "@/utils/supabase/client";
import { useAccount, useAuthenticate, useSmartAccountClient } from "@alchemy/aa-alchemy/react";
import { ProfileCard } from "./ProfileCard";




const Magic = () => {

    const signOut = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();

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

    
    console.log(user, public_user)
    return (
        <div>
            {

                user ?
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <h1>Logged in as {user.email}</h1>

                        <ProfileCard />
                        
                        <button className="btn" onClick={() => authenticate({"type": "email", "email": user.email}) }>Create Smart Wallet</button>
                        <button className="btn" >Sign out</button>
                    </div>

                    :

                    <LoginButtonGoogle />}

        </div>
    );
}

export default Magic;