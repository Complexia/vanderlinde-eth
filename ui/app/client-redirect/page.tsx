import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { RegisterForm } from "@/components/register/registerForm";
import { jwtDecode } from "jwt-decode";
import { ClientRedirect } from "@/components/clientRedirect/clientRedirect";

export default function Register(request: Request) {
  // @ts-ignore
  const token = request.searchParams.jwt_token;
  let decoded = null;
  console.log("this is a token", token);

  if (token && typeof token === 'string' && token.trim() !== '') {
    try {
      decoded = jwtDecode(token);
      console.log("Decoded JWT:", decoded);
    } catch (error) {
      console.error("Failed to decode JWT:", error);
    }
  } else {
    console.log("No valid JWT available.");
  }

  return (
    <div className="flex flex-col items-center">
      <ClientRedirect project={decoded} />
    </div>
  );
}
