import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";

import Header from "@/components/Header";
import { Button } from "@/registry/new-york/ui/button";
import Link from "next/link";
import { LoginButtonGoogle } from "@/components/auth/loginWithGoogle";
import Magic from "@/components/magic";


export default async function Index() {
  

  return (
    <div>
      <Magic />
      
    </div>
  );
}
