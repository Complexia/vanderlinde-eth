"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/registry/new-york/ui/card';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi'
import { Web3 } from "web3";
import { set } from 'react-hook-form';

export const CrossChain = ({ redirect_url, contract_abi, contract_method, destination, message, selector }) => {

    const [res, setRes] = useState(null);

    // set a provider in the sepolia testnet using node rpc url
    const web3 = new Web3("https://sepolia.base.org");

    // interacting with the CCIP sender from bases sepolia
    const address = "0x663c64c9d11cca6b518882767a67f6c10d54b476";
    const abi = JSON.parse(contract_abi);
    //test
    console.log("this is a test ", abi);
    //end.
    // create a new contract object, providing the ABI and address
    const contracts = new web3.eth.Contract(abi, address);

    // using contract.methods to get value
    const activateCrossChainCall = async () => {
        console.log("Cross-chain clicked");
        // try {
        //     const response = await contracts.methods[contract_method](selector, destination, message).call();
        //     console.log("response", response)
        //     setRes(response);
        // } catch (error) {
        //     console.error("Error occurred while getting response from contract:", error);
        //     throw error; // Rethrow the error for handling elsewhere if needed
        // }
        let data = contracts.provider;
        console.log("thissi teset", data);

        const result: any = await contracts.methods
        [contract_method](selector, destination, message)
            .call()

        // const numberResult = parseInt(result, 16);
        // console.log("Number result:", result);
        console.log("result", result)
        setRes(result);

    };

    // Extract message and nonce from search params

    return (
        <div className="">
            Hello Alina
            <button onClick={activateCrossChainCall}>Activate Cross-Chain Call</button>
        </div>
    );
};

