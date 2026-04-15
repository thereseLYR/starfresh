"use client";

import GoldDivider from "@/app/components/GoldDivider";
import { useCharacter } from "@/app/context/CharacterContext";
import { STAT_ABBR, StatName } from "@/app/lib/types";
import { useState } from "react";

const STAT_GROUPS: {
  name: string;
  suit: string;
  stats: { abbr: StatName; desc: string; affinities: string[] }[];
}[] = [
  {
    name: "Physical",
    suit: "Wands",
    stats: [
      {
        abbr: "PS",
        desc: "Raw physical power, lifting capacity, melee damage, and physical intimidation.",
        affinities: ["The Emperor", "Strength", "The Chariot"],
      },
      {
        abbr: "PA",
        desc: "Reflexes, reaction speed, deft manipulation of tools and weapons.",
        affinities: ["The Magician", "Wheel of Fortune", "The Sun"],
      },
      {
        abbr: "PR",
        desc: "Stamina, endurance, disease resistance, and wound recovery.",
        affinities: ["The Tower", "The Devil", "The World"],
      },
    ],
  },
  {
    name: "Mental",
    suit: "Swords",
    stats: [
      {
        abbr: "MS",
        desc: "Theoretical and technical knowledge, research ability, memory retention.",
        affinities: ["The Hierophant", "The Hermit", "The High Priestess"],
      },
      {
        abbr: "MA",
        desc: "Street smarts, pattern recognition, tactical analysis, problem-solving.",
        affinities: ["The Star", "The Moon", "Judgement"],
      },
      {
        abbr: "MR",
        desc: "Willpower, mental fortitude, focus under pressure, psionic resistance.",
        affinities: ["Justice", "The Hanged Man", "Death"],
      },
    ],
  },
  {
    name: "Social",
    suit: "Cups",
    stats: [
      {
        abbr: "SS",
        desc: "Charisma, leadership, persuasion, magnetic presence.",
        affinities: ["The Emperor", "The Lovers", "The Sun"],
      },
      {
        abbr: "SA",
        desc: "Social perception, emotional intelligence, manipulation, quick wit.",
        affinities: ["The Magician", "The High Priestess", "The Moon"],
      },
      {
        abbr: "SR",
        desc: "Personal confidence, conviction, dedication to values and beliefs.",
        affinities: ["The Hermit", "Justice", "Temperance"],
      },
    ],
  },
];

export default function StatReference() {
  const { data } = useCharacter();
  const [open, setOpen] = useState(false);
  const [openSuits, setOpenSuits] = useState<Record<string, boolean>>({});

  const toggleSuit = (suit: string) =>
    setOpenSuits((prev) => ({ ...prev, [suit]: !prev[suit] }));

  return (
    <div className="border border-gold/15 rounded-lg overflow-hidden">
      {/* ── Top-level toggle ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gold/5 transition-colors"
      >
        <span className="text-gold/50 text-[10px] tracking-[0.3em] uppercase">
          Stat Reference
        </span>
        <span
          className={`text-gold/40 text-2xl transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      {/* ── Body ── */}
      {open && (
        <div className="border-t border-gold/15 animate-expand-down">
          {STAT_GROUPS.map((group, gi) => {
            const suitOpen = openSuits[group.suit] ?? false;
            return (
              <div key={group.suit}>
                {/* ── Suit toggle ── */}
                <button
                  onClick={() => toggleSuit(group.suit)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gold/5 transition-colors"
                >
                  <span className="text-gold/50 text-[10px] tracking-[0.3em] uppercase">
                    {group.name} · {group.suit}
                  </span>
                  <span
                    className={`text-gold/40 text-2xl transition-transform duration-200 ${suitOpen ? "rotate-180" : ""}`}
                  >
                    ▾
                  </span>
                </button>

                {/* ── Suit content ── */}
                {suitOpen && (
                  <div className="px-4 pb-4 space-y-3 animate-expand-down">
                    {group.stats.map(({ abbr, desc, affinities }) => (
                      <div
                        key={abbr}
                        className="p-4 rounded-lg border border-gold/15 bg-panel/40"
                      >
                        <div className="flex items-baseline gap-3 mb-1.5">
                          <span className="text-gold font-bold text-sm">
                            {abbr}
                          </span>
                          <span className="text-gold/75 text-sm">
                            {STAT_ABBR[abbr]}
                          </span>
                        </div>
                        <p className="text-gold/55 text-xs leading-relaxed mb-3">
                          {desc}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {affinities.map((a) => {
                            const active = data.constellation === a;
                            return (
                              <span
                                key={a}
                                className={`text-[10px] rounded px-2 py-0.5 border transition-colors ${
                                  active
                                    ? "bg-gold/20 border-gold/60 text-gold"
                                    : "border-gold/20 text-gold/50"
                                }`}
                              >
                                {a}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
