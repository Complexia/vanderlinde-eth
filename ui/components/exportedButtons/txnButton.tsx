"use client"

import Link from "next/link";
import { encodeFunctionData } from "viem";



// this button takes params and redirects to vanerlinde to make a txn
const TxnButton = ({ name, target_chain, target_address, txn_data }: {
    name: string;
    target_chain: string;
    target_address: string;
    txn_data: string;
}) => {
    const vanderlinde_url = process.env.NEXT_PUBLIC_VANDERLINDE_URL;
    const origin_url = "http://localhost:3001/user" 
    const abi = [
        {
            "inputs": [],
            "name": "acceptOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_router",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_link",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "currentBalance",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "calculatedFees",
                    "type": "uint256"
                }
            ],
            "name": "NotEnoughBalance",
            "type": "error"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "messageId",
                    "type": "bytes32"
                },
                {
                    "indexed": true,
                    "internalType": "uint64",
                    "name": "destinationChainSelector",
                    "type": "uint64"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "text",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "feeToken",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "fees",
                    "type": "uint256"
                }
            ],
            "name": "MessageSent",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferRequested",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint64",
                    "name": "destinationChainSelector",
                    "type": "uint64"
                },
                {
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "text",
                    "type": "string"
                }
            ],
            "name": "sendMessage",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "messageId",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
    ] as const;


    // const target_chain = "ethereum";
    // const target_address = "0x000000";
    // const txn_data = "0x";
    const redirect = () => {
        console.log("this is data", target_chain);
        if (txn_data.length > 0) {
            const txn = encodeFunctionData({
                abi,
                functionName: "sendMessage",
                args: [16015286601757825753n, "0x269a639D9A8c6c300250BcC4D561EA9d245A5690", txn_data]
            });
            const target_address = "0x269a639D9A8c6c300250BcC4D561EA9d245A5690";
            const redirect_url = `http://localhost:3000/texas?origin_url=${origin_url}&txn_data=${txn}&target_chain=${target_chain}&target_address=${target_address}`;
            window.open(redirect_url, "_blank");
        }
    };
    return (
        <div>
            {/* <Link href={{
                pathname: redirect_url,
                query: {
                    origin_url,
                    target_chain,
                    target_address,
                    txn_data,
                },
            }}> */}
            <button className="btn btn-primary" onClick={redirect}>
                {/* {name} */}
                Purchase
            </button>
            {/* </Link> */}
        </div>
    );
}

export default TxnButton;