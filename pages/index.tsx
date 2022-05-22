import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { SnippetEditor } from "../components/snippet_editor/snippet_editor";
import { Header } from "../components/header";
import { NetworkPicker } from "../components/network_picker";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-gradient-to-br from-[#E1A5DD] to-white">
      <Head>
        <title>SnipNFT - Create code snippet and mint it as NFT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="grid grid-cols-[12.5%_12.5%_50%_12.5%_12.5%] justify-items-center w-full items-center">
        <div></div>
        <div></div>
        <h1 className="text-6xl font-bold">
          <a className="text-[#570DF8]" href="/">
            SnipNFT
          </a>
        </h1>
        <NetworkPicker />
        <Header />
      </header>

      <main className="flex w-full flex-1 flex-col items-center px-20 text-center">
        <h2 className="text-2xl font-light mt-10">
          Create a beautiful code snippet and mint it as NFT on Ethereum (via{" "}
          <a
            href="https://www.optimism.io/"
            className="underline decoration-[#570DF8]"
          >
            Optimism
          </a>
          )
        </h2>
        <div className="mt-10">
          <SnippetEditor />
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center mt-5 border-t border-[#DB88D6]">
        <Link href="https://twitter.com/garrrikkotua">
          <a className="text-center underline decoration-inherit">
            @garrrikkotua
          </a>
        </Link>
      </footer>
    </div>
  );
};

export default Home;
