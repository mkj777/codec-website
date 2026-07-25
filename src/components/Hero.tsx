import { useEffect, useRef, useState } from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import { Download, ExternalLink } from "lucide-react"

import libraryScreenshot from "@/assets/Codec_LibraryView.png"
import mascotImage from "@/assets/shrimpSleep.png"
import { Button } from "@/components/ui/button"
import { GITHUB_REPO_URL } from "@/lib/github"
import { getDownloadHint } from "@/lib/browser"

import { DownloadHint } from "./DownloadHint"

type HeroProps = {
  downloadUrl: string
}

const EASE = [0.22, 1, 0.36, 1] as const

export function Hero({ downloadUrl }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const dismissTimerRef = useRef<number | undefined>(undefined)
  const shouldReduceMotion = useReducedMotion()
  const [hintOpen, setHintOpen] = useState(false)
  const [hintMessage, setHintMessage] = useState("")
  const [hintVersion, setHintVersion] = useState(0)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const screenshotScale = useTransform(scrollYProgress, [0, 1], [0.98, 1.04])
  const screenshotX = useTransform(scrollYProgress, [0, 1], [0, -18])
  const mascotY = useTransform(scrollYProgress, [0, 1], [0, -20])

  useEffect(
    () => () => {
      window.clearTimeout(dismissTimerRef.current)
    },
    [],
  )

  const closeDownloadHint = () => {
    window.clearTimeout(dismissTimerRef.current)
    setHintOpen(false)
  }

  const showDownloadHint = () => {
    window.clearTimeout(dismissTimerRef.current)
    setHintMessage(getDownloadHint(window.navigator.userAgent))
    setHintVersion((version) => version + 1)
    setHintOpen(true)
    dismissTimerRef.current = window.setTimeout(
      () => setHintOpen(false),
      8_000,
    )
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[118svh] min-h-[720px] bg-background text-foreground lg:min-h-[760px]"
    >
      <div className="sticky top-0 flex h-svh min-h-[620px] overflow-hidden">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col px-5 py-5 sm:px-8 sm:py-6 lg:px-14 lg:py-8 xl:px-20">
          <motion.header
            className="relative z-30 flex items-center justify-between"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <a
              href="/"
              className="text-xl font-bold tracking-[-0.02em] text-foreground"
              aria-label="Codec home"
            >
              Codec
            </a>
            <Button asChild variant="ghost" size="sm" className="px-2">
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink aria-hidden="true" />
                GitHub
              </a>
            </Button>
          </motion.header>

          <main className="relative grid min-h-0 flex-1 grid-rows-[minmax(200px,34svh)_auto] content-center gap-3 py-3 sm:grid-rows-[minmax(240px,40svh)_auto] sm:gap-5 lg:grid-cols-12 lg:grid-rows-1 lg:items-center lg:py-8">
            <div className="relative min-h-0 lg:col-span-8 lg:col-start-5 lg:row-start-1 lg:h-[70svh]">
              <motion.div
                className="absolute inset-x-0 top-[5%] h-[72%] origin-right overflow-hidden rounded-md border border-border bg-surface sm:top-[8%] lg:right-[-3%] lg:h-[74%]"
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        clipPath: "inset(0 46% 0 46%)",
                      }
                }
                animate={{
                  opacity: 1,
                  clipPath: "inset(0 0% 0 0%)",
                }}
                style={
                  shouldReduceMotion
                    ? undefined
                    : { scale: screenshotScale, x: screenshotX }
                }
                transition={{ duration: 1.15, delay: 0.16, ease: EASE }}
              >
                <img
                  src={libraryScreenshot}
                  alt="Codec library showing games from one collection"
                  className="h-full w-full object-cover object-[48%_center]"
                />
              </motion.div>

              <motion.img
                src={mascotImage}
                alt="Shrimp, the Codec mascot, sleeping"
                className="absolute -bottom-[1%] right-[-2%] z-10 w-[58%] min-w-[210px] max-w-[560px] sm:right-[2%] sm:w-[52%] lg:-bottom-[3%] lg:right-[-1%] lg:w-[54%]"
                initial={
                  shouldReduceMotion ? false : { opacity: 0, y: 26, scale: 0.96 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                style={shouldReduceMotion ? undefined : { y: mascotY }}
                transition={{ duration: 0.85, delay: 0.52, ease: EASE }}
              />
            </div>

            <motion.div
              className="relative z-20 max-w-xl self-center lg:col-span-5 lg:col-start-1 lg:row-start-1"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease: EASE }}
            >
              <h1 className="text-[clamp(3rem,13vw,5rem)] font-bold leading-[0.94] tracking-[-0.055em] sm:text-[clamp(4rem,10vw,6rem)] lg:text-[clamp(4.75rem,7vw,7rem)]">
                <span className="block">Your games.</span>
                <span className="block">One library.</span>
              </h1>
              <p className="mt-5 max-w-[38rem] text-base leading-6 text-muted-foreground sm:text-lg sm:leading-7 lg:max-w-[31rem]">
                Finds your games. Organizes the details.
                <br />
                Is Friends with Steam.
              </p>
              <div
                id="download"
                className="mt-6 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3"
              >
                <Button asChild className="w-full sm:w-auto">
                  <a href={downloadUrl} onClick={showDownloadHint}>
                    <Download aria-hidden="true" />
                    Download for Windows
                  </a>
                </Button>
                <Button asChild variant="link" className="w-full sm:w-auto">
                  <a
                    href={GITHUB_REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink aria-hidden="true" />
                    View on GitHub
                  </a>
                </Button>
              </div>
              <p className="mt-3 text-sm text-utility">
                Windows 10+ · Work in progress
              </p>
            </motion.div>
          </main>

          <footer className="relative z-30 flex items-end justify-between text-xs text-utility">
            <span>Codec for Windows</span>
            <span>© 2026 Codec</span>
          </footer>
        </div>
      </div>

      <DownloadHint
        key={hintVersion}
        message={hintMessage}
        open={hintOpen}
        onClose={closeDownloadHint}
      />
    </section>
  )
}
