'use client'

import React, { useState } from 'react';
import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit'

export function WorldCoinLogin() {
    const onSuccess = () => {
        console.log("success");
    };
    const handleVerify = (event) => {
        //this is proof
        console.log("Verify", event);
    };
    return (
        <button className="btn btn-info">
            {/* <div> */}
            <IDKitWidget
                app_id="app_2563d84c8973c12b4958f5df691a4161" // obtained from the Developer Portal
                action="Identifications" // this is your action id from the Developer Portal
                onSuccess={onSuccess} // callback when the modal is closed
                handleVerify={handleVerify} // optional callback when the proof is received
                verification_level={VerificationLevel.Device}
            >
                {({ open }) => <button onClick={open}>Verify with World ID</button>}
            </IDKitWidget>
            {/* </div> */}
        </button>
    )
}



