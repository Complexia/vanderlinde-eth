// oauth redirects here
import { CrossChain } from "@/components/cross-chain/crossChain"

const CrossChainPage = (context) => {
    let selector = null;
    let chain_selector = [
        {
            "name": "bnb",
            "chain_selector": 13264668187771770619
        },
        {
            "name": "sepolia",
            "chain_selector": 16015286601757825753
        },
        {
            "name": "fuji",
            "chain_selector": 14767482510784806043
        },
        {
            "name": "arbitrum",
            "chain_selector": 3478487238524512106
        },
        {
            "name": "optimism",
            "chain_selector": 5224473277236331295
        }
    ];
    console.log("params", context.searchParams)
    let destination = context.searchParams["destination"]
    let message = context.searchParams["message"]
    let chain = context.searchParams["chain"]
    let contract_method = "sendMessage";
    let redirect_url = context.searchParams["redirect_url"]

    // Find the corresponding chain selector
    for (let i = 0; i < chain_selector.length; i++) {
        if (chain_selector[i].name === chain) {
            selector = chain_selector[i].chain_selector;
            break;
        }
    }

    const contract_abi = [
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
    const abi = JSON.stringify(contract_abi);


    console.log("this is selector", selector);

    return (
        <div className="flex-flex-col w-screen">
            hello bob
            <CrossChain redirect_url={redirect_url} contract_abi={abi} contract_method={contract_method} destination={destination} message={message} selector={selector} />
        </div>
    )
}

export default CrossChainPage;