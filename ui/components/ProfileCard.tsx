"use client";

import { useSmartAccountClient, useUser } from "@alchemy/aa-alchemy/react";
import OnrampExample from "./unlimit/onramp";
import { useAuth } from "./providers/authProvider";
import { Web3 } from "web3";
import { useEffect, useState } from "react";
// import { SendUOButton } from "./SendUOButton";

export const ProfileCard = () => {

  const [balance, setBalance] = useState('Loading balance...');

  // @ts-ignore
  const { user, public_user } = useAuth();
  const web3 = new Web3("https://sepolia.base.org");

  const address = public_user.wallet_address?.address
  console.log(address)

  // retrieve user balance
  useEffect(() => {
    const fetchBalance = async () => {
      if (address) {
        console.log("Fetching balance for address:", address);

        const web3 = new Web3("https://sepolia.base.org"); // Make sure the RPC URL is correct
        try {
          const balanceInWei = await web3.eth.getBalance(address);
          const balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');
          console.log("this is user balance ",balanceInEther);
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
    <div className="flex flex-row rounded-lg ">
      <div className="flex flex-col gap-8">

        <div className="flex flex-col gap-4">
          <div className="text-lg font-semibold">Your smart account is ready</div>
          <div className="flex flex-col gap-2">
            <div>Account address</div>
            <div className="text-wrap rounded-lg p-3 ">
              {address}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>Balances</div>
            <div className="text-wrap rounded-lg p-3 ">
              {balance}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>Email</div>
            <div className="text-wrap rounded-lg p-3 ">
              {public_user?.email}
            </div>
          </div>
        </div>
        <OnrampExample />
        {/* <SendUOButton /> */}
      </div>
    </div>
  );
};
