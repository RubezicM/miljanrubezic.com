// components/pages/ClientWrapper.tsx
"use client";
import { useLenis } from "@/hooks/useLenis";
import CookieConsentComponent from "@/components/cookie/CookieConsent";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useLenis();
  return (
    <>
      <CookieConsentComponent />
      {children}
    </>
  );
}
