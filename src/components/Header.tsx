"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { site } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const openBtnRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // ルートが変わったら閉じる（メニュー開いたまま遷移しない）
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // open中は背景スクロールを止める + ESCで閉じる
  useEffect(() => {
    if (!open) return;

    const html = document.documentElement;

    const prevHtmlOverflow = html.style.overflow;
    const prevHtmlPaddingRight = html.style.paddingRight;

    // スクロールバー幅（消えるとガタつくので補正）
    const scrollBarWidth = window.innerWidth - html.clientWidth;

    html.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      html.style.paddingRight = `${scrollBarWidth}px`;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    setTimeout(() => closeBtnRef.current?.focus(), 0);

    return () => {
      html.style.overflow = prevHtmlOverflow;
      html.style.paddingRight = prevHtmlPaddingRight;
      window.removeEventListener("keydown", onKeyDown);
      openBtnRef.current?.focus();
    };
  }, [open]);


  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/60 bg-white/70 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          {site.brand}
          <span className="ml-2 hidden text-sm font-normal text-zinc-600 sm:inline">
            {site.nameEn}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden gap-5 text-sm text-zinc-700 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-zinc-900 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="hidden rounded-full border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-50 transition-colors md:inline-flex"
        >
          相談する
        </Link>

        {/* Mobile hamburger */}
        <button
          ref={openBtnRef}
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-50 transition-colors md:hidden"
          aria-label="メニューを開く"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      </Container>

      {/* Mobile overlay + drawer */}
      {/* overlay */}
      <div
        className={[
          "fixed inset-0 z-40 bg-black/30 backdrop-blur-sm",
          "transition-opacity duration-200 ease-out motion-reduce:transition-none",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="モバイルメニュー"
        className={[
          "fixed right-0 top-0 z-50 h-dvh w-80 max-w-[85vw] bg-white shadow-xl",
          "flex flex-col", // ← 追加
          "transform transition-transform duration-300 ease-out motion-reduce:transition-none motion-reduce:transform-none",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
>

        <div className="flex h-16 items-center justify-between border-b border-zinc-200/60 px-5">
          <div className="font-semibold">{site.brand}</div>
          <button
            ref={closeBtnRef}
            type="button"
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-50 transition-colors"
            aria-label="メニューを閉じる"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6">
          <nav className="flex flex-col gap-3">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-50 transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6 space-y-3 pb-10">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-full bg-zinc-900 px-5 py-2.5 text-sm text-white hover:bg-zinc-800 transition-colors"
              onClick={() => setOpen(false)}
            >
              まず相談する
            </Link>
            <div className="text-xs text-zinc-500">
              {site.location} / {site.pricing}
            </div>
          </div>
        </div>

      </aside>
    </header>
  );
}
