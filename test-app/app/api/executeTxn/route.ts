import { LocalAccountSigner, arbitrumSepolia, baseSepolia } from "@alchemy/aa-core";
import Example from "@/artifacts/Example.json";
import BaseSepoliaEntry from "@/artifacts/BaseSepoliaEntry.json";
import dotenv from "dotenv";
import { createModularAccountAlchemyClient } from "@alchemy/aa-alchemy";
import { Hex, encodeFunctionData } from "viem";
import { NextResponse } from "next/server";




export async function POST(req: Request) {
  dotenv.config();

  const body = await req.json();

  console.log("body88", body)



  const { abi } = BaseSepoliaEntry["contracts"]["contracts/BaseSepoliaEntry.sol:BaseSepoliaEntry"];

  const privateKey = require("crypto").randomBytes(32).toString("hex");
  // signer (userop) -> bundler eoa (transaction [userop,userop]) -> EP -> sca -> contract
  const signer = LocalAccountSigner.privateKeyToAccountSigner(`0x${privateKey}`);

  const contractAddr: Hex = body.target_address;

 
    // modular account client
    const client = await createModularAccountAlchemyClient({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!,
      chain: baseSepolia,
      signer,
      gasManagerConfig: {
        policyId: process.env.NEXT_PUBLIC_ALCHEMY_GAS_MANAGER_POLICY_ID!,
      },
    });


    // batch txns
    // const uos = [1, 2, 3, 4, 5, 6, 7].map((x) => {
    //   return {
    //     target: contractAddr,
    //     data: encodeFunctionData({
    //       abi,
    //       functionName: "changeX",
    //       args: [x],
    //     }),
    //   };
    // });

    const uos = {
      target: contractAddr,
      data: body.txn_data
    };
    

    // @ts-ignore
    const result = await client.sendUserOperation({
      uo: uos,
    });
    const txHash = await client.waitForUserOperationTransaction(result);
    console.log(txHash);

    // const x = await client.readContract({
    //   abi,
    //   address: contractAddr,
    //   functionName: "x",
    // });

    // console.log(x);
  

  return NextResponse.json(txHash);

}