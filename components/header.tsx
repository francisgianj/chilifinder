import { Lobster } from "next/font/google";
import Link from "next/link";

const lobster = Lobster({ subsets: ["latin"], weight: ["400"] });

export default function Header() {
  return (
    <header className="h-12 px-8 bg-red-500 flex items-center justify-between">
      <h1 className={`${lobster.className} text-xl`}>
        <Link href="/" rel="home">
          ChiliFinder
        </Link>
      </h1>

      <nav className="text-sm">
        <ul className="flex">
          <li className="hover:bg-yellow-100/50 py-1 px-2 rounded-md transition-colors ease-linear">
            <Link href="/about">About</Link>
          </li>
          <li className="hover:bg-yellow-100/50 py-1 px-2 rounded-md transition-colors ease-linear">
            <Link href="/the-researchers">The Researchers</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
