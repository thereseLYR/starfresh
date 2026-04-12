"use client";

import { STEPS } from "@/app/lib/types";

interface CreatorFooterProps {
  step: number;
  canNavigate: boolean;
  onBack: () => void;
  onNext: () => void;
  onSetStep: (i: number) => void;
}

export default function CreatorFooter({
  step,
  canNavigate,
  onBack,
  onNext,
  onSetStep,
}: CreatorFooterProps) {
  const isLast = step === STEPS.length - 1;

  return (
    <footer className="sticky bottom-0 shrink-0 border-t border-gold/15 px-6 pt-5 pb-6 bg-dark-green z-5">
      <div className="max-w-2xl mx-auto">
        {/* Navigation row */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            disabled={step === 0 || !canNavigate}
            className="btn-gold-back px-5 py-2 border border-gold text-gold text-sm rounded disabled:opacity-20 disabled:cursor-not-allowed"
          >
            ← Back
          </button>

          <span className="text-gold/65 text-xs text-center tracking-widest uppercase">
            {!isLast ? `Next: ${STEPS[step + 1]}` : "Finalize"}
          </span>

          {!isLast ? (
            <button
              onClick={onNext}
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
                  onClick={() => canNavigate && onSetStep(i)}
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
  );
}
