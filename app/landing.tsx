import Link from "next/link";

export default function LandingScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-dark-green flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="block h-px w-16 bg-gold/20" />
          <span className="text-gold/40">◆</span>
          <span className="block h-px w-16 bg-gold/20" />
        </div>

        <h1 className="text-gold text-6xl sm:text-7xl font-bold tracking-[0.15em] mb-6">
          STRFRESH
        </h1>

        <p className="text-gold/60 text-sm sm:text-base leading-relaxed mb-14">
          A fan-made character creation tool for{" "}
          <span className="text-gold">Starot</span>,
          <br className="hidden sm:block" /> the first made-in-Singapore TTRPG!
        </p>

        <p className="text-gold/60 text-sm sm:text-base leading-relaxed mb-14">
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

        <div className="flex items-center justify-center gap-3 mt-10">
          <span className="block h-px w-16 bg-gold/20" />
          <span className="text-gold/40">◆</span>
          <span className="block h-px w-16 bg-gold/20" />
        </div>
      </div>
    </div>
  );
}
