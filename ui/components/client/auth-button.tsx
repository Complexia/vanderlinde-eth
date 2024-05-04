"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const AuthButton = () => {
    // get origin url to redirect to
    let redirect_url = process.env.NEXT_PUBLIC_ORIGIN_URL;
    let auth_url = process.env.NEXT_PUBLIC_AUTH_URL;
    const client_id = "0fa3f656ae609be6598ecef02623d270";
    const origin_url = "http://localhost:3001/user";
    // generate message
    // let message = Math.random().toString(36).substring(7);
    // let nonce = Math.random().toString(36).substring(7);

    const [message, setMessage] = useState(null);
    const [nonce, setNonce] = useState(null);

    // This ensures the code runs only on the client-side
    useEffect(() => {
        // This ensures the code runs only on the client-side
        if (typeof window !== "undefined") {
            let polarData = localStorage.getItem('polar');
            // Check if 'polar' data already exists in localStorage
            if (!polarData || Object.keys(polarData).length === 0) {
                // Generate message and nonce if 'polar' doesn't exist
                const newMessage = Math.random().toString(36).substring(7);
                const newNonce = Math.random().toString(36).substring(7);
                const polar = {
                    message: newMessage,
                    nonce: newNonce
                };
                // Logging and saving to localStorage
                console.log("saving nonce and message in 'polar':", polar);
                const authDataString = JSON.stringify(polar);
                localStorage.setItem('polar', authDataString);
                setMessage(newMessage);
                setNonce(newNonce);
            } else {
                const existingPolar = JSON.parse(polarData);
                setMessage(existingPolar.message);
                setNonce(existingPolar.nonce);
                console.log("'polar' already exists in localStorage.", existingPolar);
            }
        }
    }, []);

    const redirect_polar = () => {
        const url = `${auth_url}?message=${message}&nonce=${nonce}$client_id=${client_id}&origin_url=${origin_url}`;
        window.open(url, '_blank');
    };

    return (
        <div>
            {/* <Link href={{
                pathname: auth_url,
                query: {
                    message,
                    nonce,
                    client_id,
                    origin_url
                },
            }}> */}
            <button className="btn btn-outline btn-secondary" onClick={redirect_polar}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.25 10.0546V8C5.25 4.27208 8.27208 1.25 12 1.25C15.7279 1.25 18.75 4.27208 18.75 8V10.0546C19.8648 10.1379 20.5907 10.348 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.40931 10.348 4.13525 10.1379 5.25 10.0546ZM6.75 8C6.75 5.10051 9.10051 2.75 12 2.75C14.8995 2.75 17.25 5.10051 17.25 8V10.0036C16.867 10 16.4515 10 16 10H8C7.54849 10 7.13301 10 6.75 10.0036V8ZM8 17C8.55228 17 9 16.5523 9 16C9 15.4477 8.55228 15 8 15C7.44772 15 7 15.4477 7 16C7 16.5523 7.44772 17 8 17ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17ZM17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16Z" fill="#1C274C" /></svg>
                Authenticate via Polar</button>
            {/* </Link> */}
        </div>
    )

}


export default AuthButton;