import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { WorldCoinLogin } from "@/components/worldCoin/worldCoinLogin";

export default function Register() {


  return (
    <div className="flex flex-col items-center">
      <WorldCoinLogin/>
    </div>
  );
}
