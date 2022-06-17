import { ReactElement } from "react";

interface LayoutProps {
  children: ReactElement;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="flex w-full flex-1 flex-col items-center px-20 text-center">
      <h2 className="text-2xl mt-10 font-bold">
        Create a beautiful code snippet 💻 and mint it as NFT on{" "}
        <a
          href="https://polygon.technology/"
          className="underline decoration-[#570DF8]"
        >
          Polygon
        </a>
      </h2>
      <div className="mt-10">
        <div className="w-[70vw] bg-white rounded-xl shadow-lg flex flex-col px-3 pt-0 pb-2">
          {children}
        </div>
      </div>
    </main>
  );
}
