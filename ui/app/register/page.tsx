import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { RegisterForm } from "@/components/register/registerForm";

export default function Register() {


  return (
    <div className="flex flex-col items-center">
      <RegisterForm user_id="7be3857e-4769-4d6c-8b04-74007a8d3d6f"/>
    </div>
  );
}
