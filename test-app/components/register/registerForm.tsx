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

export function RegisterForm(user_id) {
    const generateRandomString = (length) => {
        const randomBytes = new Uint8Array(length);
        crypto.getRandomValues(randomBytes);
        return Array.from(randomBytes, byte => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join('');
    };

    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');

    const handleProjectNameChange = (event) => {
        setProjectName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const register = async () => {
        console.log("Register press");
        if (user_id) {
            //create a project on supabase
            console.log("register", projectName, description, user_id.user_id);
            const client_id = generateRandomString(16);
            const client_secret = generateRandomString(32);
            const { data, error } = await supabase
                .from('project')
                .insert(
                    { name: projectName, descriptions: description, user_id: user_id.user_id, client_id: client_id, client_secret: client_secret }
                );
            if (error) {
                console.error('Error inserting data:', error);
                alert('Failed to create project');
            } else {
                console.log('Project created successfully:', data);
            }
        }
    };
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">Welcome to Vanderline, a project designed to simplify your workflow with web3 wallets. Register now and embark on a streamlined journey, enhancing your digital experience with secure and efficient tools tailored for your needs. Join us at Vanderline, where managing your web3 wallet becomes simpler and more intuitive.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Project Name</span>
                            </label>
                            <input type="name" placeholder="Tell us your project name" className="input input-bordered" required onChange={handleProjectNameChange} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Descriptions</span>
                            </label>
                            <input type="descriptions" placeholder="Let's describe your project" className="textarea textarea-bordered h-24 input " required onChange={handleDescriptionChange} />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Banana?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" onClick={register} >Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
