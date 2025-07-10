"use client";
import Link from "next/link";
import Nav from "@/components/Nav";

import { motion } from "framer-motion";
import { slideIn } from "@/animations/motionVariants";

const Header = () => {
  return (
    <header className="text-white flex w-full fixed top-0 left-0 justify-between px-4 py-4 bg-transparent items-center z-20">
      <motion.div
        variants={slideIn("left", 1, 0.4)}
        initial="hidden"
        animate="show"
      >
        <Link href="/">
          <h1 className="text-4xl font-semibold">
            rwd<span className="text-accent text-6xl leading-[0]">.</span>
          </h1>
        </Link>
      </motion.div>
      <Nav />
    </header>
  );
};

export default Header;
