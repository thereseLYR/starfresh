import { useCharacter } from '@/app/context/CharacterContext'
import FieldLabel from '@/app/components/FieldLabel'
import StepIntro from '@/app/components/StepIntro'

export default function CharacterInfoStep() {
  const { data, update } = useCharacter()

  return (
    <div className="space-y-6">
      <StepIntro>
        Every legend begins with a name. Fill in the details that will define your character's identity in the world.
      </StepIntro>
      <div>
        <FieldLabel>Character Name</FieldLabel>
        <input
          type="text"
          value={data.name}
          onChange={e => update({ name: e.target.value })}
          placeholder="Enter your character's name…"
          className="w-full bg-dark-green border border-gold/30 rounded px-4 py-3 text-gold placeholder-gold/45 focus:outline-none focus:border-gold transition-colors"
        />
      </div>
      <div>
        <FieldLabel>Pronouns</FieldLabel>
        <div className="flex flex-wrap gap-2">
          {['He/Him', 'She/Her', 'They/Them', 'Custom'].map(p => (
            <button
              key={p}
              onClick={() => update({ pronouns: p })}
              className={`px-5 py-2 rounded border text-sm font-medium tracking-wide transition-all ${
                data.pronouns === p
                  ? 'bg-gold text-dark-green border-gold'
                  : 'border-gold/35 text-gold/80 hover:border-gold hover:text-gold'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div>
        <FieldLabel>Age</FieldLabel>
        <input
          type="number"
          value={data.age}
          onChange={e => update({ age: e.target.value })}
          placeholder="Character age…"
          min={1}
          className="w-full bg-dark-green border border-gold/30 rounded px-4 py-3 text-gold placeholder-gold/45 focus:outline-none focus:border-gold transition-colors"
        />
      </div>
      <div>
        <FieldLabel>Appearance</FieldLabel>
        <textarea
          value={data.appearance}
          onChange={e => update({ appearance: e.target.value })}
          placeholder="Describe your character's appearance, attire, and distinguishing features…"
          rows={4}
          className="w-full bg-dark-green border border-gold/30 rounded px-4 py-3 text-gold placeholder-gold/45 focus:outline-none focus:border-gold transition-colors resize-none"
        />
      </div>
    </div>
  )
}
