import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const token = requestUrl.searchParams.get("jwt_token");
  const origin = process;
  let public_users = null;
  console.log("this is token ", token);
  // let polarString = localStorage.getItem('polar');
  // const polarPolar = JSON.parse(polarString);
  // set logalstorage
  // ...
  if (token && typeof token === 'string' && token.trim() !== '') {
    console.log("this is here");
    try {
      public_users = jwtDecode(token);
      console.log("Decoded JWT:", public_users);
    } catch (error) {
      console.error("Failed to decode JWT:", error);
    }
  } else {
    console.log("No valid JWT available.");
  }
  // don't needed this 
  // const supabase = createClient();
  // if (token) {
  //   await supabase.auth.exchangeCodeForSession(token);
  // }



  // URL to redirect to after sign up process completes
  // fetch public users
  // const { data: user } = await supabase.auth.getUser();
  // const { data: public_user } = await supabase.from('public_users').select('first_time_login').eq('id', user?.user?.id).single()

  // if (public_user?.first_time_login) {
  //   return NextResponse.redirect(`${origin}/profile`);
  // }
  return NextResponse.redirect(`${origin}/user`);
}
