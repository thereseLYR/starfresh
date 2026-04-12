import GoldDivider from "@/app/components/GoldDivider";
import ThemeToggle from "@/app/components/ThemeToggle";
import Link from "next/link";

export default function LandingScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative min-h-screen bg-dark-green flex flex-col items-center justify-center px-6">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="text-center max-w-xl">
        <GoldDivider muted />

        {/* text and buttons */}
        <div className="flex flex-col my-10 gap-8">
          <h1 className="text-gold text-3xl md:text-6xl sm:text-7xl font-bold tracking-[0.15em]">
            STRFRESH
          </h1>

          <p className="text-gold text-sm sm:text-base leading-relaxed">
            A fan-made character creation tool for{" "}
            <span className="text-gold">Starot</span>,
            <br className="hidden sm:block" /> the first made-in-Singapore
            TTRPG!
          </p>

          <p className="text-gold text-sm sm:text-base leading-relaxed ">
            Learn more about the game at{" "}
            <Link
              href="https://www.starotrpg.com/"
              className="text-gold underline"
            >
              starotrpg.com
            </Link>{" "}
            now!
          </p>

          <button
            onClick={onStart}
            className="btn-gold animate-fade-in px-10 py-3.5 border border-gold text-gold tracking-[0.25em] uppercase text-sm rounded"
          >
            Start your Journey
          </button>
        </div>

        <GoldDivider muted />
      </div>
    </div>
  );
}
