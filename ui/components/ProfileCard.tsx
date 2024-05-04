"use client";

import { useSmartAccountClient, useUser } from "@alchemy/aa-alchemy/react";
import OnrampExample from "./unlimit/onramp";
import { useAuth } from "./providers/authProvider";
// import { SendUOButton } from "./SendUOButton";

export const ProfileCard = () => {
  
  // @ts-ignore
  const { user, public_user } = useAuth();
  
  const address = public_user.wallet_address?.address
  console.log(public_user.wallet_address)
  

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
