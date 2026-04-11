import { useCharacter } from '@/app/context/CharacterContext'
import StepIntro from '@/app/components/StepIntro'
import SelectionGrid, { SelectionItem } from '@/app/components/SelectionGrid'

export const CAREERS: SelectionItem[] = [
  { name: 'Fighter',  desc: 'Masters of martial combat, disciplined and unyielding in battle.' },
  { name: 'Wizard',   desc: 'Scholars of the arcane, bending reality through study and precision.' },
  { name: 'Rogue',    desc: 'Silent and deadly, excelling in stealth, deception, and precision strikes.' },
  { name: 'Cleric',   desc: 'Conduits of divine power — healer, warrior, and voice of the gods.' },
  { name: 'Ranger',   desc: 'Hunters of the wilderness, skilled trackers and dual-weapon wielders.' },
  { name: 'Bard',     desc: 'Wielders of magic through music, masters of inspiration and trickery.' },
  { name: 'Paladin',  desc: 'Holy warriors bound by sacred oaths, combining faith with martial prowess.' },
  { name: 'Druid',    desc: 'Guardians of nature, shapeshifters drawing power from the living world.' },
]

export default function CareerStep() {
  const { data, update } = useCharacter()

  return (
    <>
      <StepIntro>
        Your career determines the techniques, abilities, and power you bring to every encounter. What path have you walked?
      </StepIntro>
      <SelectionGrid
        items={CAREERS}
        selected={data.career}
        onSelect={v => update({ career: v })}
      />
    </>
  )
}
