import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const supabase = createClient();

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after sign up process completes
  // fetch public users
  const { data: user } = await supabase.auth.getUser();
  const { data: public_user } = await supabase.from('public_users').select('first_time_login').eq('id', user?.user?.id).single()
  
  // if (public_user?.first_time_login) {
  //   return NextResponse.redirect(`${origin}/profile`);
  // }
  return NextResponse.redirect(`${origin}`);
}
