import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { SnippetEditor } from "../components/snippet_editor/snippet_editor";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-gradient-to-br from-red-200 to-white">
      <Head>
        <title>SnipNFT - Create code snippet and mint it as NFT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center px-20 text-center">
        <h1 className="text-6xl font-bold mt-2">
          Welcome to{" "}
          <a className="text-red-700" href="https://nextjs.org">
            SnipNFT
          </a>
        </h1>
        <h2 className="text-2xl font-light mt-10">
          Create a beautiful code snippet and mint it as NFT on Ethereum (via{" "}
          <a
            href="https://www.optimism.io/"
            className="underline decoration-red-500"
          >
            Optimism
          </a>
          )
        </h2>
        <div className="mt-10">
          <SnippetEditor />
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t border-red-300"></footer>
    </div>
  );
};

export default Home;
