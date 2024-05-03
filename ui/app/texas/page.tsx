const Texas = (context) => {
    console.log("params", context.searchParams)
    // params need to be message to sign and nonce
    // get message and nonce from params
    let origin_url = context.searchParams["origin_url"]
    let target_chain = context.searchParams["target_chain"]
    let target_address = context.searchParams["target_address"]
    let txn_data = context.searchParams["txn_data"]
    return (
        <div>bob</div>
    )
}