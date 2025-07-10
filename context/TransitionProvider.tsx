// components/TransitionProvider.tsx
"use client";
import React, { createContext, useContext, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

type TransitionCtx = {
  exitAndNavigate: (href: string) => Promise<void>;
  registerExit: (fn: () => Promise<void>) => () => void;
};

const TransitionContext = createContext<TransitionCtx | null>(null);

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const exitFns = useRef(new Set<() => Promise<void>>());
  const pathname = usePathname();

  const registerExit = (fn: () => Promise<void>) => {
    exitFns.current.add(fn);
    return () => {
      exitFns.current.delete(fn);
    };
  };

  const exitAndNavigate = async (href: string) => {
    if (href === pathname) {
      return;
    }
    await Promise.all(Array.from(exitFns.current).map((fn) => fn()));
    router.push(href);
  };

  return (
    <TransitionContext.Provider value={{ exitAndNavigate, registerExit }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx)
    throw new Error("useTransition must be used inside TransitionProvider");
  return ctx;
}
