import { useEffect, useRef, useState } from "react";

export interface DeckCard {
  name: string;
  flavourText: string;
  detail: React.ReactNode;
  symbol?: string;
}

interface CardDeckProps {
  cards: DeckCard[];
  selected: string | null;
  onSelect: (name: string | null) => void;
}

export default function CardDeck({ cards, selected, onSelect }: CardDeckProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [insertAfterIdx, setInsertAfterIdx] = useState(-1);

  // Close detail panel when selection is cleared externally
  useEffect(() => {
    if (!selected) setInsertAfterIdx(-1);
  }, [selected]);

  // Close detail panel on resize (row layout changes)
  useEffect(() => {
    const onResize = () => setInsertAfterIdx(-1);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleClick = (name: string, idx: number) => {
    // Toggle off
    if (selected === name) {
      onSelect(null);
      return;
    }

    // Determine which row this card is in and find the last card in that row
    const el = cardRefs.current[idx];
    let lastInRow = idx;

    if (el) {
      const clickedTop = el.getBoundingClientRect().top;
      for (let i = idx + 1; i < cardRefs.current.length; i++) {
        const sibling = cardRefs.current[i];
        if (!sibling) continue;
        // Cards in the same flex row share (approximately) the same top value
        if (Math.abs(sibling.getBoundingClientRect().top - clickedTop) <= 4) {
          lastInRow = i;
        } else {
          break;
        }
      }
    }

    setInsertAfterIdx(lastInRow);
    onSelect(name);
  };

  const selectedCard = selected ? cards.find((c) => c.name === selected) : null;

  return (
    <div className="flex flex-wrap gap-3 justify-between">
      {cards.map((card, i) => {
        const isSelected = card.name === selected;

        console.log("card:", card);

        return (
          <div key={card.name} className="contents">
            {/* ── Card ── */}
            <div
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              onClick={() => handleClick(card.name, i)}
              className={`group relative w-36 h-52 rounded-lg border cursor-pointer overflow-hidden shrink-0 transition-[border-color,box-shadow] duration-300 ${
                isSelected
                  ? "border-gold shadow-[0_0_16px_rgba(224,199,135,0.2)]"
                  : "border-gold/20 hover:border-gold/45"
              }`}
            >
              {/* Default background */}
              <div className="absolute inset-0 bg-dark-green" />

              {/* Hover/selected fill — slides in from left */}
              <div
                className={`absolute inset-0 bg-panel origin-left transition-transform ${
                  isSelected
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
                style={{ transitionDuration: "350ms" }}
              />

              {/* Card content */}
              <div className="relative z-10 flex flex-col h-full p-4">
                {/* Top pip */}
                <div
                  className={`text-[10px] transition-colors duration-300 ${
                    isSelected
                      ? "text-gold/50"
                      : "text-gold/15 group-hover:text-gold/40"
                  }`}
                >
                  ◆
                </div>

                {/* Name — always visible, centered */}
                <div className="flex-1 flex items-center justify-center">
                  <span
                    className={`text-sm font-semibold text-center leading-snug transition-colors duration-200 ${
                      isSelected
                        ? "text-gold"
                        : "text-gold/75 group-hover:text-gold"
                    }`}
                  >
                    {card.name}
                  </span>
                </div>

                {/* Flavour text — visible on hover or when selected */}
                <div
                  className={`transition-opacity duration-200 ${
                    isSelected
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100 delay-150"
                  }`}
                  style={{ transitionDelay: isSelected ? "0ms" : undefined }}
                >
                  {card.flavourText && (
                    <p className="text-gold/55 text-[11px] italic leading-snug text-center">
                      {card.flavourText}
                    </p>
                  )}
                </div>

                {/* Bottom pip */}
                <div
                  className={`text-[10px] self-end rotate-180 transition-colors duration-300 ${
                    isSelected
                      ? "text-gold/50"
                      : "text-gold/15 group-hover:text-gold/40"
                  }`}
                >
                  ◆
                </div>
              </div>
            </div>

            {/* ── Detail panel — injected after the last card in the selected row ── */}
            {i === insertAfterIdx && selectedCard && (
              <div className="w-full overflow-hidden animate-expand-down">
                <div className="mt-1 mb-1 p-5 rounded-lg border border-gold/30 bg-panel/70">
                  {selectedCard.detail}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
