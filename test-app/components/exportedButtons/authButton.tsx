"use client"

import Link from "next/link";

// this button takes params and redirects to vanerlinde to make a txn
const AuthButton = ({ name, client_id }) => {
    const vanderlinde_url = process.env.NEXT_PUBLIC_VANDERLINDE_URL;
    const origin_url = process.env.NEXT_PUBLIC_ORIGIN_URL;
    const redirect_url = `${vanderlinde_url}/cali`;
   
    return (
        <div>

            <Link href={{
                pathname: redirect_url,
                query: {
                    origin_url,
                    client_id,
                    
                },
            }}>
                <button className="btn btn-primary">
                    {name}
                </button>
            </Link>
        </div>
    );
}

export default AuthButton;