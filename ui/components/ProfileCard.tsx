"use client";

import { useSmartAccountClient, useUser } from "@alchemy/aa-alchemy/react";
import OnrampExample from "./unlimit/onramp";
import { useAuth } from "./providers/authProvider";
import { Web3 } from "web3";
import { useEffect, useState } from "react";
import Link from "next/link";
import router, { useRouter } from 'next/router';
import { redirect } from "next/navigation";
// import { SendUOButton } from "./SendUOButton";

export const ProfileCard = () => {

  const [balance, setBalance] = useState('Loading balance...');

  // @ts-ignore
  const { user, public_user } = useAuth();
  const web3 = new Web3("https://sepolia.base.org");

  const address = public_user.wallet_address?.address
  console.log(address)

  console.log("this is user ,", public_user);

  const [token, setToken] = useState(null);
  // console.log("this is user ",user);

  // get vanderline from localStorage
  let vanderlineString = localStorage.getItem('vanderline');
  const vanderlineData = JSON.parse(vanderlineString);
  const client_url = `${vanderlineData.origin_url}/=?jwt_token=${token}`;
  console.log("this is vanderline ", vanderlineData);

  const generateJwt = async () => {
    const secret = vanderlineData.nonce;
    if (typeof secret !== 'string') {
      console.error('Invalid JWT secret. Secret must be a string.');
      throw new TypeError('Invalid JWT secret. Secret must be a string.');
    }
    let payload = {
      avatar_from_auth: public_user?.avatar_from_auth,
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
    const expiresIn = '12h';
    // router.push(`${vanderlineData.origin_url}?jwt_token=${token}`);
    const url = `${vanderlineData.origin_url}?jwt_token=${body}`;
    // redirect(url);
    window.open(url, '_blank');
    window.close();
  }

  // generate jwt_token
  // give client an option of redirect back into their application ?

  // retrieve user balance
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

  return (
    // <div className="flex flex-row rounded-lg ">
    //   <div className="flex flex-col gap-8">

    //     <div className="flex flex-col gap-4">
    //       <div className="text-lg font-semibold">Your smart account is ready</div>
    //       <div className="flex flex-col gap-2">
    //         <div>Account address</div>
    //         <div className="text-wrap rounded-lg p-3 ">
    //           {address}
    //         </div>
    //       </div>
    //       <div className="flex flex-col gap-2">
    //         <div>Balances</div>
    //         <div className="text-wrap rounded-lg p-3 ">
    //           {balance}
    //         </div>
    //       </div>
    //       <div className="flex flex-col gap-2">
    //         <div>Email</div>
    //         <div className="text-wrap rounded-lg p-3 ">
    //           {public_user?.email}
    //         </div>
    //       </div>
    //     </div>
    //     <OnrampExample />
    //     {/* <SendUOButton /> */}
    //   </div>
    // </div>

    <div className="stats stats-vertical shadow">

      <div className="stat">
        <div className="stat-figure text-secondary">
          <div className="avatar online">
            <div className="w-16 rounded-full">
              <img src={public_user.avatar_from_auth} />
            </div>
          </div>
        </div>
        <div className="stat-value">Address</div>
        <div className="stat-title">{address}</div>
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
      <button className="btn btn-outline btn-primary" onClick={generateJwt}>Authenticate Third Party</button>
      {/* </Link> */}

    </div>

  );
};
