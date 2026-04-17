import { CharacterProvider } from "@/app/context/CharacterContext";

export default function CharacterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CharacterProvider>{children}</CharacterProvider>;
}
