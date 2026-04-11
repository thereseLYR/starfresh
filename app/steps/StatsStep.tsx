import { useCharacter } from '@/app/context/CharacterContext'
import StepIntro from '@/app/components/StepIntro'
import { STAT_NAMES, STAT_ABBR, StatName, statModifier } from '@/app/lib/types'

export default function StatsStep() {
  const { data, update } = useCharacter()

  const updateStat = (stat: StatName, delta: number) => {
    const next = Math.max(1, Math.min(20, data.stats[stat] + delta))
    update({ stats: { ...data.stats, [stat]: next } })
  }

  return (
    <>
      <StepIntro>
        Allocate your character's core attributes. These values shape every challenge, confrontation, and triumph ahead.
      </StepIntro>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {STAT_NAMES.map(stat => (
          <div key={stat} className="border border-gold/25 rounded p-4 text-center">
            <div className="text-gold/40 text-xs tracking-[0.2em] uppercase mb-3">
              {STAT_ABBR[stat]}
            </div>
            <div className="text-gold text-4xl font-bold tabular-nums mb-1">
              {data.stats[stat]}
            </div>
            <div className="text-gold/40 text-sm font-mono mb-1">
              {statModifier(data.stats[stat])}
            </div>
            <div className="text-gold/35 text-xs mb-4">{stat}</div>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => updateStat(stat, -1)}
                disabled={data.stats[stat] <= 1}
                className="w-8 h-8 rounded border border-gold/35 text-gold hover:border-gold hover:bg-gold/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all text-base leading-none"
              >
                −
              </button>
              <button
                onClick={() => updateStat(stat, 1)}
                disabled={data.stats[stat] >= 20}
                className="w-8 h-8 rounded border border-gold/35 text-gold hover:border-gold hover:bg-gold/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all text-base leading-none"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
