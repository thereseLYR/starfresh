import CardDeck, { DeckCard } from '@/app/components/CardDeck'
import StepIntro from '@/app/components/StepIntro'
import { useCharacter } from '@/app/context/CharacterContext'
import { useGameData } from '@/app/context/GameDataContext'
import { SingleCardData } from '@/app/lib/gameData'

function toCard({ name, flavourText, symbol, body }: SingleCardData): DeckCard {
  return { name, flavourText, symbol, body }
}

export default function CareerStep() {
  const { data, update } = useCharacter()
  const { careers } = useGameData()
  const cards = careers.map(toCard)

  return (
    <>
      <StepIntro>
        Your career determines the techniques, abilities, and power you bring to
        every encounter. What path have you walked?
      </StepIntro>
      <CardDeck
        cards={cards}
        selected={data.career}
        onSelect={(v) => update({ career: v ?? '' })}
      />
    </>
  )
}
