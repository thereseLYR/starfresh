import { CharacterProvider } from "@/app/context/CharacterContext";
import { GameDataProvider } from "@/app/context/GameDataContext";
import { SanityLive } from "@/sanity/lib/live";
import { fetchAllGameData } from "@/sanity/lib/queries";

export default async function CharacterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gameData = await fetchAllGameData();

  return (
    <GameDataProvider gameData={gameData}>
      <CharacterProvider>{children}</CharacterProvider>
      <SanityLive />
    </GameDataProvider>
  );
}
