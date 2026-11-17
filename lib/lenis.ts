"use client";
import type Lenis from "lenis";

let instance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => { instance = l; };
export const getLenis = () => instance;

/** Sanft zu einem Anker scrollen (mit Header-Offset) */
export function scrollToHash(hash: string, immediate = false) {
  const el = document.querySelector(hash) as HTMLElement | null;
  if (!el) return false;
  const offset = -(parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 84) + 1;
  if (instance) instance.scrollTo(el, { offset, immediate, duration: 1.4, force: true });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: immediate ? "auto" : "smooth" });
  return true;
}
