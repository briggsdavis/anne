"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

const REVEAL_SELECTOR = "img, h1, h2, h3, h4, p"

function RevealForRoute() {
  useEffect(() => {
    const main = document.querySelector("main")
    if (!main) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const observed = new Set<Element>()
    const firstSection = main.querySelector("section")

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          entry.target.classList.add("is-visible")
          revealObserver.unobserve(entry.target)
        })
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -8% 0px",
      },
    )

    const registerElements = () => {
      const candidates = Array.from(main.querySelectorAll(REVEAL_SELECTOR))

      candidates.forEach((element) => {
        if (observed.has(element) || firstSection?.contains(element)) return
        if (element.closest("[data-no-scroll-reveal]")) return

        const isImage = element.tagName === "IMG"
        const peers = Array.from(element.parentElement?.querySelectorAll(REVEAL_SELECTOR) ?? [])
        const peerIndex = Math.max(0, peers.indexOf(element))
        const delay = isImage ? 120 : 200 + Math.min(peerIndex, 4) * 110

        element.classList.add(isImage ? "scroll-reveal-image" : "scroll-reveal-text")
        ;(element as HTMLElement).style.setProperty("--scroll-reveal-delay", `${delay}ms`)
        observed.add(element)

        if (reducedMotion) {
          element.classList.add("is-visible")
        } else {
          revealObserver.observe(element)
        }
      })
    }

    const animationFrame = window.requestAnimationFrame(registerElements)
    const mutationObserver = new MutationObserver(registerElements)
    mutationObserver.observe(main, { childList: true, subtree: true })

    return () => {
      window.cancelAnimationFrame(animationFrame)
      mutationObserver.disconnect()
      revealObserver.disconnect()
    }
  }, [])

  return null
}

export default function ScrollReveal() {
  const pathname = usePathname()

  return <RevealForRoute key={pathname} />
}
