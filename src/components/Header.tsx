import Link from "next/link";
import { Container } from "./Container";
import { site } from "@/content/site";

export function Header() {
  return (
    <header className="border-b border-zinc-200/60 bg-white/70 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          {site.brand}
          <span className="ml-2 text-sm font-normal text-zinc-600">
            {site.nameEn}
          </span>
        </Link>

        <nav className="hidden gap-5 text-sm text-zinc-700 md:flex">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-zinc-900">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-50"
        >
          相談する
        </Link>
      </Container>
    </header>
  );
}