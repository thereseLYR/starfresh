export type SelectionItem = {
  name: string;
  flavourText: string;
  desc: string;
  symbol?: string;
};

export default function SelectionGrid({
  items,
  selected,
  onSelect,
}: {
  items: SelectionItem[];
  selected: string;
  onSelect: (name: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((item) => {
        const active = selected === item.name;
        return (
          <button
            key={item.name}
            onClick={() => onSelect(item.name)}
            className={`text-left p-4 rounded border transition-all ${
              active
                ? "border-gold bg-gold/10"
                : "border-gold/25 hover:border-gold/55 hover:bg-gold/5"
            }`}
          >
            <div className="flex items-start gap-3">
              {item.symbol && (
                <span className="text-xl text-gold shrink-0 mt-0.5 w-6 text-center">
                  {item.symbol}
                </span>
              )}
              <div>
                <div
                  className={`font-semibold text-sm mb-1 ${active ? "text-gold" : "text-gold/80"}`}
                >
                  {item.name}
                </div>
                <div className="text-gold/60 text-xs leading-relaxed">
                  {item.desc}
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
