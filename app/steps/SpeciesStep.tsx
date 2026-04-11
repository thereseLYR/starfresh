import { useCharacter } from '@/app/context/CharacterContext'
import StepIntro from '@/app/components/StepIntro'
import SelectionGrid, { SelectionItem } from '@/app/components/SelectionGrid'

export const SPECIES: SelectionItem[] = [
  { name: 'Human',      desc: 'Adaptable and ambitious, humans shape the world through sheer will.' },
  { name: 'Elf',        desc: 'Ancient and graceful, elves carry centuries of memory in their eyes.' },
  { name: 'Dwarf',      desc: 'Stone-born and steadfast, dwarves endure where others crumble.' },
  { name: 'Orc',        desc: 'Fierce and proud, orcs carry the honor of their ancestors into battle.' },
  { name: 'Halfling',   desc: 'Small in stature, vast in luck — halflings find fortune where none exists.' },
  { name: 'Dragonborn', desc: 'Heirs to an age of dragons, their bloodline still crackles with power.' },
  { name: 'Tiefling',   desc: 'Marked by infernal heritage, they carry darkness as both curse and weapon.' },
  { name: 'Gnome',      desc: 'Curious and inventive, gnomes unravel the mysteries others overlook.' },
]

export default function SpeciesStep() {
  const { data, update } = useCharacter()

  return (
    <>
      <StepIntro>
        Each species carries unique traits, histories, and strengths that define your place in the world. Who are you among the peoples of this age?
      </StepIntro>
      <SelectionGrid
        items={SPECIES}
        selected={data.species}
        onSelect={v => update({ species: v })}
      />
    </>
  )
}
