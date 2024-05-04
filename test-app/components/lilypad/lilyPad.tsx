"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/registry/new-york/ui/card';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi'
import { Web3 } from "web3";
import { set } from 'react-hook-form';

export const LilyPad = (file_path) => {
console.log("this is it",file_path);

    return (
        <div className="flex justify-center items-center h-screen">
            {file_path ? (
                // Display the image if file_path is not empty
                <img src="/private/tmp/lilypad/data/downloaded-files/QmfPmhZy9bZh1nQWKQiCbt8UUC2oUwShfFYGE6tMmDHzrj/outputs/output_00001_.png" alt="Loaded Content" className="max-w-full h-auto" />
            ) : (
                // Display a loading spinner if file_path is empty
                <span className="loading loading-infinity loading-lg"></span>
            )}
        </div>
    );
};

