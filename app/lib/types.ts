export type StatName =
  | "PS"
  | "PA"
  | "PR"
  | "MS"
  | "MA"
  | "MR"
  | "SS"
  | "SA"
  | "SR";
export type Stats = Record<StatName, number>;

export type NewSoulStatus = "organic" | "newsoul" | "";
export type StatsMethod = "standard" | "random" | "";

export type CharData = {
  name: string;
  pronouns: string;
  age: string;
  appearance: string;
  constellation: string;
  species: string;
  newsoul: NewSoulStatus;
  history: string;
  career: string;
  stats: Stats;
  statsMethod: StatsMethod;
  rolledValues: number[];
};

export const DEFAULT_DATA: CharData = {
  name: "",
  pronouns: "",
  age: "",
  appearance: "",
  constellation: "",
  species: "",
  newsoul: "",
  history: "",
  career: "",
  statsMethod: "",
  rolledValues: [],
  stats: {
    PS: 0,
    PA: 0,
    PR: 0,
    MS: 0,
    MA: 0,
    MR: 0,
    SS: 0,
    SA: 0,
    SR: 0,
  },
};

// confirmed
export const STEPS = [
  "Character Info",
  "Constellation",
  "Species",
  "History",
  "Career",
  "Stats",
  "Review",
];

export const STAT_NAMES: StatName[] = [
  "PS",
  "PA",
  "PR",
  "MS",
  "MA",
  "MR",
  "SS",
  "SA",
  "SR",
];

export const STAT_ABBR: Record<StatName, string> = {
  PS: "Physical Strength",
  PA: "Physical Agility",
  PR: "Physical Resilience",
  MS: "Mental Strength",
  MA: "Mental Agility",
  MR: "Mental Resilience",
  SS: "Social Strength",
  SA: "Social Agility",
  SR: "Social Resilience",
};

export function statModifier(val: number): string {
  const mod = Math.floor((val - 10) / 2);
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export function isStepComplete(step: number, data: CharData): boolean {
  switch (step) {
    case 0:
      return !!(data.name && data.pronouns && data.age && data.appearance);
    case 1:
      return !!data.constellation;
    case 2:
      return !!(data.species && data.newsoul);
    case 3:
      return !!data.history;
    case 4:
      return !!data.career;
    case 5:
      return STAT_NAMES.every((s) => data.stats[s] > 0);
    default:
      return true;
  }
}
