import TexasComponent from "@/components/magicFunctions/texas-button"

const Texas = (context) => {
    console.log("params", context.searchParams)
    // params need to be message to sign and nonce
    // get message and nonce from params
    let origin_url = context.searchParams["origin_url"]
    let target_chain = context.searchParams["target_chain"]
    let target_address = context.searchParams["target_address"]
    let txn_data = context.searchParams["txn_data"]
    return (
        <div className="flex-flex-col w-screen">
            
            <div className="">
                <TexasComponent target_chain={target_chain} target_address={target_address} txn_data={txn_data} origin_url={origin_url} />
            </div>
        </div>
    )
    
}

export default Texas;


