import { useCharacter } from '@/app/context/CharacterContext'
import StepIntro from '@/app/components/StepIntro'
import { STAT_NAMES, STAT_ABBR, statModifier } from '@/app/lib/types'

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="review-row flex items-baseline justify-between py-3 border-b border-gold/15">
      <span className="text-gold/45 text-xs tracking-[0.15em] uppercase">{label}</span>
      <span className="text-gold text-sm font-medium max-w-[60%] text-right">{value || '—'}</span>
    </div>
  )
}

export default function ReviewStep() {
  const { data } = useCharacter()

  return (
    <div id="print-content">
      <StepIntro>
        Review your character before finalizing. When you're satisfied, export as a PDF to save your sheet.
      </StepIntro>

      <div className="space-y-8">
        <section>
          <h2 className="text-gold text-xs tracking-[0.25em] uppercase font-semibold mb-1 pb-2 border-b border-gold/20">
            Identity
          </h2>
          <ReviewRow label="Name"       value={data.name} />
          <ReviewRow label="Pronouns"   value={data.pronouns} />
          <ReviewRow label="Age"        value={data.age} />
          <ReviewRow label="Appearance" value={data.appearance} />
        </section>

        <section>
          <h2 className="text-gold text-xs tracking-[0.25em] uppercase font-semibold mb-1 pb-2 border-b border-gold/20">
            Background
          </h2>
          <ReviewRow label="Constellation" value={data.constellation} />
          <ReviewRow label="Species"        value={data.species} />
          <ReviewRow label="History"        value={data.history} />
          <ReviewRow label="Career"         value={data.career} />
        </section>

        <section>
          <h2 className="text-gold text-xs tracking-[0.25em] uppercase font-semibold mb-1 pb-2 border-b border-gold/20">
            Attributes
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-4">
            {STAT_NAMES.map(stat => (
              <div key={stat} className="border border-gold/25 rounded p-3 text-center">
                <div className="text-gold/40 text-xs mb-1">{STAT_ABBR[stat]}</div>
                <div className="text-gold font-bold text-2xl tabular-nums">{data.stats[stat]}</div>
                <div className="text-gold/40 text-xs font-mono">{statModifier(data.stats[stat])}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-10 pt-6 border-t border-gold/20">
        <button
          onClick={() => window.print()}
          className="w-full py-4 border border-gold text-gold font-semibold tracking-[0.2em] uppercase text-sm hover:bg-gold hover:text-dark-green transition-all rounded"
        >
          ✦ &nbsp;Export as PDF&nbsp; ✦
        </button>
      </div>
    </div>
  )
}
