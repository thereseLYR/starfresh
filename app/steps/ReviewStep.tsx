"use client";

import StepIntro from "@/app/components/StepIntro";
import { useCharacter } from "@/app/context/CharacterContext";
import { CharData, STAT_ABBR, STAT_NAMES, statModifier } from "@/app/lib/types";
import { useState } from "react";

// ── Export helpers ────────────────────────────────────────────────────────────

function toBase64Url(str: string): string {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16)),
    ),
  )
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function makeShareUrl(data: CharData): string {
  const header = toBase64Url(JSON.stringify({ alg: "none", typ: "JWT" }));
  const payload = toBase64Url(JSON.stringify(data));
  const token = `${header}.${payload}.`;
  const base = typeof window !== "undefined" ? window.location.origin : "";
  return `${base}/character/import?c=${token}`;
}

function downloadJson(data: CharData): void {
  const filename = `Starfresh-PioneerData-${data.name || "character"}.json`;
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Export panel ──────────────────────────────────────────────────────────────

function ExportPanel({ data }: { data: CharData }) {
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = async () => {
    const url = shareUrl ?? makeShareUrl(data);
    setShareUrl(url);
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-10 pt-6 border-t border-gold/20 space-y-3">
      <p className="text-gold/50 text-[10px] tracking-[0.3em] uppercase mb-4">
        Export
      </p>

      {/* PDF */}
      <button
        onClick={() => window.print()}
        className="btn-gold w-full py-3.5 border border-gold text-gold text-sm font-semibold tracking-[0.2em] uppercase rounded"
      >
        ✦ &nbsp;Export as PDF&nbsp; ✦
      </button>

      {/* URL */}
      <div className="space-y-2">
        <button
          onClick={handleCopyUrl}
          className="w-full py-3 border border-gold/30 text-gold/70 text-sm rounded hover:border-gold/55 hover:text-gold transition-colors"
        >
          {copied ? "Copied!" : "Export as URL"}
        </button>
        {shareUrl && (
          <button
            onClick={handleCopyUrl}
            title="Click to copy"
            className="w-full text-left px-3 py-2.5 rounded border border-gold/20 bg-panel/50 text-gold/45 text-[11px] font-mono break-all leading-relaxed hover:text-gold/65 hover:border-gold/35 transition-colors animate-expand-down"
          >
            {shareUrl}
          </button>
        )}
      </div>

      {/* JSON */}
      <button
        onClick={() => downloadJson(data)}
        className="w-full py-3 border border-gold/30 text-gold/70 text-sm rounded hover:border-gold/55 hover:text-gold transition-colors"
      >
        Export as JSON
      </button>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="review-row flex items-baseline justify-between py-3 border-b border-gold/15">
      <span className="text-gold/60 text-xs tracking-[0.15em] uppercase">
        {label}
      </span>
      <span className="text-gold text-sm font-medium max-w-[60%] text-right">
        {value || "—"}
      </span>
    </div>
  );
}

export default function ReviewStep() {
  const { data } = useCharacter();

  return (
    <div id="print-content">
      <StepIntro>
        Review your character before finalizing. When you're satisfied, export
        as a PDF to save your sheet.
      </StepIntro>

      <div className="space-y-8">
        <section>
          <h2 className="text-gold text-xs tracking-[0.25em] uppercase font-semibold mb-1 pb-2 border-b border-gold/20">
            Identity
          </h2>
          <ReviewRow label="Name" value={data.name} />
          <ReviewRow label="Pronouns" value={data.pronouns} />
          <ReviewRow label="Age" value={data.age} />
          <ReviewRow label="Appearance" value={data.appearance} />
        </section>

        <section>
          <h2 className="text-gold text-xs tracking-[0.25em] uppercase font-semibold mb-1 pb-2 border-b border-gold/20">
            Background
          </h2>
          <ReviewRow label="Constellation" value={data.constellation} />
          <ReviewRow label="Species" value={data.species} />
          <ReviewRow label="History" value={data.history} />
          <ReviewRow label="Career" value={data.career} />
        </section>

        <section>
          <h2 className="text-gold text-xs tracking-[0.25em] uppercase font-semibold mb-1 pb-2 border-b border-gold/20">
            Attributes
          </h2>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {STAT_NAMES.map((stat) => (
              <div
                key={stat}
                className="border border-gold/25 rounded p-3 text-center"
              >
                <div className="text-gold/60 text-xs mb-1">
                  {STAT_ABBR[stat]}
                </div>
                <div className="text-gold font-bold text-2xl tabular-nums">
                  {data.stats[stat]}
                </div>
                <div className="text-gold/60 text-xs font-mono">
                  {statModifier(data.stats[stat])}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <ExportPanel data={data} />
    </div>
  );
}
