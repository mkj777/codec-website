import { motion, useReducedMotion } from "framer-motion"
import { ExternalLink, House } from "lucide-react"

import mascotImage from "@/assets/shrimpSleep.png"
import { Button } from "@/components/ui/button"
import { GITHUB_REPO_URL } from "@/lib/github"

const EASE = [0.22, 1, 0.36, 1] as const

export function NotFound() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <main className="grid min-h-svh items-center bg-background px-5 py-10 text-foreground sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-16">
      <motion.div
        className="mx-auto w-full max-w-xl"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: EASE }}
      >
        <p className="text-7xl font-bold leading-none tracking-[-0.05em] text-primary sm:text-8xl">
          404
        </p>
        <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-md text-base leading-6 text-muted-foreground sm:text-lg sm:leading-7">
          Looks like this page went into hiding. Let’s get you back home.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <a href="/">
              <House aria-hidden="true" />
              Go back home
            </a>
          </Button>
          <Button asChild variant="outline">
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
      </motion.div>

      <motion.img
        src={mascotImage}
        alt="Shrimp, the Codec mascot, sleeping"
        className="mx-auto mt-10 w-full max-w-xl lg:mt-0"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.18, ease: EASE }}
      />
    </main>
  )
}
