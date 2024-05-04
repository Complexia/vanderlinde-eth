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
import WorldcoinComponent from "./worldcoinComponent";
import OnrampExample from "./unlimit/onramp";




const Magic = () => {


    // @ts-ignore
    const { user, public_user } = useAuth();
    console.log("this is user ",user);

    

    

    



    return (
        <div className="flex flex-col items-center justify-center space-y-6">
            <div className="flex flex-row flex-grow items-center justify-center space-x-6">
                

                {user && <div className="card  bg-base-300 shadow-xl h-full min-h-36" >
                    <div className="card-body">

                        <AlchemyComponent />

                    </div>
                </div>}

                {user && !public_user.worldcoin && <div className="card  bg-base-300 shadow-xl h-full min-h-36" >
                    <div className="card-body">

                        <WorldcoinComponent />

                    </div>
                </div>}

            </div>
            


        </div>
    );
}

export default Magic;