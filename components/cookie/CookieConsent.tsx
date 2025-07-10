"use client";

import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import { getCookieConsentConfig } from "./CookieConsentConfig";
import "vanilla-cookieconsent/dist/cookieconsent.css";

const CookieConsentComponent = () => {
  useEffect(() => {
    CookieConsent.run(getCookieConsentConfig());
  }, []);

  return null;
};

export default CookieConsentComponent;
