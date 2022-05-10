import React from "react";
import { useEthers } from "@usedapp/core";

export const Header = () => {
  const { account, activateBrowserWallet, deactivate } = useEthers();

  const isConnected = account !== undefined;

  return (
    <div className="flex gap-1 p-4 self-end">
      {isConnected ? (
        <button className="btn btn-primary" onClick={deactivate}>
          Disconnect
        </button>
      ) : (
        <button className="btn btn-primary" onClick={activateBrowserWallet}>
          Connect
        </button>
      )}
    </div>
  );
};
