"use client";

import { createConfig } from "@alchemy/aa-alchemy/config";
import { AlchemyAccountProvider } from "@alchemy/aa-alchemy/react";
import { baseSepolia } from "@alchemy/aa-core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, Suspense } from "react";

export const AlchemyProviders = (props: PropsWithChildren) => {
  const queryClient = new QueryClient();
  const config = createConfig({
    rpcUrl: "/api/rpc",
    chain: baseSepolia,
  });

  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>
        <AlchemyAccountProvider config={config} queryClient={queryClient}>
          {props.children}
        </AlchemyAccountProvider>
      </QueryClientProvider>
    </Suspense>
  );
};