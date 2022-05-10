import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DAppProvider, Config, Mumbai, OptimismKovan } from "@usedapp/core";
import { DEFAULT_SELECTED_NETWORK } from "../types/networks";

const config: Config = {
  networks: [Mumbai, OptimismKovan],
  readOnlyChainId: DEFAULT_SELECTED_NETWORK.chainId,
  autoConnect: true,
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={config}>
      <Component {...pageProps} />
    </DAppProvider>
  );
}

export default MyApp;
