"use client";

import clsx from "clsx";
import { LayoutGroup, motion } from "framer-motion";
import { Lobster } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const lobster = Lobster({ subsets: ["latin"], weight: ["400"] });

const navItems = {
  "/": {
    name: "Home",
  },
  "/about": {
    name: "About",
  },
  "/the-researchers": {
    name: "The Researchers",
  },
};

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="text-white h-12 px-8 bg-red-500 flex items-center justify-between">
      <Link href="/" className="select-none">
        <div className="flex justify-between gap-2 items-center">
          <Image
            src="/favicon.png"
            alt="ChiliFinder Logo"
            width={32}
            height={32}
            className="rounded-full"
          />

          <h1 className={`${lobster.className} text-xl`}>ChiliFinder</h1>
        </div>
      </Link>

      <LayoutGroup>
        <nav className="text-sm">
          <ul className="flex">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = pathname === path;

              return (
                <Link
                  key={path}
                  href={path}
                  className={clsx(
                    `transition-all hover:text-red-200 flex align-middle font-semibold`,
                    {
                      "text-white": !isActive,
                      "font-bold hover:text-white": isActive,
                    }
                  )}
                >
                  <span className="relative py-[5px] px-[10px]">
                    {name}
                    {path === pathname ? (
                      <motion.div
                        className="absolute inset-0 bg-red-400/40 rounded-md"
                        layoutId="navigations"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    ) : null}
                  </span>
                </Link>
              );
            })}
          </ul>
        </nav>
      </LayoutGroup>
    </header>
  );
}
