"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/registry/new-york/ui/card';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../providers/authProvider';
import { IconSpinner } from '@/registry/new-york/ui/icons';
import { LoginButtonGoogle } from '../auth/loginWithGoogle';




const TexasComponent = ({ target_chain, target_address, txn_data, origin_url }) => {
    

    const [error, setError] = useState('');
   

    // @ts-ignore
    const { public_user } = useAuth();

  
    return (

        <div className="flex flex-col items-center justify-center " style={{ height: 'calc(100vh - 120px)' }}>
            {public_user ? (
                <div className="flex flex-row gap-x-6">
                    <Card className="w-96">
                        <CardHeader>
                            <CardTitle>Transaction details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-y-4">
                                <div className="flex flex-col gap-y-2">
                                    <span>Target Chain: {target_chain}</span>
                                    <span>Target Address: {target_address}</span>
                                    <span>Transaction Data: {txn_data}</span>
                                </div>
                                <div className="flex flex-row gap-x-4">
                                    <button className="btn btn-primary">Sign</button>
                                    <button className="btn btn-secondary">Cancel</button>
                                </div>
                            </div>
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
