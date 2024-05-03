"use client";

import { useEffect } from "react";
import { LoginButtonGoogle } from "./auth/loginWithGoogle";
import { useAuth } from "./providers/authProvider";
import { createClient } from "@/utils/supabase/client";




const Magic = () => {

    const signOut = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        
      };

    // @ts-ignore
    const { user, public_user } = useAuth();

    // create AA wallet here if user is true
    useEffect(() => {
        if (user) {
            console.log('create wallet')
        }

    }, [user])


    console.log(user, public_user)
    return (
        <div>
            {

                user ?
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <h1>Logged in as {user.email}</h1>
                        <button className="btn" onClick={() => signOut()}>Sign out</button>
                    </div>

                    :

                    <LoginButtonGoogle />}

        </div>
    );
}

export default Magic;