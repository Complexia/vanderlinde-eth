"use client"

import { createClient } from "@/utils/supabase/client";
import AuthButton from "../../ui/components/client/auth-button"
import { useLogout } from "@alchemy/aa-alchemy/react";





import Link from "next/link";
import { LoginButtonGoogle } from "./auth/loginWithGoogle";
import TxnButton2 from "./TxnButton2";
import { useEffect, useState } from "react";


const Navbar = ({ user }) => {
    const [publicUser, setPublicUser] = useState(null);
    console.log("this is client-user", user);
    if (!user == null) {
        localStorage.setItem('user', JSON.stringify(user));
    };

    useEffect(() => {
        setPublicUser(user);
    }, [user]);

    const signOut = async () => {
        localStorage.removeItem('user');
        localStorage.removeItem('polar');
        setPublicUser(null);
        // const supabase = createClient();
        // await supabase.auth.signOut();
    };


    return (

        <nav className="w-full flex justify-center">
            <div className="w-screen flex justify-between items-center p-3 ml-4 text-sm">

                <Link href="/" className="flex">
                    <span className="cursor-pointer font-bold text-2xl">
                        Vanderlinde
                    </span>
                </Link>
                <div className="flex flex-row space-x-2">



                    {publicUser ? (
                        <div className="flex flex-row space-x-4">
                            <div>
                                <Link href="/register">
                                    <button className="btn btn-primary">Register Project</button>
                                </Link>


                            </div>
                            <div>
                                {publicUser && <button className="btn btn-primary w-full" onClick={() => signOut()}>Sign out</button>}
                            </div>

                        </div>
                    ) : (
                        <div className="flex justify-center items-center space-x-4">
                            {/* <LoginButtonGoogle /> */}
                            <AuthButton />
                        </div>
                    )}





                </div>
            </div>
        </nav>

    );
}

export default Navbar