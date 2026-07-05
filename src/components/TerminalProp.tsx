"use client";

import { useEffect, useRef, useState } from "react";
import { TerminalSquare } from "lucide-react";
import EducationStatsModal from "@/components/EducationStatsModal";
import DisclaimerModal from "@/components/DisclaimerModal";

const BOOT_LINES = [
  "[ OK ] Starting visual simulation module...",
  "[ OK ] Loading terminal renderer...",
  "[ OK ] No network connection established.",
  "[ OK ] No files accessed or modified.",
  "[ OK ] Ready. This is a visual prop for an educational video.",
  "Type anything and press Enter.",
];

type HistoryLine = { text: string; type: "boot" | "command" | "response" };

export default function TerminalProp() {
  const [history, setHistory] = useState<HistoryLine[]>([]);
  const [bootDone, setBootDone] = useState(false);
  const [input, setInput] = useState("");
  const [showStats, setShowStats] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Typewriter boot sequence
  useEffect(() => {
    let cancelled = false;
    const runBoot = async () => {
      for (const line of BOOT_LINES) {
        if (cancelled) return;
        await new Promise((r) => setTimeout(r, 350));
        setHistory((h) => [...h, { text: line, type: "boot" }]);
      }
      setBootDone(true);
    };
    runBoot();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history, showStats, showDisclaimer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = input.trim();
    if (!command) return;

    const isNumeric = /^[0-9]+$/.test(command);

    setHistory((h) => [...h, { text: command, type: "command" }]);
    setInput("");

    setTimeout(() => {
      setHistory((h) => [
        ...h,
        {
          text: isNumeric
            ? "Unknown code. Displaying notice..."
            : "Processing simulated command...",
          type: "response",
        },
      ]);
    }, 200);

    setTimeout(() => {
      if (isNumeric) {
        setShowDisclaimer(true);
      } else {
        setShowStats(true);
      }
    }, 900);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="rounded-xl overflow-hidden border border-green-500/30 bg-black/80 shadow-[0_0_40px_-8px_rgba(0,255,128,0.25)]">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border-b border-green-500/20">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-3 flex items-center gap-1.5 text-xs text-green-300/70 font-mono">
            <TerminalSquare size={13} /> visual-terminal-sim
          </span>
        </div>

        {/* Body */}
        <div
          ref={scrollRef}
          className="h-[380px] sm:h-[420px] overflow-y-auto px-4 py-3 font-mono text-sm leading-relaxed [scrollbar-width:thin]"
        >
          {history.map((line, i) => (
            <div
              key={i}
              className={
                line.type === "command"
                  ? "text-green-300"
                  : line.type === "response"
                  ? "text-green-500/70"
                  : "text-green-600/60"
              }
            >
              {line.type === "command" ? (
                <span>
                  <span className="text-green-400">guest@edu-sim:~$ </span>
                  {line.text}
                </span>
              ) : (
                line.text
              )}
            </div>
          ))}

          {bootDone && (
            <form onSubmit={handleSubmit} className="flex items-center mt-1">
              <span className="text-green-400 mr-2">guest@edu-sim:~$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoFocus
                spellCheck={false}
                autoComplete="off"
                className="flex-1 bg-transparent outline-none text-green-200 caret-green-400"
                aria-label="Terminal input"
              />
              <span className="w-2 h-4 bg-green-400 animate-pulse ml-0.5" />
            </form>
          )}
        </div>
      </div>

      <EducationStatsModal open={showStats} onClose={() => setShowStats(false)} />
      <DisclaimerModal open={showDisclaimer} onClose={() => setShowDisclaimer(false)} />
    </div>
  );
}
