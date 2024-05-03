"use client";

import { useEffect, useState } from "react";
import { LoginButtonGoogle } from "./auth/loginWithGoogle";
import { useAuth } from "./providers/authProvider";
import { createClient } from "@/utils/supabase/client";
import { useAccount, useAuthenticate, useSmartAccountClient } from "@alchemy/aa-alchemy/react";
import { ProfileCard } from "./ProfileCard";





const AlchemyComponent = () => {

    const { authenticate, isPending: isAuthenticatingUser } = useAuthenticate();
    const { isLoadingAccount } = useAccount({
        type: "MultiOwnerModularAccount",
        skipCreate: true,
    });

    // create AA wallet here if user is true

    const { client } = useSmartAccountClient({
        type: "MultiOwnerModularAccount",
    });


    useEffect(() => {
        const saveWalletToSupabase = async () => {

            const supabase = createClient();

            try {

                const { data: resp, error } = await supabase
                    .from('public_users')
                    .update({ "wallet_address": client?.account?.address }).eq('id', user.id);



                if (error) {
                    // Handle error
                    console.error('Error updating wallet:', error.message);
                    return;
                }





            } catch (error) {
                console.error("Error..:", error);
            }
        }
        saveWalletToSupabase();

    }, [client]);

    // @ts-ignore
    const { user, public_user } = useAuth();
    console.log(user.email)



    return (
        <div>
            {client ? (
                <div className="flex flex-col items-center justify-center space-y-4">
                    <ProfileCard />
                    {public_user?.worldcoin && <h1 className="text-primary font-bold">World ID verified! Gas is on the house</h1>}
                </div>
            ) : (
                isAuthenticatingUser ? (
                    <div className="text-[18px] font-semibold">Check your email!</div>
                ) : (
                    <div className="flex flex-col space-y-2">
                        <h1>No wallet currently connected</h1>
                        <button className="btn btn-primary" onClick={() => authenticate({ "type": "email", "email": user.email })}>
                            {public_user?.wallet_address ? (
                                <span>Retrieve Smart Wallet</span>
                            ) : (
                                <span>Create Smart Wallet</span>
                            )}
                        </button>
                        
                    </div>
                )
            )}
        </div>


    );
}

export default AlchemyComponent;