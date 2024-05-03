'use client'

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';


import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/registry/new-york/ui/button'
import { IconGoogle, IconSpinner } from '@/registry/new-york/ui/icons'
import { redirect } from 'next/navigation';
import { useAuth } from '../providers/authProvider';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function ClientRedirect(project) {
    console.log("this is banana", project);

    const { accessToken, user, public_user } = useAuth();
    console.log("this is banana ", public_user);

    const generateRandomString = (length) => {
        const randomBytes = new Uint8Array(length);
        crypto.getRandomValues(randomBytes);
        return Array.from(randomBytes, byte => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join('');
    };

    const get_user = () => {
        // get user from supabase
    };

    const generate_jwt_token = () => {
        // decoded user_info into jwt
    };

    return (
        <div className="">
            hello box 2
        </div>
    )
}
