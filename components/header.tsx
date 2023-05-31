"use client";

import clsx from "clsx";
import { LayoutGroup, motion } from "framer-motion";
import { Lobster } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";

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
    <header className="w-full text-white h-12 px-4 md:px-8 bg-red-500 flex items-center justify-between">
      <Link href="/" className="select-none">
        <div className="flex justify-between gap-2 items-center">
          <Image
            src="/favicon.png"
            alt="ChiliFinder Logo"
            width={32}
            height={32}
            className="rounded-md"
          />

          <h1 className={`${lobster.className} text-xl`}>ChiliFinder</h1>
        </div>
      </Link>

      <Menu as="div" className="sm:hidden">
        <Menu.Button className="space-y-1 w-5">
          <div className="w-full h-1 bg-white" />
          <div className="w-full h-1 bg-white" />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-0"
          enterTo="opacity-100 translate-y-1"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-1"
          leaveTo="opacity-0 translate-y-0"
        >
          <Menu.Items
            static
            className={clsx(
              "absolute top-1 py-2 overflow-hidden right-1 mx-auto w-80 bg-red-900 text-white rounded-md shadow-lg"
            )}
          >
            <LayoutGroup>
              <div className="transition-all">
                {Object.entries(navItems).map(([path, { name }]) => {
                  const isPath = pathname === path;

                  return (
                    <Menu.Item key={name}>
                      {({ active, close }) => (
                        <div className={clsx("flex justify-between pl-2")}>
                          <Link
                            href={path}
                            className={clsx(
                              active && !isPath ? "text-red-500" : "",
                              "block p-2 transition-all"
                            )}
                            // onClick={close}
                          >
                            <span className="font-semibold relative p-2">
                              {name}
                              {path === pathname ? (
                                <motion.div
                                  className="absolute inset-0 bg-red-400/40 rounded-md"
                                  layoutId="burger-navigations"
                                  transition={{
                                    type: "spring",
                                    stiffness: 350,
                                    damping: 30,
                                  }}
                                />
                              ) : null}
                            </span>
                          </Link>
                          {name === "Home" && (
                            <button onClick={close} className="px-2">
                              <IoClose className="text-2xl hover:text-white/50" />
                            </button>
                          )}
                        </div>
                      )}
                    </Menu.Item>
                  );
                })}
              </div>
            </LayoutGroup>
          </Menu.Items>
        </Transition>
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
