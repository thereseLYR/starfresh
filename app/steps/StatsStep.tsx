import GoldDivider from "@/app/components/GoldDivider";
import StatReference from "@/app/components/StatReference";
import StepIntro from "@/app/components/StepIntro";
import { useCharacter } from "@/app/context/CharacterContext";
import { STAT_NAMES, StatName, Stats, StatsMethod } from "@/app/lib/types";
import { useState } from "react";

// ── Stat allocation helpers ───────────────────────────────────────────────────

const STANDARD_ARRAY = [6, 6, 7, 7, 7, 8, 8, 9, 10];

function roll3d6DropLowest(): number {
  const dice = Array.from({ length: 3 }, () => Math.ceil(Math.random() * 6));
  dice.sort((a, b) => a - b);
  return dice[1] + dice[2];
}

function remainingPool(
  base: number[],
  assigned: Partial<Record<StatName, number>>,
): number[] {
  const remaining = [...base];
  for (const val of Object.values(assigned)) {
    if (val !== undefined) {
      const i = remaining.indexOf(val);
      if (i !== -1) remaining.splice(i, 1);
    }
  }
  return remaining;
}

// Re-derive per-method assignments from persisted stats + source array.
// Only assigns a stat if its value exists in the source array (handles duplicates).
function reconstructAssignments(
  base: number[],
  stats: Stats,
): Partial<Record<StatName, number>> {
  const available = [...base];
  const result: Partial<Record<StatName, number>> = {};
  for (const stat of STAT_NAMES) {
    const val = stats[stat];
    const i = available.indexOf(val);
    if (i !== -1) {
      result[stat] = val;
      available.splice(i, 1);
    }
  }
  return result;
}

export default function StatsStep() {
  const { data, update } = useCharacter();

  // ── Allocation state — lazy-initialised from context on mount ────────────
  const [method, setMethod] = useState<"standard" | "random">(() =>
    data.statsMethod === "random" ? "random" : "standard"
  );
  const [rolledValues, setRolledValues] = useState<number[] | null>(() =>
    data.rolledValues.length > 0 ? data.rolledValues : null
  );
  const [stdAssignments, setStdAssignments] = useState<Partial<Record<StatName, number>>>(() =>
    data.statsMethod !== "random"
      ? reconstructAssignments(STANDARD_ARRAY, data.stats)
      : {}
  );
  const [rndAssignments, setRndAssignments] = useState<Partial<Record<StatName, number>>>(() =>
    data.statsMethod === "random" && data.rolledValues.length > 0
      ? reconstructAssignments(data.rolledValues, data.stats)
      : {}
  );
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // Derived from active method
  const assignments = method === "standard" ? stdAssignments : rndAssignments;
  const setAssignments =
    method === "standard" ? setStdAssignments : setRndAssignments;
  const baseArray =
    method === "standard" ? STANDARD_ARRAY : (rolledValues ?? []);
  const pool = remainingPool(baseArray, assignments);
  const rolled = rolledValues !== null;

  const syncStats = (a: Partial<Record<StatName, number>>, m?: "standard" | "random") => {
    update({
      stats: { ...data.stats, ...a } as Stats,
      statsMethod: (m ?? method) as StatsMethod,
    });
  };

  const switchMethod = (m: "standard" | "random") => {
    setMethod(m);
    setSelectedIdx(null);
    const incoming = m === "standard" ? stdAssignments : rndAssignments;
    syncStats(incoming, m);
  };

  const handleRoll = () => {
    const values = Array.from({ length: 9 }, roll3d6DropLowest).sort(
      (a, b) => a - b,
    );
    setRolledValues(values);
    setRndAssignments({});
    setSelectedIdx(null);
    update({ rolledValues: values, statsMethod: "random" });
  };

  const handlePoolClick = (idx: number) => {
    setSelectedIdx(selectedIdx === idx ? null : idx);
  };

  const handleStatClick = (stat: StatName) => {
    const current = assignments[stat] ?? null;
    if (selectedIdx !== null) {
      const newA = { ...assignments, [stat]: pool[selectedIdx] };
      setAssignments(newA);
      setSelectedIdx(null);
      syncStats(newA);
    } else if (current !== null) {
      const newA = { ...assignments };
      delete newA[stat];
      setAssignments(newA);
      syncStats(newA);
    }
  };

  const assignedCount = Object.keys(assignments).length;
  const total = baseArray.reduce((s, v) => s + v, 0);
  const assignedTotal = Object.values(assignments).reduce(
    (s, v) => s + (v ?? 0),
    0,
  );
  const poolTotal = pool.reduce((s, v) => s + v, 0);

  return (
    <>
      <StepIntro>
        Allocate your character's core attributes. These values shape every
        challenge, confrontation, and triumph ahead.
      </StepIntro>
      <StatReference />

      {/* ── Allocation ── */}
      <div className="mt-10">
        <GoldDivider muted />
      </div>

      <div className="mt-8 space-y-6">
        {/* Method selector */}
        <div>
          <p className="text-gold/50 text-[10px] tracking-[0.3em] uppercase mb-3">
            Allocation Method
          </p>
          <div className="flex gap-3">
            {(["standard", "random"] as const).map((m) => (
              <button
                key={m}
                onClick={() => switchMethod(m)}
                className={`flex-1 py-2.5 px-4 rounded-lg border text-sm transition-[border-color,color,box-shadow] duration-200 ${
                  method === m
                    ? "border-gold text-gold shadow-[0_0_14px_rgba(224,199,135,0.15)]"
                    : "border-gold/20 text-gold/50 hover:border-gold/45 hover:text-gold/75"
                }`}
              >
                {m === "standard" ? "Standard Array" : "Random Array"}
              </button>
            ))}
          </div>
          <p className="mt-2 text-gold/40 text-xs leading-relaxed">
            {method === "standard"
              ? "Distribute 6, 6, 7, 7, 7, 8, 8, 9, 10 among your nine stats. Total: 68."
              : "Roll 3d6, drop the lowest die, and sum the remaining two — nine times. Average total: ~76."}
          </p>
        </div>

        {/* Random: roll button */}
        {method === "random" && !rolled && (
          <button
            onClick={handleRoll}
            className="btn-gold w-full py-3 border border-gold text-gold text-sm rounded tracking-wide"
          >
            Roll Stats
          </button>
        )}

        {/* Random: re-roll / fallback controls */}
        {method === "random" && rolled && (
          <div className="flex gap-3">
            <button
              onClick={handleRoll}
              className="flex-1 py-2 border border-gold/30 text-gold/60 text-xs rounded hover:border-gold/50 hover:text-gold/80 transition-colors"
            >
              Re-roll
            </button>
            <button
              onClick={() => switchMethod("standard")}
              className="flex-1 py-2 border border-gold/30 text-gold/60 text-xs rounded hover:border-gold/50 hover:text-gold/80 transition-colors"
            >
              Use Standard Array instead
            </button>
          </div>
        )}

        {/* Value pool */}
        {pool.length > 0 && (
          <div>
            <p className="text-gold/50 text-[10px] tracking-[0.3em] uppercase mb-3">
              Available Values
            </p>
            <div className="flex flex-wrap gap-2">
              {pool.map((val, i) => (
                <button
                  key={i}
                  onClick={() => handlePoolClick(i)}
                  className={`w-10 h-10 rounded border text-sm font-bold transition-[border-color,background-color,color,box-shadow] duration-150 ${
                    selectedIdx === i
                      ? "border-gold bg-gold text-dark-green shadow-[0_0_12px_rgba(224,199,135,0.3)]"
                      : "border-gold/35 text-gold hover:border-gold/70"
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Stat grid */}
        {(method === "standard" || rolled) && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-gold/50 text-[10px] tracking-[0.3em] uppercase">
                Assign Stats
              </p>
              <p className="text-gold/40 text-xs tabular-nums">
                {assignedCount}/9 assigned · total {assignedTotal + poolTotal}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {STAT_NAMES.map((stat) => {
                const val = assignments[stat] ?? null;
                const isReceivable = selectedIdx !== null;
                return (
                  <button
                    key={stat}
                    onClick={() => handleStatClick(stat)}
                    className={`rounded-lg border p-3 text-center transition-[border-color,background-color,box-shadow] duration-150 ${
                      val !== null
                        ? "border-gold/50 bg-gold/10 hover:border-gold/70"
                        : isReceivable
                          ? "border-gold/40 border-dashed hover:border-gold/60"
                          : "border-gold/15 hover:border-gold/25"
                    }`}
                  >
                    <div className="text-gold/50 text-[10px] tracking-widest mb-1">
                      {stat}
                    </div>
                    <div
                      className={`text-xl font-bold tabular-nums leading-none ${
                        val !== null ? "text-gold" : "text-gold/20"
                      }`}
                    >
                      {val ?? "—"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
