"use client";

import GoldDivider from "@/app/components/GoldDivider";
import { useCharacter } from "@/app/context/CharacterContext";
import { CharData, isValidCharData } from "@/app/lib/types";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

// ── JWT decode ────────────────────────────────────────────────────────────────

function fromBase64Url(str: string): string {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const raw = atob(padded);
  return decodeURIComponent(
    raw
      .split("")
      .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join(""),
  );
}

function decodeJwt(token: string): unknown {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Invalid JWT format");
  return JSON.parse(fromBase64Url(parts[1]));
}

function extractToken(input: string): string | null {
  const trimmed = input.trim();
  try {
    const url = new URL(trimmed);
    const c = url.searchParams.get("c");
    if (c) return c;
  } catch {}
  if (trimmed.split(".").length === 3) return trimmed;
  return null;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function UrlImport({ onSuccess }: { onSuccess: (data: CharData) => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLoad = () => {
    setError(null);
    const token = extractToken(value);
    if (!token) {
      setError(
        "No valid share URL or token found. Paste the full URL copied from the Export screen.",
      );
      return;
    }
    let payload: unknown;
    try {
      payload = decodeJwt(token);
    } catch {
      setError("Could not decode the token. Make sure you copied the full URL.");
      return;
    }
    if (!isValidCharData(payload)) {
      setError("The token doesn't contain valid Starfresh character data.");
      return;
    }
    onSuccess(payload);
  };

  return (
    <div className="space-y-3">
      <textarea
        value={value}
        onChange={(e) => { setValue(e.target.value); setError(null); }}
        placeholder="Paste your Starfresh share URL here…"
        rows={3}
        className="w-full px-3 py-3 rounded-lg border border-gold/25 bg-panel/50 text-gold/80 text-sm placeholder-gold/25 resize-none focus:outline-none focus:border-gold/50 transition-colors font-mono"
      />
      {error && (
        <p className="text-red-400/80 text-xs leading-relaxed">{error}</p>
      )}
      <button
        onClick={handleLoad}
        disabled={!value.trim()}
        className="btn-gold w-full py-3 border border-gold text-gold text-sm rounded tracking-wide disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Load Character
      </button>
    </div>
  );
}

function JsonImport({ onSuccess }: { onSuccess: (data: CharData) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = (file: File) => {
    setError(null);
    if (!file.name.endsWith(".json")) {
      setError("Please upload a .json file exported from Starfresh.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (!isValidCharData(parsed)) {
          setError("This file doesn't contain valid Starfresh character data.");
          return;
        }
        onSuccess(parsed);
      } catch {
        setError(
          "Could not read the file. Make sure it's a valid JSON file exported from Starfresh.",
        );
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-3">
      <button
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) processFile(f); }}
        className={`w-full py-10 rounded-lg border-2 border-dashed text-sm transition-colors ${
          dragOver
            ? "border-gold/60 bg-gold/5 text-gold"
            : "border-gold/20 text-gold/45 hover:border-gold/40 hover:text-gold/65"
        }`}
      >
        <p className="font-medium mb-1">Drop your file here</p>
        <p className="text-xs opacity-70">or click to browse</p>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".json"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); }}
        className="hidden"
      />
      {error && (
        <p className="text-red-400/80 text-xs leading-relaxed">{error}</p>
      )}
    </div>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────

type Mode = "url" | "json" | null;

export default function ImportScreen() {
  const { update, setStep } = useCharacter();
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(null);

  const handleSuccess = (data: CharData) => {
    update(data);
    setStep(6);
    router.push("/character");
  };

  const toggle = (m: Mode) => setMode((prev) => (prev === m ? null : m));

  return (
    <div className="min-h-screen bg-dark-green flex flex-col">
      <header className="relative shrink-0 py-8 px-6 text-center">
        <p className="text-gold/60 text-xs tracking-[0.35em] uppercase mb-3">
          Starfresh
        </p>
        <h1 className="text-gold text-3xl sm:text-4xl font-bold tracking-tight">
          Import Character
        </h1>
        <div className="mt-4">
          <GoldDivider muted />
        </div>
      </header>

      <main className="flex-1 px-6 pb-12">
        <div className="max-w-2xl mx-auto">
          <p className="text-gold/50 text-sm leading-relaxed mb-6">
            Load a previously exported character to pick up where you left off.
          </p>

          <div className="space-y-3">
            <div className="rounded-lg border border-gold/20 overflow-hidden">
              <button
                onClick={() => toggle("url")}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gold/5 transition-colors"
              >
                <div>
                  <p className="text-gold text-sm font-medium">Import from URL</p>
                  <p className="text-gold/45 text-xs mt-0.5">
                    Paste a share link copied from the Export screen
                  </p>
                </div>
                <span className={`text-gold/40 text-2xl transition-transform duration-200 shrink-0 ml-4 ${mode === "url" ? "rotate-180" : ""}`}>
                  ▾
                </span>
              </button>
              {mode === "url" && (
                <div className="px-5 pb-5 border-t border-gold/15 pt-4 animate-expand-down">
                  <UrlImport onSuccess={handleSuccess} />
                </div>
              )}
            </div>

            <div className="rounded-lg border border-gold/20 overflow-hidden">
              <button
                onClick={() => toggle("json")}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gold/5 transition-colors"
              >
                <div>
                  <p className="text-gold text-sm font-medium">Import from JSON</p>
                  <p className="text-gold/45 text-xs mt-0.5">
                    Upload a .json file exported from Starfresh
                  </p>
                </div>
                <span className={`text-gold/40 text-2xl transition-transform duration-200 shrink-0 ml-4 ${mode === "json" ? "rotate-180" : ""}`}>
                  ▾
                </span>
              </button>
              {mode === "json" && (
                <div className="px-5 pb-5 border-t border-gold/15 pt-4 animate-expand-down">
                  <JsonImport onSuccess={handleSuccess} />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
