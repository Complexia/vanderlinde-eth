import DeployButton from "@/components/DeployButton";
import { encodeFunctionData } from "viem";
import { createClient } from "@/utils/supabase/server";
// import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
// import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
// import AuthButton from "@/components/client/auth-button";
// import Link from "next/link";
// import TxnButton2 from "@/components/TxnButton2";
// import ClientNav from "@/components/client/client-nav";
import SucessModal from "@/components/client/sucess-modal";
import ClientNavAuth from "@/components/client/client-nav-auth";
import { jwtDecode } from "jwt-decode";
import TxnButton from "../../../ui/components/exportedButtons/txnButton";

export default async function Index(context) {
    let response = context.searchParams["response"];
    let openModal = false;
    // let user = context.searchParams["user"];

    let jwt = context.searchParams["jwt"];
    let decoded = null;
    if (jwt && typeof jwt === 'string' && jwt.trim() !== '') {
        try {
            decoded = jwtDecode(jwt);
            console.log("Decoded JWT:", decoded);
        } catch (error) {
            console.error("Failed to decode JWT:", error);
        }
    } else {
        console.log("No valid JWT available.");
    }
    // let token = JSON.stringify(jwt) ? JSON.stringify(jwt)  : null;
    // console.log("debug 4",token);
    // let decoded: any = jwtDecode(jwt) ? jwtDecode(jwt) : null;
    // console.log("debug 5 :", decoded);


    // const client_redirect_url = "http://localhost:3000/test/application";
    const canInitSupabaseClient = () => {
        // This function is just for the interactive tutorial.
        // Feel free to remove it once you have Supabase connected.
        try {
            createClient();
            return true;
        } catch (e) {
            return false;
        }
    };

    // call user context which should be filled in auth-redirect
    // const user = useUserContext();

    // if user is not null, then render the web3js page to click a buttoon to gen a random number
    // make a new button somewhere takes a param which is the name
    // name can be generate random number
    // this button redirects you to polar with params that iclude contract name and address,
    // contract abi
    // contract method to call
    // once on polar, you can call the contract method using web3js
    // return result back to client

    // let redirec_url = "http://localhost:3000/auth/magic/auth-txn";
    // let name = Math.random().toString(36).substring(2, 15);

    // let address = "0xA36432F7B12f160F685717c4Ab12EB883a682810";
    // const contract_abi = [
    //     {
    //         outputs: [
    //             {
    //                 internalType: "uint256",
    //                 name: "randomNo",
    //                 type: "uint256",
    //             },
    //         ],
    //         name: "generateRandomNumber",
    //         stateMutability: "nonpayable",
    //         type: "function",
    //     },
    // ] as const;

    // const contract_method = "generateRandomNumber";

    //
    const target_chain = "baseSepolia";
    const user_address = "";
    const contract_method = "";
    const address = "0x663c64c9d11cca6b518882767a67f6c10d54b476";
    const selector = 16015286601757825753
    const abi = [
        {
            "inputs": [],
            "name": "acceptOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_router",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_link",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "currentBalance",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "calculatedFees",
                    "type": "uint256"
                }
            ],
            "name": "NotEnoughBalance",
            "type": "error"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "messageId",
                    "type": "bytes32"
                },
                {
                    "indexed": true,
                    "internalType": "uint64",
                    "name": "destinationChainSelector",
                    "type": "uint64"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "text",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "feeToken",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "fees",
                    "type": "uint256"
                }
            ],
            "name": "MessageSent",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferRequested",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint64",
                    "name": "destinationChainSelector",
                    "type": "uint64"
                },
                {
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "text",
                    "type": "string"
                }
            ],
            "name": "sendMessage",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "messageId",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
    ] as const;


    const chain = "baseSepolia";

    const cd = encodeFunctionData({
        abi,
        functionName: "sendMessage",
        args: [16015286601757825753n, "0x269a639D9A8c6c300250BcC4D561EA9d245A5690", "hello bob"]
    });
    //


    const isSupabaseConnected = canInitSupabaseClient();

    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            {/* <div className="navbar bg-neutral text-neutral-content">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Web3Shopify</a>
                </div> */}
            {/* 
                {user ? (
                    <ClientNav />
                ) :
                    (<div className="flex-none">
                        <div className="dropdown dropdown-end">
                            <AuthButton />
                        </div>
                    </div>)
                } */}

            {/* <ClientNavAuth decode={decoded} />

            </div> */}
            {/* <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                    <DeployButton />
                    <AuthButton />
                </div>
            </nav> */}

            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-7xl px-3 pt-20">
                <main className="flex-1 flex flex-col gap-6">
                    <h1 className="mb-5 text-5xl font-bold">Shop With Us</h1>
                    <div className="divider"></div>

                    {response && (
                        <SucessModal response={response} />
                    )}

                    <div className="carousel rounded-box">
                        <div className="carousel-item">
                            <div className="card w-96 bg-base-100 shadow-xl">
                                <figure><img src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg" alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">Grape!</h2>
                                    <div className="badge badge-secondary">0.114 ETH</div>
                                    <p>If a dog chews shoes whose shoes does he choose?</p>
                                    <div className="card-actions justify-end">
                                        <TxnButton name={contract_method} target_address={user_address} target_chain={target_chain} txn_data={JSON.stringify({ product_price: 0.114, name: "Grape" })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="card w-96 bg-base-100 shadow-xl">
                                <figure><img src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg" alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">Lemon!</h2>
                                    <div className="badge badge-secondary">0.33 ETH</div>
                                    <p>If a dog chews shoes whose shoes does he choose?</p>
                                    <div className="card-actions justify-end">
                                        <TxnButton name={contract_method} target_address={user_address} target_chain={target_chain} txn_data={JSON.stringify({ product_price: 0.33, name: "Lemon" })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="card w-96 bg-base-100 shadow-xl">
                                <figure><img src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg" alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">Lomen!</h2>
                                    <div className="badge badge-secondary">0.17 ETH</div>
                                    <p>If a dog chews shoes whose shoes does he choose?</p>
                                    <div className="card-actions justify-end">
                                        <TxnButton name={contract_method} target_address={user_address} target_chain={target_chain} txn_data={JSON.stringify({ product_price: 0.17, name: "Lomen" })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="card w-96 bg-base-100 shadow-xl">
                                <figure><img src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg" alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">Pineapple!</h2>
                                    <div className="badge badge-secondary">0.24 ETH</div>
                                    <p>If a dog chews shoes whose shoes does he choose?</p>
                                    <div className="card-actions justify-end">
                                        <TxnButton name={contract_method} target_address={user_address} target_chain={target_chain} txn_data={JSON.stringify({ product_price: 0.24, name: "Pineapple" })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="card w-96 bg-base-100 shadow-xl">
                                <figure><img src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg" alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">Cherry!</h2>
                                    <div className="badge badge-secondary">0.47 ETH</div>
                                    <p>If a dog chews shoes whose shoes does he choose?</p>
                                    <div className="card-actions justify-end">
                                        <TxnButton name={contract_method} target_address={user_address} target_chain={target_chain} txn_data={JSON.stringify({ product_price: 0.47, name: "Cherry" })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="card w-96 bg-base-100 shadow-xl">
                                <figure><img src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">Strawberry!</h2>
                                    <div className="badge badge-secondary">0.27 ETH</div>
                                    <p>If a dog chews shoes whose shoes does he choose?</p>
                                    <div className="card-actions justify-end">
                                        <TxnButton name={contract_method} target_address={user_address} target_chain={target_chain} txn_data={JSON.stringify({ product_price: 0.27, name: "Strawberry" })} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* <div className="flex flex-row space-x-4">
                        <div>
                            <TxnButton />
                        </div>
                        <div className="mt-2">
                            {response ? (
                                <div>{response}</div>
                            ) : (
                                <div>Waiting for bananas</div>
                            )}
                        </div>
                    </div> */}

                </main>
            </div>

            <footer className="footer p-10 bg-neutral text-neutral-content">
                <aside>
                    <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg>
                    <p>Web3 Shopify Pty Ltd.<br />BlockChain Shop since 2021</p>
                </aside>
                <nav>
                    <h6 className="footer-title">Social</h6>
                    <div className="grid grid-flow-col gap-4">
                        <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
                        <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
                        <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
                    </div>
                </nav>
            </footer>

        </div>
    );
}
