type GoldDividerProps = {
  muted?: boolean;
};

export default function GoldDivider({ muted = false }: GoldDividerProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span
        className={`block h-px ${muted ? "w-12 bg-gold/25" : "w-16 bg-gold"}`}
      />
      <span className={muted ? "text-gold/65" : "text-gold"}>◆</span>
      <span
        className={`block h-px ${muted ? "w-12 bg-gold/25" : "w-16 bg-gold"}`}
      />
    </div>
  );
}
