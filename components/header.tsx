"use client";

import clsx from "clsx";
import { LayoutGroup, motion } from "framer-motion";
import { Lobster } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Cross as Hamburger } from "hamburger-react";
import { Menu } from "@headlessui/react";

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


// TODO: Add dialog to the hamburger's nav items
export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full text-white h-12 px-4 md:px-8 bg-red-500 flex items-center justify-between">
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

      <Menu as="div" className="sm:hidden">
        <Menu.Button>
          <Hamburger size={32} />
        </Menu.Button>

        <Menu.Items
          className={clsx(
            "absolute top-1 inset-x-1 mx-auto w-[98%] bg-red-900 text-white rounded-md shadow-lg"
          )}
        >
          {Object.entries(navItems).map(([path, { name }]) => {
            const isActive = pathname === path;

            return (
              <Menu.Item key={name}>
                {({ active, close }) => (
                  <Link href={path} className="block px-4 py-2" onClick={close}>
                    <span className="font-medium">{name}</span>
                  </Link>
                )}
              </Menu.Item>
            );
          })}
        </Menu.Items>
      </Menu>

      <div className="hidden sm:block">
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
      </div>
    </header>
  );
}
