import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App.tsx";
import { faqItems } from "@/content/faq";

// Used only at build time by scripts/prerender.mjs.
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://codeclibrary.dev/#faq",
  mainEntity: faqItems.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};
