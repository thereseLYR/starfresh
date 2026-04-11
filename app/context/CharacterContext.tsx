'use client'

import { createContext, useContext, useState } from 'react'
import { CharData, DEFAULT_DATA } from '@/app/lib/types'

type CharacterContextValue = {
  data: CharData
  update: (partial: Partial<CharData>) => void
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
}

const CharacterContext = createContext<CharacterContextValue | null>(null)

export function CharacterProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<CharData>(DEFAULT_DATA)
  const [step, setStep] = useState(0)

  const update = (partial: Partial<CharData>) =>
    setData(prev => ({ ...prev, ...partial }))

  return (
    <CharacterContext.Provider value={{ data, update, step, setStep }}>
      {children}
    </CharacterContext.Provider>
  )
}

export function useCharacter(): CharacterContextValue {
  const ctx = useContext(CharacterContext)
  if (!ctx) throw new Error('useCharacter must be used inside CharacterProvider')
  return ctx
}
