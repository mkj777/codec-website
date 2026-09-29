import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { faqItems } from "@/content/faq"

type OverviewProps = {
  downloadUrl: string
}

const features = [
  {
    title: "Finds your games",
    description:
      "Codec scans your drives and launcher libraries and builds the library for you.",
  },
  {
    title: "Works with your launchers",
    description:
      "Dedicated support for Steam, Epic Games and Riot Games, plus the usual install folders of GOG Galaxy, Ubisoft Connect, the EA app, Xbox and Rockstar Games.",
  },
  {
    title: "Friends with Steam",
    description:
      "Sign in to Steam if you like. Codec then adds the games you own and keeps your achievements in sync.",
  },
  {
    title: "Covers and details",
    description:
      "Artwork and game details come from Steam, SteamGridDB, IGDB, RAWG and HowLongToBeat.",
  },
  {
    title: "Launch your way",
    description:
      "Start a game directly, through the launcher it belongs to, or with a custom launch script.",
  },
  {
    title: "Stays on your PC",
    description:
      "Your library is stored locally and no account is required. Any other game can be added by hand.",
  },
]

const container =
  "mx-auto grid w-full max-w-[1440px] gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-14 xl:px-20"

export function Overview({ downloadUrl }: OverviewProps) {
  return (
    <div className="bg-background pb-10 text-foreground">
      <section
        id="features"
        aria-labelledby="features-heading"
        className="py-16 sm:py-24"
      >
        <div className={container}>
          <div className="lg:col-span-4">
            <h2
              id="features-heading"
              className="text-4xl font-bold leading-[1] tracking-[-0.04em] sm:text-5xl"
            >
              Every launcher. One library.
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
              Codec is a free game launcher for Windows 10 and 11. It finds the
              games already on your PC, gathers them in one clean library with
              covers and details, and launches them from one place.
            </p>
          </div>
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8">
            {features.map(({ title, description }) => (
              <li key={title} className="border-t border-border pt-5">
                <h3 className="text-lg font-bold tracking-[-0.02em]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="faq" aria-labelledby="faq-heading" className="py-16 sm:py-24">
        <div className={container}>
          <h2
            id="faq-heading"
            className="text-4xl font-bold leading-[1] tracking-[-0.04em] sm:text-5xl lg:col-span-4"
          >
            Questions
          </h2>
          <div className="lg:col-span-8">
            {faqItems.map(({ question, answer }) => (
              <article
                key={question}
                className="border-t border-border py-6 first:pt-5"
              >
                <h3 className="text-lg font-bold tracking-[-0.02em]">
                  {question}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                  {answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className={container}>
        <div className="flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center lg:col-span-12">
          <p className="text-2xl font-bold tracking-[-0.03em]">
            Bring your games together.
          </p>
          <Button asChild>
            <a href={downloadUrl}>
              <Download aria-hidden="true" />
              Download for Windows
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
