"use client"

/* eslint-disable no-useless-concat */

import React from "react";
import { GateFiDisplayModeEnum, GateFiSDK, GateFiLangEnum } from "@gatefi/js-sdk";
import { FC, useRef, useEffect, useState, ChangeEvent, FormEvent } from "react";
import crypto from "crypto";

import { redirect } from "next/navigation";
import { useAuth } from "../providers/authProvider";
import { useSmartAccountClient } from "@alchemy/aa-alchemy/react";


const OnrampExample: React.FC = () => {
  const [showIframe, setShowIframe] = useState(false);
  const overlayInstanceSDK = useRef<GateFiSDK | null>(null);
  const embedInstanceSDK = useRef<GateFiSDK | null>(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  
  // @ts-ignore
  const { user } = useAuth();
  const { client } = useSmartAccountClient({
    type: "MultiOwnerModularAccount",
  });
  
  
  const address = client?.account?.address;
  const userEmail = user?.email;
  useEffect(() => {
    return () => {
      overlayInstanceSDK.current?.destroy();
      overlayInstanceSDK.current = null;
      embedInstanceSDK.current?.destroy();
      embedInstanceSDK.current = null;
    };
  }, []);

  const handleOnClickEmbed = () => {
    if (showIframe) {
      embedInstanceSDK.current?.hide();
      setShowIframe(false);
    } else {
      if (!embedInstanceSDK.current) {
        createEmbedSdkInstance();
      }
      embedInstanceSDK.current?.show();
      setShowIframe(true);
    }
  };

  const handleCloseEmbed = () => {
    embedInstanceSDK.current?.destroy();
    embedInstanceSDK.current = null;
    setShowIframe(false);
};

  const handleOnClick = () => {
    if (overlayInstanceSDK.current) {
      if (isOverlayVisible) {
        overlayInstanceSDK.current.hide();
        setIsOverlayVisible(false);
      } else {
        overlayInstanceSDK.current.show();
        setIsOverlayVisible(true);
      }
    } else {
      const randomString = crypto.randomBytes(32).toString("hex");
      overlayInstanceSDK.current = new GateFiSDK({
        merchantId: `${process.env.NEXT_PUBLIC_UNLIMIT_MERCHANTID}`,
        displayMode: GateFiDisplayModeEnum.Overlay,
        nodeSelector: "#overlay-button",
        lang: GateFiLangEnum.en_US,
        isSandbox: true,
        successUrl:"https://www.crypto.unlimit.com/",
        walletAddress: address,
        email: userEmail,
        externalId: randomString,
        defaultFiat: {
          currency: "USD",
          amount: "20",
        },
        defaultCrypto: {
          currency: "USDT-BEP20",
        },
      });
    }
    overlayInstanceSDK.current?.show();
    setIsOverlayVisible(true);
  };

  // Function to create a new embed SDK instance
  const createEmbedSdkInstance = () => { 
    const randomString = crypto.randomBytes(32).toString("hex");

    embedInstanceSDK.current =
      typeof document !== "undefined"
        ? new GateFiSDK({
            merchantId: `${process.env.NEXT_PUBLIC_UNLIMIT_MERCHANTID}`,
            displayMode: GateFiDisplayModeEnum.Embedded,
            nodeSelector: "#embed-button",
            isSandbox: true,
            walletAddress: address,
            email: userEmail,
            externalId: randomString,
            defaultFiat: {
              currency: "USD",
              amount: "30",
            },
            defaultCrypto: {
              currency: "USDT-BEP20",
            },
          })
        : null;
  };

  const handleHostedFlowClick = () => {
    const url =
      `https://onramp-sandbox.gatefi.com/?merchantId=${process.env.NEXT_PUBLIC_UNLIMIT_MERCHANTID}`;
    window.open(url, "_blank");
  };

  

  return (
    
      <div
        
      >
        {/* Buttons with modern styling */}
        
        {user && (
        <>
        <div>
          
        
          <button
            onClick={handleOnClick}
            className="btn btn-primary w-full"
            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Fund your wallet
          </button>
          
          
        </div>
  
        <div
          
        >
          <div id="embed-button" style={{ width: "100%", height: showIframe ? "calc(100% - 40px)" : "100%" }}></div>
          {showIframe && (
            <button
              onClick={handleCloseEmbed}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                background: "rgb(201, 247, 58)",
                color: "black",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          )}
        </div>
  
        <div id="overlay-button"></div>
        </>
        )}

      </div>
   
  );
  
};

export default OnrampExample;