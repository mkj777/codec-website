export type FaqItem = { question: string; answer: string };

// Shared by the visible FAQ section and the FAQPage JSON-LD injected at build time.
export const faqItems: FaqItem[] = [
  {
    question: "Which launchers and stores does Codec support?",
    answer:
      "Codec has dedicated support for Steam, Epic Games and Riot Games. It also scans your drives for installed games, including the usual install folders of GOG Galaxy, Ubisoft Connect, the EA app, Xbox and Rockstar Games, and you can add any game executable by hand.",
  },
  {
    question: "Is Codec free?",
    answer:
      "Yes. Codec is free and open source under the MIT license. There is no subscription and no required account.",
  },
  {
    question: "Which operating systems does Codec run on?",
    answer:
      "Codec is a desktop app for Windows 10 and Windows 11 (64-bit). There is no macOS or Linux version at the moment.",
  },
  {
    question: "Do I need to sign in to Steam or another launcher?",
    answer:
      "No. Codec finds the games installed on your PC without any account. Signing in to Steam is optional and lets Codec add the Steam games you own and keep your achievements in sync.",
  },
  {
    question: "Where do the artwork and game details come from?",
    answer:
      "Codec enriches your games with covers, artwork and details from Steam, SteamGridDB, IGDB, RAWG and HowLongToBeat. Your library itself is stored locally on your PC.",
  },
  {
    question: "Is Codec an alternative to Playnite?",
    answer:
      "Codec covers similar ground: it puts games from several launchers into one Windows library. Its focus is finding your games automatically and showing them in a calm, simple interface, then launching them directly or through the launcher they belong to. Codec is in active development, so expect it to keep growing.",
  },
];
