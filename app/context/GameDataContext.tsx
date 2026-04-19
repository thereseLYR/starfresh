"use client";

import { SingleCardData } from "@/app/lib/gameData";
import { createContext, useContext } from "react";

export type GameData = {
  constellations: SingleCardData[];
  species: SingleCardData[];
  histories: SingleCardData[];
  careers: SingleCardData[];
};

const GameDataContext = createContext<GameData | null>(null);

export function GameDataProvider({
  children,
  gameData,
}: {
  children: React.ReactNode;
  gameData: GameData;
}) {
  return (
    <GameDataContext.Provider value={gameData}>
      {children}
    </GameDataContext.Provider>
  );
}

export function useGameData(): GameData {
  const ctx = useContext(GameDataContext);
  if (!ctx) throw new Error("useGameData must be used inside GameDataProvider");
  return ctx;
}
