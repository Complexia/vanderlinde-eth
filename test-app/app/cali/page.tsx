// oauth redirects here

import CaliComponent from "@/components/magicFunctions/cali-button"


const Cali = (context) => {
    console.log("params", context.searchParams)
    let client_id = context.searchParams["client_id"]
    let origin_url = context.searchParams["origin_url"]
    


    return (
        <div className="flex-flex-col w-screen">
            
            <div className="">
                <CaliComponent client_id={client_id} origin_url={origin_url} />
            </div>
        </div>
    )
}

export default Cali;