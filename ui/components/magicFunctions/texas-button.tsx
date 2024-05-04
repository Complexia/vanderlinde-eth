"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/registry/new-york/ui/card';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../providers/authProvider';
import { IconSpinner } from '@/registry/new-york/ui/icons';
import { LoginButtonGoogle } from '../auth/loginWithGoogle';
import { useSendUserOperation, useSmartAccountClient } from '@alchemy/aa-alchemy/react';
import { Address, encodeFunctionData } from 'viem';
import { baseSepolia } from "viem/chains";




const TexasComponent = ({ target_chain, target_address, txn_data, origin_url }) => {
    const [send, setSend] = useState(null);
    const [result, setResult] = useState(null);

    // const { client } = useSmartAccountClient({
    //     type: "MultiOwnerModularAccount",
    //     gasManagerConfig: {
    //         policyId: process.env.NEXT_PUBLIC_ALCHEMY_GAS_MANAGER_POLICY_ID!,
    //     },
    //     opts: {
    //         txMaxRetries: 20,
    //     },
    // });


    // const {
    //     sendUserOperation,
    //     sendUserOperationResult,
    //     isSendingUserOperation,
    //     error: isSendUserOperationError,
    //     // @ts-ignore
    // } = useSendUserOperation({ client, waitForTxn: true });


    const [address] = useState<Address>(
        target_address,
    );

    const [error, setError] = useState('');

    const displayData = txn_data.length > 10 ? `${txn_data.substring(0, 10)}...` : txn_data;


    // @ts-ignore
    const { public_user } = useAuth();

    let target_address_sliced = target_address.slice(0, 4) + '..' + target_address.slice(-4);
    let result_target = null;
    const executeTxn = async () => {
        setSend(true);
        console.log("call CCIP");
        const res = await fetch(`/api/executeTxn`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                target_chain: target_chain,
                target_address: target_address,
                txn_data: txn_data,
            }),
        })
        const data = await res.json();
        if (data) {
            setResult(data);
            result_target = data.slice(0, 4) + '..' + target_address.slice(-4);
        }
        setSend(false)
        console.log("this is return from txn", data);
    }

    const deny = () => {
        window.location.href = 'http://www.localhost:3001/user';
    };

    return (

        <div className="flex flex-col items-center justify-center " style={{ height: 'calc(100vh - 120px)' }}>
            {public_user ? (
                <div className="flex flex-row gap-x-6">
                    <Card className="w-96">
                        <CardHeader>
                            <CardTitle>Transaction</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-y-4">
                                <div className="flex flex-col gap-y-4">
                                    <div className="flex flex-col gap-y-2">
                                        {/* <label className="input input-bordered flex items-center gap-2">
                                        <input disabled type="text" className="grow" placeholder="Search" />
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                                    </label> */}
                                        <label className="input input-bordered flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                            <input disabled type="text" className="grow" placeholder="Base Sepolia" />
                                        </label>
                                        <label className="input input-bordered flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                            <input disabled type="text" className="grow" placeholder={`${target_address_sliced}`} />
                                        </label>
                                        <label className="input input-bordered flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                            <input disabled type="text" className="grow" value={`${displayData}`} />
                                        </label>
                                        {/* <span>Target Chain: {target_chain}</span>
                                    <span>Target Chain: Base Sepolia</span>
                                    <span>Target Address: {target_address_sliced}</span>
                                    <span>Transaction Data: {displayData}</span> */}
                                    </div>
                                </div>
                                <div className="flex flex-row gap-x-4">
                                    {send && !result &&
                                        <button disabled
                                            className="w-full transform rounded-lg bg-[#363FF9] p-3 font-semibold text-[#FBFDFF] transition duration-500 ease-in-out hover:scale-105 disabled:bg-[#C0D4FF] disabled:hover:scale-100 dark:disabled:bg-[#4252C5]"
                                            onClick={() => executeTxn()}
                                        >
                                            Send Transaction
                                        </button>
                                    }
                                    {!send && !result &&
                                        <button
                                            className="w-full transform rounded-lg bg-[#363FF9] p-3 font-semibold text-[#FBFDFF] transition duration-500 ease-in-out hover:scale-105 disabled:bg-[#C0D4FF] disabled:hover:scale-100 dark:disabled:bg-[#4252C5]"
                                            onClick={() => executeTxn()}
                                        >
                                            Send Transaction
                                        </button>
                                    }
                                    {!send && result &&
                                        <button
                                            className="w-full transform rounded-lg bg-[#363FF9] p-3 font-semibold text-[#FBFDFF] transition duration-500 ease-in-out hover:scale-105 disabled:bg-[#C0D4FF] disabled:hover:scale-100 dark:disabled:bg-[#4252C5]"
                                            onClick={() => executeTxn()}
                                        >
                                            Send Another Transaction
                                        </button>
                                    }
                                    {send && result &&
                                        <button disabled
                                            className="w-full transform rounded-lg bg-[#363FF9] p-3 font-semibold text-[#FBFDFF] transition duration-500 ease-in-out hover:scale-105 disabled:bg-[#C0D4FF] disabled:hover:scale-100 dark:disabled:bg-[#4252C5]"
                                            onClick={() => executeTxn()}
                                        >
                                            Send Another Transaction
                                        </button>
                                    }
                                    <button className="btn btn-secondary" onClick={deny}>Cancel</button>

                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="w-96">
                        <CardHeader>
                            {!send && result &&
                                <CardTitle>Result</CardTitle>
                            }
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-row items-center justify-center gap-3">
                                {!send && !result &&
                                    <div className="card w-96 bg-base-100 shadow-xl image-full">
                                        <figure><img src="https://www.patriotsoftware.com/wp-content/uploads/2022/01/what-is-blockchain-1.jpg" alt="Shoes" /></figure>
                                        <div className="card-body">
                                            <h2 className="card-title">Cross-chain?</h2>
                                            <p>Vanderlinde make it easier than ever!</p>
                                        </div>
                                    </div>
                                }

                                {send && !result &&
                                    <div className="flex flex-col gap-4 w-52">
                                        <div className="skeleton h-32 w-full"></div>
                                        <div className="skeleton h-4 w-28"></div>
                                        <div className="skeleton h-4 w-full"></div>
                                        <div className="skeleton h-4 w-full"></div>
                                    </div>
                                }
                                {!send && result &&
                                    <div className="flex flex-col gap-y-2">
                                        <label className="input input-bordered flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                            <input disabled type="text" className="grow" placeholder="Base Sepolia" />
                                        </label>
                                        <label className="input input-bordered flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                            <input disabled type="text" className="grow" placeholder={`${result_target}`} />
                                        </label>
                                        <label className="input input-bordered flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                            <input disabled type="text" className="grow" value={`${displayData}`} />
                                        </label>
                                    </div>
                                }
                                {/* <button onClick={handleSend}>Send Data</button> */}
                            </div>
                            {/* {sendUserOperationResult && (
                                <div className="flex flex-col gap-y-4">
                                    <p>Txn status: done</p>
                                    <a
                                        href={`${baseSepolia.blockExplorers.default.url}/tx/${sendUserOperationResult.hash}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full transform rounded-lg bg-[#363FF9] p-3 text-center font-semibold text-[#FBFDFF] transition duration-500 ease-in-out hover:scale-105 dark:disabled:bg-[#4252C5]"
                                    >
                                        View transaction details
                                    </a>

                                </div>

                            )} */}

                        </CardContent>
                    </Card>

                </div>
            ) : (
                <LoginButtonGoogle />
            )}
        </div>

    );
};

export default TexasComponent;
