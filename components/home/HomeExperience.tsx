"use client";

import Script from "next/script";
import { useEraMotion } from "@/lib/era/motion/useEraMotion";

const jqueryUrl =
  "https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=6a068da7ad91b057365bf967";
const webflowUrl =
  "https://cdn.prod.website-files.com/6a068da7ad91b057365bf967/js/webflow.a0aa6ca1.b7683852b8a60d8e.js";

export function HomeExperience() {
  useEraMotion();

  return (
    <>
      <Script id="era-jquery" src={jqueryUrl} strategy="afterInteractive" />
      <Script
        id="era-webflow"
        src={webflowUrl}
        strategy="afterInteractive"
      />
    </>
  );
}
