import { useCharacter } from '@/app/context/CharacterContext'
import StepIntro from '@/app/components/StepIntro'
import SelectionGrid, { SelectionItem } from '@/app/components/SelectionGrid'

export const CONSTELLATIONS: SelectionItem[] = [
  { name: 'The Wanderer',     symbol: '✦', desc: 'Born under wandering stars, destined for distant horizons.' },
  { name: "Dragon's Maw",     symbol: '◈', desc: 'Forged in celestial fire, bearing ancient draconic power.' },
  { name: 'Twin Swords',      symbol: '⚔', desc: 'Guided by blades of light, poised between war and peace.' },
  { name: 'The Ancient Tree', symbol: '⟁', desc: 'Rooted in the cosmos, growing through the ages unchanged.' },
  { name: "Moon's Eye",       symbol: '◯', desc: 'Watched over by the silver eye, gifted with hidden sight.' },
  { name: "Sailor's Star",    symbol: '★', desc: 'A beacon in the dark, drawn always toward uncharted waters.' },
  { name: 'The Phoenix',      symbol: '⋈', desc: 'Death is only a doorway — you have walked through it before.' },
  { name: 'Forgotten King',   symbol: '♔', desc: 'A crown lost to time, power waiting to be reclaimed.' },
]

export default function ConstellationStep() {
  const { data, update } = useCharacter()

  return (
    <>
      <StepIntro>
        Your birth constellation shapes your innate gifts and the cosmic forces aligned with your destiny. Choose the star pattern that resonates with your soul.
      </StepIntro>
      <SelectionGrid
        items={CONSTELLATIONS}
        selected={data.constellation}
        onSelect={v => update({ constellation: v })}
      />
    </>
  )
}
