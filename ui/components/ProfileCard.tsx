"use client";

import { useSmartAccountClient, useUser } from "@alchemy/aa-alchemy/react";
import OnrampExample from "./unlimit/onramp";
// import { SendUOButton } from "./SendUOButton";

export const ProfileCard = () => {
  const user = useUser();
  const { client } = useSmartAccountClient({
    type: "MultiOwnerModularAccount",
  });

  return (
    <div className="flex flex-row rounded-lg ">
      <div className="flex flex-col gap-8">
        
        <div className="flex flex-col gap-4">
        <div className="text-lg font-semibold">Your smart account is ready</div>
          <div className="flex flex-col gap-2">
            <div>Account address</div>
            <div className="text-wrap rounded-lg p-3 ">
              {client?.account.address}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>Email</div>
            <div className="text-wrap rounded-lg p-3 ">
              {user?.email}
            </div>
          </div>
        </div>
        <OnrampExample />
        {/* <SendUOButton /> */}
      </div>
    </div>
  );
};
