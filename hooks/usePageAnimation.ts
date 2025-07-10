// hooks/usePageAnimation.ts
"use client";
import { useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { useTransition } from "@/context/TransitionProvider";

interface Options {
  autoStart?: boolean;
  ready?: boolean;
}

export function usePageAnimation({
  autoStart = true,
  ready = true,
}: Options = {}) {
  const controls = useAnimationControls();
  const { registerExit } = useTransition();

  useEffect(() => {
    if (autoStart && ready) {
      controls.start("animate");
    }
  }, [autoStart, ready, controls]);

  useEffect(() => {
    const unregister = registerExit(() => controls.start("exit"));
    return unregister;
  }, [controls, registerExit]);

  return controls;
}
