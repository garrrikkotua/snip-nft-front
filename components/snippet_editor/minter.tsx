import { useEthers } from "@usedapp/core";

export function Minter() {
  const { account, activateBrowserWallet, deactivate } = useEthers();

  const isConnected = account !== undefined;
  return <div>{isConnected ? <div>Mint</div> : <div>Connect</div>}</div>;
}
