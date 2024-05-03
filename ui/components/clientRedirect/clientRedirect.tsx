'use client'

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';


import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/registry/new-york/ui/button'
import { IconGoogle, IconSpinner } from '@/registry/new-york/ui/icons'
import { redirect } from 'next/navigation';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function ClientRedirect(user) {
    console.log("this is banana",user);
      // @ts-ignore
  // const { user, public_user } = useAuth();
  // console.log("this is banana ",public_user);
    // const generateRandomString = (length) => {
    //     const randomBytes = new Uint8Array(length);
    //     crypto.getRandomValues(randomBytes);
    //     return Array.from(randomBytes, byte => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join('');
    // };

    // const [projectName, setProjectName] = useState('');
    // const [description, setDescription] = useState('');

    // const handleProjectNameChange = (event) => {
    //     setProjectName(event.target.value);
    // };

    // const handleDescriptionChange = (event) => {
    //     setDescription(event.target.value);
    // };

    // const register = async () => {
    //     console.log("Register press");
    //     if (user_id) {
    //         //create a project on supabase
    //         console.log("register", projectName, description, user_id.user_id);
    //         const client_id = generateRandomString(16);
    //         const client_secret = generateRandomString(32);
    //         const { data, error } = await supabase
    //             .from('project')
    //             .insert(
    //                 { name: projectName, descriptions: description, user_id: user_id.user_id, client_id: client_id, client_secret: client_secret }
    //             );
    //         if (error) {
    //             console.error('Error inserting data:', error);
    //             alert('Failed to create project');
    //         } else {
    //             console.log('Project created successfully:', data);
    //         }
    //     }
    // };
    return (
        <div className="hero min-h-screen bg-base-200">
            hello box
        </div>
    )
}
