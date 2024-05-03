import { useAuth } from "@/components/providers/authProvider";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const node_crypto = require('crypto');
  const jwt = require('jsonwebtoken');
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const client_id = requestUrl.searchParams.get("client_id");
  const origin = requestUrl.origin;
  let info = {
    "project": {},
    "public_users": {}
  };
  let token = "";
  console.log("this is client_id ", client_id);
  if (client_id) {
    const supabase = createClient();
    const { data: project, error } = await supabase.from('project').select('*').eq('client_id', client_id).limit(1);
   
    if (error) {
      console.error('Error inserting data:', error);
      alert('Failed to create project');
    } else {
      console.log("this is project",project);
      info.project = project;
      let payload = JSON.stringify(info);
      token = jwt.sign(payload, project[0].client_secret);
      console.log('This is JWT:', token);
    }
    // await supabase.auth.exchangeCodeForSession(code);
    // console.log("this is auth from Google ",code);
  }

  // URL to redirect to after sign up process completes
  // return NextResponse.redirect(`${origin}/client-redirect?jwt_token=${token}`);
}
