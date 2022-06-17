import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DAppProvider, Config, Mumbai } from "@usedapp/core";
import { DEFAULT_SELECTED_NETWORK } from "../types/networks";
import Footer from "../components/footer";
import Header from "../components/header";
import Layout from "../components/layout/layout";

const config: Config = {
  networks: [Mumbai],
  readOnlyChainId: DEFAULT_SELECTED_NETWORK.chainId,
  autoConnect: true,
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={config}>
      <div className="flex min-h-screen w-full flex-col items-center justify-center py-2 bg-[#f4cff2] overflow-x-hidden">
        <Header />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Footer />
      </div>
    </DAppProvider>
  );
}

export default MyApp;
