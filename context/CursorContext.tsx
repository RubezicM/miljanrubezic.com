// context/CursorContext.tsx
"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { useMinWidth } from "@/hooks/useMinWidth";

interface CursorContextType {
  hideCursor: boolean;
  setHideCursor: (hide: boolean) => void;
  cursorStyle: string;
  setCursorStyle: (style: string) => void;
  cursorVisible: boolean;
  setCursorVisible: (visible: boolean) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hideCursor, setHideCursor] = useState(false);
  const [cursorStyle, setCursorStyle] = useState("default");
  const [cursorVisible, setCursorVisible] = useState(true);
  const isDesktop = useMinWidth(768);

  // Hide cursor on non-desktop
  useEffect(() => {
    setHideCursor(!isDesktop);
  }, [isDesktop]);

  const value = {
    hideCursor,
    setHideCursor,
    cursorStyle,
    setCursorStyle,
    cursorVisible,
    setCursorVisible,
  };

  return (
    <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
};
