"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/registry/new-york/ui/card';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../providers/authProvider';
import { IconSpinner } from '@/registry/new-york/ui/icons';
import { LoginButtonGoogle } from '../auth/loginWithGoogle';
import { Web3 } from "web3";


const CaliComponent = ({ client_id, origin_url, nonce, message }) => {
    const [balance, setBalance] = useState('Loading balance...');
    const web3 = new Web3("https://sepolia.base.org");

    console.log(client_id, origin_url)
    console.log("this is nonce ", nonce);
    const [error, setError] = useState('');
    const [project, setProject] = useState(null);
    const [token, setToken] = useState(null);
    // const vanderline = {
    //     message: message,
    //     nonce: nonce,
    //     client_id: client_id,
    //     origin_url: origin_url
    // };
    // const authDataString = JSON.stringify(vanderline);
    // localStorage.setItem('vanderline', authDataString);

    // @ts-ignore
    const { public_user } = useAuth();
    const address = public_user.wallet_address?.address

    // Extract message and nonce from search params


    // Function to handle signing the message

    useEffect(() => {
        const fetchBalance = async () => {
            if (address) {
                console.log("Fetching balance for address:", address);

                const web3 = new Web3("https://sepolia.base.org"); // Make sure the RPC URL is correct
                try {
                    const balanceInWei = await web3.eth.getBalance(address);
                    const balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');
                    console.log("this is user balance ", balanceInEther);
                    setBalance(`${balanceInEther} ETH`);
                } catch (error) {
                    console.error("Failed to fetch balance:", error);
                    setBalance('Failed to load balance');
                }
            }
        };

        fetchBalance();
    }, [public_user.wallet_address]);

    useEffect(() => {
        const supabase = createClient();

        const fetchFromSupabase = async () => {
            console.log("client_id", client_id)
            try {
                const { data: resp, error } = await supabase
                    .from('project')
                    .select('*').eq('client_id', client_id).single();

                setProject(resp);

                if (error) {
                    // Handle error
                    console.error('Error fetching project:', error.message);
                    return;
                }

            } catch (error) {
                console.error("Error..:", error);
            }
        }

        fetchFromSupabase();
        console.log("public user ,", public_user);
    }, []);

    const generateJwt = async () => {
        const secret = project?.client_secret;
        if (typeof secret !== 'string') {
            console.error('Invalid JWT secret. Secret must be a string.');
            throw new TypeError('Invalid JWT secret. Secret must be a string.');
        }
        let payload = {
            email: public_user?.email,
            display_name: public_user?.display_name,
            address: public_user?.wallet_address,
            worldcoin: public_user?.worldcoin,
        }
        console.log('Auth payload:', payload)
        let stuff = {
            payload,
            secret
        }
        let res = await fetch('/api/sign-jwt', {
            method: 'POST',
            body: JSON.stringify(stuff),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        let body = await res.json()
        setToken(body)
        console.log("body res", body)
        console.log("token ", token)

        const expiresIn = '12h';
    }


    return (

        <div className="flex flex-col items-center justify-center mt-20 ">


            <div className="stats stats-vertical shadow">
                
                <div className="stats shadow">
                    <div className="stat-figure text-secondary">
                        <div className="avatar online">
                            <div className="w-16 rounded-full">
                                <img src={public_user.avatar_from_auth} />
                            </div>
                        </div>
                    </div>
                    <div className="stat-value">Address</div>
                    <div className="stat-title">{public_user.wallet_address?.address}</div>
                    <div className="stat-desc text-secondary">World Coin: {public_user.worldcoin ? 'True' : 'False'}</div>
                </div>
                <div className="stat">
                    <div className="stat-figure text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </div>
                    <div className="stat-title">Balances</div>
                    <div className="stat-value text-primary">{balance}</div>
                    <div className="stat-desc">Base-chain</div>
                </div>
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <div className="stat-title">Emails</div>
                    <div className="stat-value text-secondary">{public_user?.email}</div>
                    <div className="stat-desc">{public_user?.display_name}</div>
                </div>

                {/* <Link href={`${vanderlineData.origin_url}?jwt_token=${token}`}> */}
                {/* <button className="btn btn-outline btn-primary" onClick={generateJwt}>Authenticate Third Party</button> */}
                {/* </Link> */}

            </div>
            <div className="stats bg-primary text-primary-content mt-10">
                <div className="stat">
                    <div className="stat-title">Account balance</div>
                    <div className="stat-value">{balance}</div>
                    <div className="stat-actions">
                        {token ? (
                            <Link href={{
                                pathname: origin_url,
                                query: {
                                    jwt_token: token,
                                },
                            }}>
                                <button className="btn btn-sm btn-success">Authenticate client</button>
                            </Link>
                        ) : (
                            <button className="btn btn-sm btn-success" onClick={() => generateJwt()}>Generate token</button>
                        )
                        }

                        {/* <button className="btn btn-sm btn-success">Authenticate Client</button> */}
                    </div>
                </div>

                <div className="stat">
                    <div className="stat-title">World Coin</div>
                    <div className="stat-value">Verified</div>
                    <div className="stat-actions">
                        <button disabled className="btn btn-sm">Withdrawal</button>
                        <button disabled className="btn btn-sm">Deposit</button>
                    </div>
                </div>
            </div>

        </div>



        // <div className="flex flex-col items-center justify-center mt-24" style={{ height: 'calc(100vh - 120px)' }}>
        //     {project && public_user ? (
        //         <div className="flex flex-row gap-x-6">
        //             <div className="card w-96 bg-primary text-primary-content">
        //                 <div className="card-body">
        //                     <h2 className="card-title">Authenticate {project.name}</h2>
        //                     <p>{project.description}</p>
        //                 </div>
        //             </div>
        //             <div className="card w-96 bg-primary text-primary-content">
        //                 <div className="card-body">
        //                     <h2 className="card-title">User info</h2>
        //                     <p>Display name: {public_user.display_name}</p>
        //                     <p>Email: {public_user.email}</p>
        //                     Authenticate Banan 4      <p>Address: {public_user.wallet_address?.address}</p>
        //                     <p>Worldcoin Verified: {public_user.worldcoin}</p>

        //                     <div className="card-actions justify-end">
        //                         {token ? (
        //                             <Link href={{
        //                                 pathname: origin_url,
        //                                 query: {
        //                                     jwt_token: token,
        //                                 },
        //                             }}>
        //                                 <button className="btn btn-success">Authenticate client</button>
        //                             </Link>
        //                         ) : (
        //                             <button className="btn" onClick={() => generateJwt()}>Generate token</button>
        //                         )}
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     ) : (
        //         public_user ? (
        //             <IconSpinner /> // Render spinning icon if only user exists
        //         ) : (
        //             <LoginButtonGoogle /> // Render text saying Login if only project exists
        //         )
        //     )}
        // </div>




        // <div className="flex flex-col items-center justify-center mt-24" style={{ height: 'calc(100vh - 120px)' }}>
        //     {project && public_user ? (



        //             <div className="flex flex-row gap-x-6">
        //                 <div className="card w-96 bg-primary text-primary-content">
        //                     <div className="card-body">
        //                         <h2 className="card-title">Authenticate {project.name}</h2>
        //                         <p>{project.description}</p>
        //                     </div>
        //                 </div>
        //                 <div className="card w-96 bg-primary text-primary-content">
        //                     <div className="card-body">
        //                         <h2 className="card-title">User info</h2>
        //                         <p>Display name: {public_user.display_name}</p>
        //                         <p>Email: {public_user.email}</p>
        //                         <p>Address: {public_user.wallet_address?.address}</p>
        //                         <p>Worldcoin Verified: {public_user.worldcoin}</p>

        //                         <div className="card-actions justify-end">
        // {token ? (
        //     <Link href={{
        //         pathname: origin_url,
        //         query: {
        //             jwt_token: token,
        //         },
        //     }}>
        //         <button className="btn btn-success">Authenticate client</button>
        //     </Link>
        // ) : (
        //     <button className="btn" onClick={() => generateJwt()}>Generate token</button>
        // )}
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //             ) : (
        //             public_user ? (
        //             <IconSpinner /> // Render spinning icon if only user exists
        //             ) : (
        //             <LoginButtonGoogle /> // Render text saying Login if only project exists
        //             )
        //     )}
        //         </div>

    );
};

export default CaliComponent;
