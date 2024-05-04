// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {Client} from "@chainlink/contracts-ccip@1.4.0/src/v0.8/ccip/libraries/Client.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip@1.4.0/src/v0.8/ccip/applications/CCIPReceiver.sol";


/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

/// @title - A simple contract for receiving string data across chains.
contract Receiver is CCIPReceiver {

    
    
    // Event emitted when a message is received from another chain.
    event MessageReceived(
        bytes32 indexed messageId, // The unique ID of the message.
        uint64 indexed sourceChainSelector, // The chain selector of the source chain.
        address sender, // The address of the sender from the source chain.
        string text // The text that was received.
    );

    bytes32 private s_lastReceivedMessageId; // Store the last received messageId.
    string public s_lastReceivedText; // Store the last received text.

    string public dataOne;
    string public dataTwo;

    /// @notice Constructor initializes the contract with the router address.
    /// @param router The address of the router contract.
    constructor(address router) CCIPReceiver(router) {}

    /// handle a received message
    function _ccipReceive(
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal override {
        s_lastReceivedMessageId = any2EvmMessage.messageId; // fetch the messageId
        s_lastReceivedText = abi.decode(any2EvmMessage.data, (string));

        //count commas
        // uint256 commaCount = 0;
        // for (uint256 i = 0; i < bytes(s_lastReceivedText).length; i++) {
        //     if (bytes(s_lastReceivedText)[i] == ',') {
        //         commaCount++;
        //     }
        // }

        // // Initialize the result array
        // string[] memory parts = new string[](commaCount + 1);
        
        // // Split the string
        // uint256 partIndex = 0;
        // uint256 startIndex = 0;
        // for (uint256 i = 0; i < bytes(s_lastReceivedText).length; i++) {
        //     if (bytes(s_lastReceivedText)[i] == ',') {
        //         parts[partIndex] = substring(s_lastReceivedText, startIndex, i);
        //         startIndex = i + 1;
        //         partIndex++;
        //     }
        // }
        // // Add the last part
        // parts[partIndex] = substring(s_lastReceivedText, startIndex, bytes(s_lastReceivedText).length);
        
        // dataOne = parts[0];
        // dataTwo = parts[1];

        // address myAddress = address(bytes20(bytes(parts[0])));
        // bytes memory functionCall = abi.encodeWithSignature(parts[1]);

        

        

        // (bool success, ) = address(0x62e8760248FE934B59F323bCBb5B2c8ED7f22071).call(abi.encodeWithSignature("changeX(7n)"));

        // require(success);
        

        emit MessageReceived(
            any2EvmMessage.messageId,
            any2EvmMessage.sourceChainSelector, // fetch the source chain identifier (aka selector)
            abi.decode(any2EvmMessage.sender, (address)), // abi-decoding of the sender address,
            abi.decode(any2EvmMessage.data, (string))
        );
    }

    /// @notice Fetches the details of the last received message.
    /// @return messageId The ID of the last received message.
    /// @return text The last received text.
    function getLastReceivedMessageDetails()
        external
        view
        returns (bytes32 messageId, string memory text)
    {
        return (s_lastReceivedMessageId, s_lastReceivedText);
    }

    function substring(string memory _str, uint256 _startIndex, uint256 _endIndex) private pure returns (string memory) {
        bytes memory strBytes = bytes(_str);
        bytes memory result = new bytes(_endIndex - _startIndex);
        for (uint256 i = _startIndex; i < _endIndex; i++) {
            result[i - _startIndex] = strBytes[i];
        }
        return string(result);
    }
}