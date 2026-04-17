import type { Metadata } from "next";
import Link from "next/link";
import GoldDivider from "@/app/components/GoldDivider";

export const metadata: Metadata = {
  title: "About · Starfresh",
  description:
    "About Starfresh — a fan-made mobile-friendly character creator for Starot, the first made-in-Singapore TTRPG.",
};

function ExternalIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="inline-block ml-1 shrink-0 opacity-70"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="p-5 rounded-lg border border-gold/20 bg-panel/50 space-y-3">
      <p className="text-gold/50 text-[10px] tracking-[0.3em] uppercase">
        {title}
      </p>
      <div className="space-y-2 text-gold/75 text-sm leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark-green flex flex-col">
      {/* Header */}
      <header className="relative shrink-0 py-8 px-6 text-center">
        <p className="text-gold/60 text-xs tracking-[0.35em] uppercase mb-3">
          Starfresh
        </p>
        <h1 className="text-gold text-3xl sm:text-4xl font-bold tracking-tight">
          About
        </h1>
        <div className="mt-4">
          <GoldDivider muted />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-6 pb-12">
        <div className="max-w-2xl mx-auto space-y-4">
          <Section title="What is Starfresh?">
            <p>
              Starfresh is a fan-made character creation tool for{" "}
              <Link
                href="https://www.starotrpg.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors"
              >
                Starot
                <ExternalIcon />
              </Link>
              , the first made-in-Singapore tabletop RPG.
            </p>
            <p>
              It was built as an alternative to the official{" "}
              <Link
                href="https://loom.starotrpg.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors"
              >
                LOOM character tool
                <ExternalIcon />
              </Link>
              , with a focus on accessibility and ease of use.
            </p>
          </Section>

          <Section title="Why a new tool?">
            <p>
              LOOM is a great resource, but its interface was designed primarily
              for desktop. Several interactions rely on hover tooltips to surface
              rules information — tooltips that are invisible to touchscreen
              users.
            </p>
            <p>
              Starfresh replaces those patterns with dedicated information boxes
              that are always visible, and uses larger tap targets throughout so
              the tool works comfortably on phones and tablets.
            </p>
          </Section>

          <Section title="Design goals">
            <ul className="space-y-2">
              {[
                "Mobile-first and fully responsive — usable at the table on any device.",
                "Dedicated information panels instead of hover tooltips, so no content is gated behind a cursor.",
                "Larger UI elements with generous tap targets throughout.",
                "A cleaner visual hierarchy to reduce cognitive load during session zero.",
                "Export your character as a PDF, shareable URL, or JSON file — and import it back at any time.",
              ].map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="text-gold/40 shrink-0 mt-0.5">◆</span>
                  {point}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Source code">
            <p>
              Starfresh is open source. You can view the code, report issues, or
              contribute on GitHub. If you find a bug or have a suggestion,
              opening an issue is the best way to get in touch.
            </p>
            <Link
              href="https://github.com/thereseLYR/starfresh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-1 px-4 py-2.5 rounded-lg border border-gold/30 text-gold/70 text-sm hover:border-gold/60 hover:text-gold transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="shrink-0"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              thereseLYR/starfresh
              <ExternalIcon />
            </Link>
          </Section>

          <Section title="Disclaimer">
            <p>
              Starfresh is an unofficial fan project and is not affiliated with
              or endorsed by the Starot team. All game content, lore, and
              mechanics belong to their respective creators.
            </p>
          </Section>
        </div>
      </main>
    </div>
  );
}
