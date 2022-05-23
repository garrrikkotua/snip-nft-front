import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { SnippetEditor } from "../components/snippet_editor/snippet_editor";
import { Header } from "../components/header";
import { NetworkPicker } from "../components/network_picker";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center py-2 bg-gradient-to-br from-[#E1A5DD] to-white">
      <Head>
        <title>SnipNFT - Create code snippet and mint it as NFT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <div className="grid grid-rows-2 md:grid-cols-5 md:grid-rows-none w-full justify-items-center items-center">
          <h1 className="text-6xl font-bold md:col-start-3 mb-3 md:mb-0">
            <Link href="/">
              <a className="text-[#570DF8]">SnipNFT</a>
            </Link>
          </h1>
          <div className="flex flex-row justify-items-center items-center md:col-span-2 md:justify-self-end mr-2">
            <NetworkPicker />
            <Header />
          </div>
        </div>
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
