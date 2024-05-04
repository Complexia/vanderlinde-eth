"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/registry/new-york/ui/card';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../providers/authProvider';
import { IconSpinner } from '@/registry/new-york/ui/icons';
import { LoginButtonGoogle } from '../auth/loginWithGoogle';
import { useSendUserOperation, useSmartAccountClient } from '@alchemy/aa-alchemy/react';
import { Address } from 'viem';
import { baseSepolia } from "viem/chains";




const TexasComponent = ({ target_chain, target_address, txn_data, origin_url }) => {

    const { client } = useSmartAccountClient({
        type: "MultiOwnerModularAccount",
        gasManagerConfig: {
            policyId: process.env.NEXT_PUBLIC_ALCHEMY_GAS_MANAGER_POLICY_ID!,
        },
        opts: {
            txMaxRetries: 20,
        },
    });


    const {
        sendUserOperation,
        sendUserOperationResult,
        isSendingUserOperation,
        error: isSendUserOperationError,
        // @ts-ignore
    } = useSendUserOperation({ client, waitForTxn: true });


    const [address] = useState<Address>(
        target_address,
    );

    const [error, setError] = useState('');

    const execute = async () => {
        console.log("executing")
        // @ts-ignore
        sendUserOperation({
            uo: {
                target: address,
                data: "0x",
            },
        });
    }


    // @ts-ignore
    const { public_user } = useAuth();

    let target_address_sliced = target_address.slice(0, 4) + '..' + target_address.slice(-4);


    return (

        <div className="flex flex-col items-center justify-center " style={{ height: 'calc(100vh - 120px)' }}>
            {public_user && client ? (
                <div className="flex flex-row gap-x-6">
                    <Card className="w-96">
                        <CardHeader>
                            <CardTitle>Transaction details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-y-4">
                                <div className="flex flex-col gap-y-2">
                                    <span>Target Chain: {target_chain}</span>
                                    <span>Target Address: {target_address_sliced}</span>
                                    <span>Transaction Data: {txn_data}</span>
                                </div>
                                <div className="flex flex-row gap-x-4">



                                    <button
                                        className="w-full transform rounded-lg bg-[#363FF9] p-3 font-semibold text-[#FBFDFF] transition duration-500 ease-in-out hover:scale-105 disabled:bg-[#C0D4FF] disabled:hover:scale-100 dark:disabled:bg-[#4252C5]"
                                        onClick={async () =>
                                            // @ts-ignore
                                            sendUserOperation({
                                                uo: {
                                                    target: address,
                                                    data: "0x",
                                                },
                                            })
                                        }
                                        disabled={isSendingUserOperation}
                                    >
                                        <div className="flex flex-row items-center justify-center gap-3">
                                            {isSendingUserOperation && (
                                                // Loading spinner
                                                <div
                                                    className="text-surface inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                                                    role="status"
                                                ></div>
                                            )}
                                            {isSendingUserOperation && !sendUserOperationResult
                                                ? "Sending"
                                                : isSendUserOperationError
                                                    ? "An error occurred. Try again!"
                                                    : "Send a test transaction"}
                                        </div>
                                    </button>
                                    <button className="btn btn-secondary">Cancel</button>

                                </div>
                            </div>
                        </CardContent>
                    </Card>


                    <Card className="w-96">
                        <CardHeader>
                            <CardTitle>Transaction details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {sendUserOperationResult && (
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

                            )}

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
