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
import { jwtDecode } from "jwt-decode";



const Magic = () => {
    // @ts-ignore
    const { user, public_user } = useAuth();
    const [token, setToken] = useState(null);
    // console.log("this is user ",user);

    // get vanderline from localStorage
    let vanderlineString = localStorage.getItem('vanderline');
    const vanderlineData = JSON.parse(vanderlineString);
    console.log("this is vanderline ", vanderlineData);

    // const generateJwt = async () => {
    //     const secret = vanderlineData.nonce;
    //     if (typeof secret !== 'string') {
    //         console.error('Invalid JWT secret. Secret must be a string.');
    //         throw new TypeError('Invalid JWT secret. Secret must be a string.');
    //     }
    //     let payload = {
    //         email: public_user?.email,
    //         display_name: public_user?.display_name,
    //         address: public_user?.wallet_address,
    //         worldcoin: public_user?.worldcoin,
    //     }
    //     console.log('Auth payload:', payload)
    //     let stuff = {
    //         payload,
    //         secret
    //     }
    //     let res = await fetch('/api/sign-jwt', {
    //         method: 'POST',
    //         body: JSON.stringify(stuff),
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })

    //     let body = await res.json()
    //     setToken(body)
    //     console.log("body res", body)
    //     console.log("token ", token)
    //     const expiresIn = '12h';
    // }
    // generate jwt_token
    // give client an option of redirect back into their application ?

    return (
        <div className="flex flex-col items-center justify-center space-y-6">
            <div className="flex flex-row flex-grow items-center justify-center space-x-6">

                {!user && <div className="card   mt-44 h-full min-h-36" >
                    
                    <div className="card-body text-3xl font-bold text-center">
                        <article className="prose"><h1>Welcome to the future of Web3.</h1>
                        <h1> No more Metamask.</h1></article>
                        
                        </div>
                        
                    
                    </div>}

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