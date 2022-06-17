import React from "react";
import { useEthers } from "@usedapp/core";
import Head from "next/head";
import Link from "next/link";
import { NetworkPicker } from "./network_picker";

export default function Header() {
  const { account, activateBrowserWallet, deactivate } = useEthers();

  const isConnected = account !== undefined;

  return (
    <>
      <Head>
        <title>SnipNFT - Create code snippet and mint it as NFT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-[26vw]"></div>
          <h1 className="text-6xl font-bold w-[52vw] text-center">
            <Link href="/">
              <a className="text-[#570DF8]">SnipNFT</a>
            </Link>
          </h1>
          <div className="flex flex-row md:w-[26vw] md:ml-8 mt-4 self-center ml-2">
            <div>
              <NetworkPicker />
            </div>
            <div className="pl-1">
              {isConnected ? (
                <button className="btn btn-primary" onClick={deactivate}>
                  Disconnect
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={activateBrowserWallet}
                >
                  Connect
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
