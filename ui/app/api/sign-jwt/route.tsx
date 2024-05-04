import { NextResponse } from "next/server";
const jwt = require('jsonwebtoken');

export async function POST(req: Request) {
  

  

  const body = await req.json();

  const token = jwt.sign(body.payload, body.secret);
  

  return NextResponse.json(token);
}
