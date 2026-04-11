export type SingleCardData = {
  name: string;
  flavourText: string;
  symbol?: string;
  imageUrl?: string;
  body?: string;
};

export const CONSTELLATIONS: SingleCardData[] = [
  {
    name: "The Fool",
    symbol: "✦",
    flavourText: "Chaos favours the bold",
    body: 'Minor: PA +1 · MA +1\nMajor: Gain skill "Unpredictable Step" at level 5\nIn Domain: PA +2 · MA +2\nIn Opposition: PA +0 · MA +0',
  },
  {
    name: "The Magician",
    symbol: "◈",
    flavourText: "Every tool is an extension of will",
    body: 'Minor: Tool-based checks +2\nMajor: Gain skill "Master\'s Touch" at level 5\nIn Domain: Tool-based checks +4\nIn Opposition: Tool-based checks +0',
  },
  {
    name: "The High Priestess",
    symbol: "⚔",
    flavourText: "Truth hides in shadows",
    body: 'Minor: MR +1 · SR +1\nMajor: Gain skill "Veiled Sight" at level 5\nIn Domain: MR +2 · SR +2\nIn Opposition: MR +0 · SR +0',
  },
  {
    name: "The Empress",
    symbol: "⟁",
    flavourText: "Growth comes to all who seek it",
    body: 'Minor: MR +1 · SR +1\nMajor: Gain skill "Veiled Sight" at level 5\nIn Domain: MR +2 · SR +2\nIn Opposition: MR +0 · SR +0',
  },
  {
    name: "The Emperor",
    symbol: "◯",
    flavourText: "Authority from confidence",
    body: 'Minor: PS +1 · SS +1\nMajor: Gain skill "Command Presence" at level 5\nIn Domain: PS +2 · SS +2\nIn Opposition: PS +0 · SS +0',
  },
  {
    name: "The Hierophant",
    symbol: "★",
    flavourText: "Knowledge multiplies when shared",
    body: 'Minor: Recall Knowledge +2\nMajor: Gain skill "Share Wisdom" at level 5\nIn Domain: Recall Knowledge +4\nIn Opposition: Recall Knowledge +0',
  },
  {
    name: "The Lovers",
    symbol: "⋈",
    flavourText: "Two hearts beat as one",
    body: 'Minor: SA +1 · SS +1\nMajor: Gain skill "Perfect Partnership" at level 5\nIn Domain: SA +2 · SS +2\nIn Opposition: SA +0 · SS +0',
  },
  {
    name: "The Chariot",
    symbol: "♔",
    flavourText: "Forward, always forward",
    body: 'Minor: PA +1 · PS +1\nMajor: Gain skill "Unstoppable Advance" at level 5\nIn Domain: PA +2 · PS +2\nIn Opposition: PA +0 · PS +0',
  },
  {
    name: "Strength",
    symbol: "⛤",
    flavourText: "Power needs no subtlety",
    body: 'Minor: PA +1 · PS +1\nMajor: Gain skill "Iron Will" at level 5\nIn Domain: PA +2 · PS +2\nIn Opposition: PA +0 · PS +0',
  },
  {
    name: "The Hermit",
    symbol: "🕯",
    flavourText: "Wisdom comes in silence",
    body: 'Minor: MS +1 · MR +1\nMajor: Gain skill "Perfect Solitude" at level 5\nIn Domain: MS +2 · MR +2\nIn Opposition: MS +0 · MR +0',
  },
  {
    name: "Wheel of Fortune",
    symbol: "⎈",
    flavourText: "Fortune favours the blessed",
    body: 'Minor: Gain skill "Fatewalker"\nMajor: Gain skill "Fate\'s Hand" at level 5',
  },
  {
    name: "Justice",
    symbol: "⚖",
    flavourText: "Truth cannot hide",
    body: 'Minor: Discern Truth +2\nMajor: Gain skill "Truth\'s Voice" at level 5\nIn Domain: Discern Truth +4\nIn Opposition: Discern Truth +0',
  },
  {
    name: "The Hanged Man",
    symbol: "⤧",
    flavourText: "Through sacrifice comes strength",
    body: 'Minor: PR +1 · MR +1\nMajor: Gain skill "Martyr\'s Gift" at level 5\nIn Domain: PR +2 · MR +2\nIn Opposition: PR +0 · MR +0',
  },
  {
    name: "Death",
    symbol: "☠",
    flavourText: "Death is not the end",
    body: 'Minor: Wounds +1\nMajor: Gain skill "Final Defiance" at level 5\nIn Domain: Wounds +2\nIn Opposition: Wounds +0',
  },
  {
    name: "Temperance",
    symbol: "⚗",
    flavourText: "Stability is strength",
    body: 'Minor: PR +1 · SR +1\nMajor: Gain skill "Perfect Balance" at level 5\nIn Domain: PR +2 · SR +2\nIn Opposition: PR +0 · SR +0',
  },
  {
    name: "The Devil",
    symbol: "⛓",
    flavourText: "Every soul has its price",
    body: 'Minor: Deceive +2\nMajor: Gain skill "Tempter\'s Voice" at level 5\nIn Domain: Deceive +4\nIn Opposition: Deceive +0',
  },
  {
    name: "The Tower",
    symbol: "⛩",
    flavourText: "All walls fall",
    body: 'Minor: PA +1 · MA +1\nMajor: Gain skill "Shattering Blow" at level 5\nIn Domain: PA +2 · MA +2\nIn Opposition: PA +0 · MA +0',
  },
  {
    name: "The Star",
    symbol: "✶",
    flavourText: "The path is never dark",
    body: 'Minor: MA +1 · SA +1\nMajor: Gain skill "Hope\'s Light" at level 5\nIn Domain: MA +2 · SA +2\nIn Opposition: MA +0 · SA +0',
  },
  {
    name: "The Moon",
    symbol: "🌙",
    flavourText: "Reality bends in darkness",
    body: 'Minor: Hide +2\nMajor: Gain skill "Shadow\'s Grace" at level 5\nIn Domain: Hide +4\nIn Opposition: Hide +0',
  },
  {
    name: "The Sun",
    symbol: "☀",
    flavourText: "Truth burns bright",
    body: 'Minor: Perceive +2\nMajor: Gain skill "Revealing Light" at level 5\nIn Domain: Perceive +4\nIn Opposition: Perceive +0',
  },
  {
    name: "Judgement",
    symbol: "📯",
    flavourText: "Justice strikes true",
    body: 'Minor: Threat Assessment +2 · Gain skill "Threat Assessment"\nMajor: Gain skill "Final Verdict" at level 5\nIn Domain: Threat Assessment +4\nIn Opposition: Threat Assessment +0',
  },
  {
    name: "The World",
    symbol: "🌍",
    flavourText: "All things connect",
    body: 'Minor: SS +1 · SA +1\nMajor: Gain skill "Universal Harmony" at level 5\nIn Domain: SS +2 · SA +2\nIn Opposition: SS +0 · SA +0',
  },
];

export const SPECIES: SingleCardData[] = [
  {
    name: "Terau",
    imageUrl: "/species-images/species-terau.png",
    flavourText: "Children of Old Earth, scattered across the stars",
    body: 'Faction: —\nEffects: MR +1 · SR +1 · Gain skill "Exchange Student"',
  },
  {
    name: "Ranau",
    imageUrl: "/species-images/species-ranau.png",
    flavourText: "Warriors of scale and claw, bound by honour",
    body: 'Faction: —\nEffects: Defense +2 · Gain skill "Stake on Honour"',
  },
  {
    name: "Kilerau",
    imageUrl: "/species-images/species-kilerau.png",
    flavourText: "Tri-legged innovators with compound wisdom",
    body: 'Faction: —\nEffects: PR -2 · Perceive +2 · Gain skill "Perfect Recall"',
  },
  {
    name: "Yvetrau",
    imageUrl: "/species-images/species-yvetrau-white.png",
    flavourText: "Six-limbed philosophers of the stellar winds",
    body: 'Faction: —\nEffects: PR +1 · MR +1 · Gain skill "Sixth Sense"',
  },
  {
    name: "Gilean",
    imageUrl: "/species-images/species-gilean.png",
    flavourText: "The many-armed architects of harmony",
    body: 'Faction: —\nEffects: SS +1 · MS +1 · Gain skill "Vocal Mimicry" · Gain skill "Solarsynthesis"',
  },
  {
    name: "Wurefon",
    imageUrl: "/species-images/species-wurefon.png",
    flavourText: "Regenerative masters of adaptation",
    body: 'Faction: —\nEffects: SA +1 · Gain skill "Adapt" · Gain skill "Amphibious"',
  },
  {
    name: "Qutalon",
    imageUrl: "/species-images/species-qutalon.png",
    flavourText: "Shell-armored observers of the infinite",
    body: 'Faction: —\nEffects: PR +1 · MA +1 · Gain skill "Practiced Modder" · Gain skill "Amphibious"',
  },
  {
    name: "Seeledon",
    imageUrl: "/species-images/species-seeledon.png",
    flavourText: "Predator-born guardians of the deep",
    body: 'Faction: —\nEffects: MR +1 · SR +1 · Gain skill "Pack Tactics" · Gain skill "Amphibious"',
  },
];

export const HISTORY: SingleCardData[] = [
  {
    name: "Chef",
    symbol: "⚗",
    flavourText:
      "Specializes in preparing meals and maintaining the culinary arts.",
  },
  {
    name: "Soldier",
    symbol: "⚔",
    flavourText:
      "Skilled in designing, building, and maintaining technology and machinery.",
  },
  {
    name: "Researcher",
    symbol: "◈",
    flavourText:
      "Dedicates themselves to the pursuit of knowledge and scientific discovery.",
  },
  {
    name: "Performer",
    symbol: "♜",
    flavourText:
      "Expresses creativity and entertains others through various artistic mediums.",
  },
  {
    name: "Miner",
    symbol: "⛏",
    flavourText: "Skilled in extracting and processing minerals and resources.",
  },
  {
    name: "Diplomat",
    symbol: "⚖",
    flavourText:
      "Skilled in negotiating and maintaining relationships between different parties.",
  },
  {
    name: "Engineer",
    symbol: "⚙",
    flavourText:
      "Skilled in designing, building, and maintaining technology and machinery.",
  },
  {
    name: "Counsellor",
    symbol: "⟁",
    flavourText: "Skilled in providing guidance and support to others.",
  },
  {
    name: "Monk",
    symbol: "◯",
    flavourText:
      "Dedicated to spiritual growth and enlightenment through discipline and meditation.",
  },
  {
    name: "Athelete",
    symbol: "⛤",
    flavourText:
      "Trained in physical fitness and competitive sports, excelling in strength, agility, and endurance.",
  },
  {
    name: "Labourer",
    symbol: "⚒",
    flavourText:
      "Skilled in manual work and physical tasks, contributing to construction, maintenance, and various forms of labor.",
  },
  {
    name: "Scholar",
    symbol: "★",
    flavourText:
      "Dedicated to academic pursuits and intellectual growth, specializing in research, analysis, and the pursuit of knowledge.",
  },
  {
    name: "Merchant",
    symbol: "⋈",
    flavourText:
      "Skilled in trade and commerce, facilitating the exchange of goods and services.",
  },
  {
    name: "Explorer",
    symbol: "✦",
    flavourText:
      "Skilled in navigating and exploring new territories and environments.",
  },
  {
    name: "Leader",
    symbol: "♔",
    flavourText:
      "Skilled in guiding and inspiring others, taking charge of groups and organizations.",
  },
  {
    name: "Pilot",
    symbol: "⎈",
    flavourText:
      "Skilled in operating and navigating spacecraft and other vehicles.",
  },
  {
    name: "Philosopher",
    symbol: "⤧",
    flavourText:
      "Dedicated to the pursuit of wisdom and understanding, contemplating the nature of existence and reality.",
  },
  {
    name: "Mystic",
    symbol: "✶",
    flavourText:
      "Dedicated to exploring the mysteries of the universe and the spiritual realm, seeking enlightenment and transcendence.",
  },
  {
    name: "Detective",
    symbol: "◉",
    flavourText: "Skilled in investigating crimes and solving mysteries.",
  },
  {
    name: "Artist",
    symbol: "⛩",
    flavourText:
      "Skilled in creating and expressing ideas through various artistic mediums.",
  },
];
