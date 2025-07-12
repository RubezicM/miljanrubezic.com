// components/ClientCursors.tsx
"use client";
import dynamic from "next/dynamic";

const RainbowCursorGlow = dynamic(() => import("./RainbowCursorGlow"), {
  ssr: false,
});

const Cursor = dynamic(() => import("./Cursor"), {
  ssr: false,
});

export default function ClientWrapper() {
  return (
    <>
      <RainbowCursorGlow />
      <Cursor />
    </>
  );
}
