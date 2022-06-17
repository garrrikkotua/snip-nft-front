import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex h-24 w-full items-center justify-center mt-5 border-t border-[#DB88D6]">
      <Link href="https://twitter.com/garrrikkotua">
        <a className="text-center underline decoration-inherit">
          @garrrikkotua
        </a>
      </Link>
    </footer>
  );
}
