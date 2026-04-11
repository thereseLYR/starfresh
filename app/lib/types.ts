export type StatName = 'Strength' | 'Dexterity' | 'Constitution' | 'Intelligence' | 'Wisdom' | 'Charisma'
export type Stats = Record<StatName, number>

export type CharData = {
  name: string
  pronouns: string
  age: string
  appearance: string
  constellation: string
  species: string
  history: string
  career: string
  stats: Stats
}

export const DEFAULT_DATA: CharData = {
  name: '',
  pronouns: '',
  age: '',
  appearance: '',
  constellation: '',
  species: '',
  history: '',
  career: '',
  stats: {
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10,
  },
}

export const STEPS = [
  'Character Info',
  'Constellation',
  'Species',
  'History',
  'Career',
  'Stats',
  'Review',
]

export const STAT_NAMES: StatName[] = [
  'Strength',
  'Dexterity',
  'Constitution',
  'Intelligence',
  'Wisdom',
  'Charisma',
]

export const STAT_ABBR: Record<StatName, string> = {
  Strength: 'STR',
  Dexterity: 'DEX',
  Constitution: 'CON',
  Intelligence: 'INT',
  Wisdom: 'WIS',
  Charisma: 'CHA',
}

export function statModifier(val: number): string {
  const mod = Math.floor((val - 10) / 2)
  return mod >= 0 ? `+${mod}` : `${mod}`
}

export function isStepComplete(step: number, data: CharData): boolean {
  switch (step) {
    case 0: return !!(data.name && data.pronouns && data.age && data.appearance)
    case 1: return !!data.constellation
    case 2: return !!data.species
    case 3: return !!data.history
    case 4: return !!data.career
    default: return true
  }
}
