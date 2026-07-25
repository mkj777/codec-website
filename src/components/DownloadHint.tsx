import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowUp, X } from "lucide-react"

import { Button } from "@/components/ui/button"

type DownloadHintProps = {
  message: string
  open: boolean
  onClose: () => void
}

const EASE = [0.22, 1, 0.36, 1] as const

export function DownloadHint({
  message,
  open,
  onClose,
}: DownloadHintProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="fixed inset-x-4 bottom-4 z-50 rounded-md border border-border-strong bg-surface p-4 text-foreground sm:inset-x-auto sm:bottom-auto sm:right-6 sm:top-8 sm:w-[330px]"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.24, ease: EASE }}
        >
          <motion.div
            aria-hidden="true"
            className="absolute -top-8 right-5 hidden h-8 w-px bg-primary sm:block"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [5, 0, 5],
                  }
            }
            transition={{ duration: 0.8, repeat: 2, ease: "easeInOut" }}
          >
            <ArrowUp className="absolute -left-[8px] -top-1 size-4 text-primary" />
          </motion.div>

          <div className="flex items-start gap-3">
            <div className="min-w-0 flex-1">
              <p className="font-bold">Check your downloads</p>
              <p className="mt-1 text-sm leading-5 text-muted-foreground">
                {message}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="-mr-2 -mt-2"
              onClick={onClose}
              aria-label="Dismiss download hint"
            >
              <X aria-hidden="true" />
            </Button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
