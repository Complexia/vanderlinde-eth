"use client"

import Link from "next/link";

// this button takes params and redirects to vanerlinde to make a txn
const TxnButton = ({ name, target_chain, target_address, txn_data }) => {
    const vanderlinde_url = process.env.NEXT_PUBLIC_VANDERLINDE_URL;
    const origin_url = process.env.NEXT_PUBLIC_ORIGIN_URL;
    const redirect_url = `${vanderlinde_url}/texas`;
    // const target_chain = "ethereum";
    // const target_address = "0x000000";
    // const txn_data = "0x";
    return (
        <div>

            <Link href={{
                pathname: redirect_url,
                query: {
                    origin_url,
                    target_chain,
                    target_address,
                    txn_data,
                },
            }}>
                <button className="btn btn-primary">
                    {name}
                </button>
            </Link>
        </div>
    );
}

export default TxnButton;