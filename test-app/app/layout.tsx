import { GeistSans } from "geist/font/sans";
import "./globals.css";

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AuthProvider from "@/components/providers/authProvider";
import { AlchemyProviders } from "@/components/providers/alchemyProvider";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";


const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "vanderlinde ",
  description: "web3 made easy",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const supabase = createServerComponentClient({ cookies });

  const { data: { session } } = await supabase.auth.getSession();
  const accessToken = session?.access_token || null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase.from('public_users').select('*').eq('id', user?.id).single()

  // const ReactUIWalletModalProviderDynamic = dynamic(
  //   async () =>
  //     (await import("@solana/wallet-adapter-react-ui")).WalletModalProvider,
  //   { ssr: false }
  // );

  return (
    <html lang="en" data-theme={data ? data.theme : "synthwave"} className={GeistSans.className}>
      <body className="">


        {/* <AuthProvider accessToken={accessToken} user={user} public_user={data}> */}
          <AlchemyProviders>
            {/* <div className="navbar bg-neutral text-neutral-content">
              <Navbar user={user} />
            </div> */}

            <main className=" flex flex-col items-center justify-center">
              {children}
            </main>
          </AlchemyProviders>

        {/* </AuthProvider> */}




      </body>
    </html>
  );
}
