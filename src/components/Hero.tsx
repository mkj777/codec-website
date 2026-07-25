import { useEffect, useRef, useState, type CSSProperties } from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import { Download, ExternalLink } from "lucide-react"

import mascotImage from "@/assets/shrimpSleep.png"
import { Button } from "@/components/ui/button"
import { GITHUB_REPO_URL } from "@/lib/github"
import { getDownloadHint } from "@/lib/browser"
import { sampleUnique } from "@/lib/random"

import { DownloadHint } from "./DownloadHint"

type HeroProps = {
  downloadUrl: string
}

const EASE = [0.22, 1, 0.36, 1] as const
const capsuleModules = import.meta.glob<string>(
  "/src/assets/steam_*_library_capsule*.jpg",
  { eager: true, import: "default" },
)
const selectedCapsules = sampleUnique(Object.values(capsuleModules), 10)
const SHARP_CAPSULE_MASK = {
  maskImage:
    "radial-gradient(ellipse 74% 82% at center, black 52%, rgb(0 0 0 / 72%) 70%, transparent 100%)",
  WebkitMaskImage:
    "radial-gradient(ellipse 74% 82% at center, black 52%, rgb(0 0 0 / 72%) 70%, transparent 100%)",
} satisfies CSSProperties
const BLUR_FADE_MASK = {
  maskImage:
    "radial-gradient(ellipse 72% 78% at center, black 28%, rgb(0 0 0 / 78%) 42%, rgb(0 0 0 / 38%) 52%, transparent 64%)",
  WebkitMaskImage:
    "radial-gradient(ellipse 72% 78% at center, black 28%, rgb(0 0 0 / 78%) 42%, rgb(0 0 0 / 38%) 52%, transparent 64%)",
} satisfies CSSProperties

function CapsuleGrid({
  className = "",
  style,
}: {
  className?: string
  style?: CSSProperties
}) {
  return (
    <div
      className={`absolute left-1/2 top-1/2 grid w-[85%] -translate-x-1/2 -translate-y-1/2 grid-cols-5 items-center gap-x-2 gap-y-4 sm:gap-x-3 sm:gap-y-5 lg:gap-y-6 ${className}`}
      data-capsule-grid
      style={style}
    >
      {selectedCapsules.map((src) => (
        <img
          alt=""
          className="aspect-[2/3] h-auto w-full rounded-md object-contain"
          decoding="async"
          key={src}
          src={src}
        />
      ))}
    </div>
  )
}

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
  const capsuleX = useTransform(scrollYProgress, [0, 1], [0, -18])
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
            <span className="text-sm font-bold text-primary">Pre-Release</span>
          </motion.header>

          <main className="relative grid min-h-0 flex-1 grid-rows-[minmax(200px,34svh)_auto] content-center gap-3 py-3 sm:grid-rows-[minmax(240px,40svh)_auto] sm:gap-5 lg:grid-cols-12 lg:grid-rows-1 lg:items-center lg:py-8">
            <div className="relative min-h-0 lg:col-span-8 lg:col-start-5 lg:row-start-1 lg:h-[70svh]">
              <motion.div
                aria-hidden="true"
                className="absolute inset-x-[2%] top-[2%] aspect-[5/3] origin-right sm:inset-x-0 sm:top-[4%] lg:left-0 lg:right-[-3%] lg:top-[8%]"
                data-capsule-stage
                style={
                  shouldReduceMotion ? undefined : { x: capsuleX }
                }
              >
                <div
                  className="absolute -inset-[20%]"
                  style={BLUR_FADE_MASK}
                >
                  <div className="absolute inset-[14.286%]">
                    <CapsuleGrid className="scale-[1.12] opacity-70 brightness-[.4] saturate-[.7] blur-[56px]" />
                  </div>
                </div>
                <motion.div
                  animate={{
                    opacity: 1,
                    clipPath: "inset(0 0% 0 0%)",
                  }}
                  className="absolute inset-0"
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          clipPath: "inset(0 46% 0 46%)",
                        }
                  }
                  transition={{ duration: 1.15, delay: 0.16, ease: EASE }}
                >
                  <CapsuleGrid
                    className="brightness-[.82] saturate-[.9]"
                    style={SHARP_CAPSULE_MASK}
                  />
                </motion.div>
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
              <p className="mt-3 text-sm text-utility">Windows 10+</p>
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
