"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/registry/new-york/ui/card';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../providers/authProvider';
import { IconSpinner } from '@/registry/new-york/ui/icons';
import { LoginButtonGoogle } from '../auth/loginWithGoogle';



const CaliComponent = ({ client_id, origin_url, nonce, message }) => {
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


    // Extract message and nonce from search params


    // Function to handle signing the message

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

        <div className="flex flex-col items-center justify-center mt-24" style={{ height: 'calc(100vh - 120px)' }}>
            {project && public_user ? (
                <div className="flex flex-row gap-x-6">
                    <div className="card w-96 bg-primary text-primary-content">
                        <div className="card-body">
                            <h2 className="card-title">Authenticate {project.name}</h2>
                            <p>{project.description}</p>
                        </div>
                    </div>

                    <div className="card w-96 bg-primary text-primary-content">
                        <div className="card-body">
                            <h2 className="card-title">User info</h2>
                            <p>Display name: {public_user.display_name}</p>
                            <p>Email: {public_user.email}</p>
                            <p>Address: {public_user.wallet_address?.address}</p>
                            <p>Worldcoin Verified: {public_user.worldcoin}</p>

                            <div className="card-actions justify-end">
                                {token ? (
                                    <Link href={{
                                        pathname: origin_url,
                                        query: {
                                            jwt_token: token,
                                        },
                                    }}>
                                        <button className="btn btn-success">Authenticate client</button>
                                    </Link>
                                ) : (
                                    <button className="btn" onClick={() => generateJwt()}>Generate token</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                public_user ? (
                    <IconSpinner /> // Render spinning icon if only user exists
                ) : (
                    <LoginButtonGoogle /> // Render text saying Login if only project exists
                )
            )}
        </div>

    );
};

export default CaliComponent;
