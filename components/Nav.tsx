"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import React, { useEffect, useState } from "react";
import Socials from "@/components/Socials";

const links = [
  {
    name: "Home",
    path: "home",
  },
  {
    name: "Services",
    path: "services",
  },
  {
    name: "About",
    path: "about",
  },
];

const Nav = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const scrollTo = async (id: string) => {
    if (pathname !== "/") {
      await router.push(`/#${id}`);
      setOpen(false);
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" });
    window.history.pushState({}, "", `#${id}`);
    setOpen(false);
  };

  useEffect(() => {
    const onPop = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "auto" });
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-accent" />
      </SheetTrigger>
      <SheetContent className="flex flex-col" aria-description="Side menu">
        <SheetHeader>
          <SheetTitle hidden>Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-32 mb-40 text-center text-2xl">
          <Link href="/">
            <h1 className="text-4xl font-semibold">
              rwd<span className="text-accent">.</span>
            </h1>
          </Link>
        </div>
        <nav className="flex flex-col justify-center items-center gap-8">
          {links.map((link, index) => (
            <SheetClose asChild key={index}>
              <button
                onClick={() => scrollTo(link.path)}
                className="text-lg font-medium text-left"
              >
                {link.name}
              </button>
            </SheetClose>
          ))}
        </nav>
        <Socials
          containerStyles="flex flex-row items-center gap-2 absolute bottom-6 left-1/2 -translate-x-1/2"
          iconStyles="hover:-translate-y-[5px] transition-all text-2xl"
        />
      </SheetContent>
    </Sheet>
  );
};

export default Nav;
