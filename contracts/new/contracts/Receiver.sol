// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

// Deploy this contract on Sepolia

import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */
contract Receiver is CCIPReceiver {
    

    event TargetContractCalled();
    // https://docs.chain.link/ccip/supported-networks/testnet
    address routerBaseSepolia = 0xD3b06cEbF099CE7DA4AcCf578aaebFDBd6e88a93;

    constructor() CCIPReceiver(routerBaseSepolia) {
        
    }

    //hardcoded for now
    address public targetContractAddress = 0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59;

    

    function _ccipReceive(
        Client.Any2EVMMessage memory message
    ) internal override {
        (bool success, ) = address(targetContractAddress).call(message.data);
        require(success);
        emit TargetContractCalled();
    }

    function setTargetContractAddress(address _targetContractAddress) external {
        targetContractAddress = _targetContractAddress;
    }
    
}