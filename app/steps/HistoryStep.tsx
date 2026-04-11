import { useCharacter } from '@/app/context/CharacterContext'
import StepIntro from '@/app/components/StepIntro'
import SelectionGrid, { SelectionItem } from '@/app/components/SelectionGrid'

export const HISTORIES: SelectionItem[] = [
  { name: 'Outlander',  desc: 'Raised beyond civilization, you speak the language of the wild.' },
  { name: 'Noble',      desc: 'Born to power and privilege, you know how to wield both.' },
  { name: 'Soldier',    desc: 'Forged in conflict, you carry the weight of battles won and lost.' },
  { name: 'Scholar',    desc: 'Knowledge is your armor — you have read what others have forgotten.' },
  { name: 'Merchant',   desc: 'Every relationship is a transaction, every deal a small victory.' },
  { name: 'Criminal',   desc: 'You know the shadows well. Sometimes that is where truth hides.' },
  { name: 'Acolyte',    desc: 'Faith shaped your early years; the divine still moves through your hands.' },
  { name: 'Folk Hero',  desc: 'The people called you hero once. That weight never truly leaves.' },
]

export default function HistoryStep() {
  const { data, update } = useCharacter()

  return (
    <>
      <StepIntro>
        Your history defines where you came from and the skills you carry into the unknown. The past is never truly behind you.
      </StepIntro>
      <SelectionGrid
        items={HISTORIES}
        selected={data.history}
        onSelect={v => update({ history: v })}
      />
    </>
  )
}
