"use client";

import GoldDivider from "@/app/components/GoldDivider";
import {
  CharacterProvider,
  useCharacter,
} from "@/app/context/CharacterContext";
import LandingScreen from "@/app/landing";
import { STEPS, isStepComplete } from "@/app/lib/types";
import { useState } from "react";

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

function CharacterCreatorShell() {
  const { step, setStep, data } = useCharacter();
  const isLast = step === STEPS.length - 1;
  const canNavigate = !ENFORCE_VALIDATION || isStepComplete(step, data);

  return (
    <div className="min-h-screen bg-dark-green flex flex-col">
      {/* ── Header ── */}
      <header className="shrink-0 pt-10 pb-7 px-6 text-center">
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
      <main className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="max-w-2xl mx-auto">{renderStep(step)}</div>
      </main>

      {/* ── Footer ── */}
      <footer className="shrink-0 border-t border-gold/15 px-6 pt-5 pb-6">
        <div className="max-w-2xl mx-auto">
          {/* Navigation row */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => {
                setStep((s) => s - 1);
                window.scrollTo(0, 0);
              }}
              disabled={step === 0 || !canNavigate}
              className="bg-transparent px-5 py-2 border border-gold/35 text-gold/80 text-sm rounded hover:border-gold hover:text-gold disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            >
              ← Back
            </button>

            <span className="text-gold/65 text-xs text-center tracking-widest uppercase">
              {!isLast ? `Next: ${STEPS[step + 1]}` : "Finalize"}
            </span>

            {!isLast ? (
              <button
                onClick={() => {
                  setStep((s) => s + 1);
                  window.scrollTo(0, 0);
                }}
                disabled={!canNavigate}
                className="btn-gold px-5 py-2 border border-gold text-gold text-sm rounded disabled:opacity-20 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            ) : (
              <div className="w-19.5" />
            )}
          </div>

          {/* Stepper */}
          <div className="flex items-start justify-center">
            {STEPS.map((name, i) => {
              const done = i < step;
              const current = i === step;
              return (
                <div key={i} className="flex items-start">
                  <button
                    onClick={() => canNavigate && setStep(i)}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <div
                      className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                        current
                          ? "border-gold bg-gold text-dark-green"
                          : done
                            ? "border-gold/70 text-gold/70"
                            : "border-gold/35 text-gold/55"
                      }`}
                    >
                      {done ? "✓" : i + 1}
                    </div>
                    <span
                      className={`text-[10px] leading-tight text-center hidden sm:block transition-colors max-w-13 ${
                        current
                          ? "text-gold"
                          : done
                            ? "text-gold/60"
                            : "text-gold/30"
                      }`}
                    >
                      {name}
                    </span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`h-px w-4 sm:w-8 mt-3.5 mx-1 shrink-0 transition-colors ${
                        done ? "bg-gold/45" : "bg-gold/12"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function CharacterCreator() {
  const [started, setStarted] = useState(false);

  if (!started) return <LandingScreen onStart={() => setStarted(true)} />;

  return (
    <CharacterProvider>
      <CharacterCreatorShell />
    </CharacterProvider>
  );
}
