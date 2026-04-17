"use client";

import CreatorFooter from "@/app/components/CreatorFooter";
import GoldDivider from "@/app/components/GoldDivider";
import { useCharacter } from "@/app/context/CharacterContext";
import { STEPS, isStepComplete } from "@/app/lib/types";
import { useCallback, useRef, useState } from "react";

import CareerStep from "@/app/steps/CareerStep";
import CharacterInfoStep from "@/app/steps/CharacterInfoStep";
import ConstellationStep from "@/app/steps/ConstellationStep";
import HistoryStep from "@/app/steps/HistoryStep";
import ReviewStep from "@/app/steps/ReviewStep";
import SpeciesStep from "@/app/steps/SpeciesStep";
import StatsStep from "@/app/steps/StatsStep";

const ENFORCE_VALIDATION =
  process.env.NEXT_PUBLIC_ENFORCE_VALIDATION === "true";

function renderStep(step: number) {
  switch (step) {
    case 0:
      return <CharacterInfoStep />;
    case 1:
      return <ConstellationStep />;
    case 2:
      return <SpeciesStep />;
    case 3:
      return <HistoryStep />;
    case 4:
      return <CareerStep />;
    case 5:
      return <StatsStep />;
    case 6:
      return <ReviewStep />;
  }
}

export default function CharacterCreatorShell() {
  const { step, setStep, data } = useCharacter();
  const canNavigate = !ENFORCE_VALIDATION || isStepComplete(step, data);

  const [sweepPhase, setSweepPhase] = useState<"entering" | "exiting" | null>(
    null,
  );
  const [sweepDir, setSweepDir] = useState<"next" | "back">("next");
  const pendingAction = useRef<(() => void) | null>(null);

  const triggerSweep = useCallback(
    (dir: "next" | "back", action: () => void) => {
      if (sweepPhase) return;
      pendingAction.current = action;
      setSweepDir(dir);
      setSweepPhase("entering");
    },
    [sweepPhase],
  );

  const handleEnterEnd = useCallback(() => {
    pendingAction.current?.();
    pendingAction.current = null;
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setSweepPhase("exiting");
  }, []);

  const handleExitEnd = useCallback(() => {
    setSweepPhase(null);
  }, []);

  const sweepClass =
    sweepPhase === "entering"
      ? sweepDir === "next"
        ? "animate-sweep-enter-right"
        : "animate-sweep-enter-left"
      : sweepDir === "next"
        ? "animate-sweep-exit-left"
        : "animate-sweep-exit-right";

  return (
    <div className="min-h-screen bg-dark-green flex flex-col">
      {sweepPhase && (
        <div
          className={`fixed inset-0 z-50 pointer-events-none ${sweepClass} ${
            sweepDir === "next"
              ? "bg-linear-to-r from-gold to-background"
              : "bg-linear-to-l from-gold to-background"
          }`}
          onAnimationEnd={
            sweepPhase === "entering" ? handleEnterEnd : handleExitEnd
          }
        />
      )}
      {/* ── Header ── */}
      <header className="relative shrink-0 py-8 px-6 text-center">
        <p className="text-gold/60 text-xs tracking-[0.35em] uppercase mb-3">
          Step {step + 1} of {STEPS.length}
        </p>
        <h1 className="text-gold text-3xl sm:text-4xl font-bold tracking-tight">
          {STEPS[step]}
        </h1>
        <div className="mt-4">
          <GoldDivider muted />
        </div>
      </header>

      {/* ── Content ── */}
      <main className="flex-1 px-6 pb-6">
        <div className="max-w-2xl mx-auto">{renderStep(step)}</div>
      </main>

      {/* ── Footer ── */}
      <CreatorFooter
        step={step}
        canNavigate={canNavigate}
        onBack={() => triggerSweep("back", () => setStep((s) => s - 1))}
        onNext={() => triggerSweep("next", () => setStep((s) => s + 1))}
        onSetStep={setStep}
      />
    </div>
  );
}
