"use client";

import { useEffect, useState } from "react";
import { LoginButtonGoogle } from "./auth/loginWithGoogle";
import { useAuth } from "./providers/authProvider";
import { createClient } from "@/utils/supabase/client";
import { useAccount, useAuthenticate, useSmartAccountClient } from "@alchemy/aa-alchemy/react";
import { ProfileCard } from "./ProfileCard";
import SupabaseComponent from "./supabaseComponent";
import { LocalAccountSigner, baseSepolia } from "@alchemy/aa-core";
import { privateKeyToAccount } from "viem/accounts";
import { Hex } from "viem";
import { createModularAccountAlchemyClient } from "@alchemy/aa-alchemy";
import { IconSpinner } from "@/registry/new-york/ui/icons";





const AlchemyComponent = () => {

    // @ts-ignore
    const { user, public_user } = useAuth();
    const [privateKey, setPrivateKey] = useState<string | null>(null);
    const [publicKey, setPublicKey] = useState<string | null>(null);
    const [client, setClient] = useState<any>(null);

    let private_key = public_user?.private_key;

    if (!private_key) {
        private_key = require("crypto").randomBytes(32).toString("hex");
        
    }

    //const privateKey = require("crypto").randomBytes(32).toString("hex");
    // signer (userop) -> bundler eoa (transaction [userop,userop]) -> EP -> sca -> contract
    const signer = LocalAccountSigner.privateKeyToAccountSigner(`0x${private_key}`);
    const account = privateKeyToAccount(`0x${private_key}`);



    // const { authenticate, isPending: isAuthenticatingUser } = useAuthenticate();
    // const { isLoadingAccount } = useAccount({
    //     type: "MultiOwnerModularAccount",
    //     skipCreate: true,
    // });

    // create AA wallet here if user is true

    // const { client } = useSmartAccountClient({
    //     type: "MultiOwnerModularAccount",
    // });




    useEffect(() => {
        const saveWalletToSupabase = async () => {

            const client = await createModularAccountAlchemyClient({
                apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!,
                chain: baseSepolia,
                signer,
                gasManagerConfig: {
                    policyId: process.env.POLICY_ID!,
                },
            });

            setClient(client);
            console.log(client)


            if (!public_user.private_key) {
                const supabase = createClient();

                try {

                    const { data: resp, error } = await supabase
                        .from('public_users')
                        .update({ "wallet_address": account, "private_key": private_key }).eq('id', user.id);



                    if (error) {
                        // Handle error
                        console.error('Error updating wallet:', error.message);
                        return;
                    }





                } catch (error) {
                    console.error("Error..:", error);
                }
            }

        }

        saveWalletToSupabase();




    }, []);



    console.log(user.email)



    return (
        <div className="flex flex-col space-y-4">
            <SupabaseComponent />
            {client ? (
                <div className="flex flex-col items-center justify-center space-y-4">
                    <ProfileCard />
                    {public_user?.worldcoin && <h1 className="text-primary font-bold">World ID verified! Gas is on the house</h1>}
                </div>
            ) : (
                <IconSpinner />
            )}
        </div>


    );
}

export default AlchemyComponent;