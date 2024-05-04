"use client";

import { useEffect, useState } from "react";
import { LoginButtonGoogle } from "./auth/loginWithGoogle";
import { useAuth } from "./providers/authProvider";
import { createClient } from "@/utils/supabase/client";
import { useAccount, useAuthenticate, useSmartAccountClient } from "@alchemy/aa-alchemy/react";
import { ProfileCard } from "./ProfileCard";
import { WorldCoinLogin } from "./worldCoin/worldCoinLogin";





const WorldcoinComponent = () => {








    // @ts-ignore
    const { user, public_user } = useAuth();




    return (
        <div className="flex flex-col space-y-2">
            <h1 className="">Sign in with WorldID to have free txns!</h1>
            <WorldCoinLogin />


        </div>

    );
}

export default WorldcoinComponent;