"use client";

import { useEffect, useRef, useState } from "react";
import { TerminalSquare } from "lucide-react";
import EducationStatsModal from "@/components/EducationStatsModal";
import DisclaimerModal from "@/components/DisclaimerModal";

const BOOT_LINES = [
  "[ OK ] Initializing Security Analysis Console...",
  "[ OK ] Loading educational ransomware dataset...",
  "[ OK ] Safe Mode Enabled.",
  "[ OK ] No local files accessed.",
  "[ OK ] No network activity detected.",
  "[ OK ] System Ready.",
];

type HistoryLine = {
  text: string;
  type: "boot" | "command" | "response";
};

export default function TerminalProp() {
  const [history, setHistory] = useState<HistoryLine[]>([]);
  const [bootDone, setBootDone] = useState(false);
  const [input, setInput] = useState("");
  const [showStats, setShowStats] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const boot = async () => {
      for (const line of BOOT_LINES) {
        if (cancelled) return;

        await new Promise((r) => setTimeout(r, 450));

        setHistory((h) => [...h, { text: line, type: "boot" }]);
      }

      setBootDone(true);
    };

    boot();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [history]);

  const addResponse = (text: string, delay: number) => {
    setTimeout(() => {
      setHistory((h) => [...h, { text, type: "response" }]);
    }, delay);
  };

  const runProgress = (callback?: () => void) => {
    const bars = [
      "[████................] 20%",
      "[████████............] 40%",
      "[████████████........] 60%",
      "[████████████████....] 80%",
      "[████████████████████] 100%",
    ];

    bars.forEach((bar, index) => {
      addResponse(bar, 400 * (index + 1));
    });

    if (callback) {
      setTimeout(callback, 2500);
    }
  };

  const handleCommand = (command: string) => {
    switch (command.toLowerCase()) {
      case "help":
        addResponse("", 100);
        addResponse("Available Commands", 200);
        addResponse("----------------------------", 300);
        addResponse("help      Show command list", 400);
        addResponse("stats     Open ransomware statistics", 500);
        addResponse("analyze   Analyze awareness dataset", 600);
        addResponse("scan      Run safe environment scan", 700);
        addResponse("about     About this simulator", 800);
        addResponse("clear     Clear terminal", 900);
        break;

      case "stats":
        addResponse("Loading ransomware awareness statistics...", 300);
        addResponse("Preparing dashboard...", 700);

        runProgress(() => {
          addResponse("Dashboard ready.", 0);
          setShowStats(true);
        });

        break;

      case "analyze":
        addResponse("Analyzing educational dataset...", 300);
        addResponse("Comparing historical incident trends...", 700);

        runProgress(() => {
          addResponse(
            "Analysis completed successfully. No local data was accessed.",
            0
          );

          setShowStats(true);
        });

        break;

      case "scan":
        addResponse("Scanning educational environment...", 300);

        runProgress(() => {
          addResponse("", 0);
          addResponse("Results", 100);
          addResponse("----------------------------", 200);
          addResponse("✓ No suspicious activity detected.", 300);
          addResponse("✓ No files accessed.", 400);
          addResponse("✓ No network communication detected.", 500);
          addResponse("✓ Environment is safe.", 600);
        });

        break;

      case "about":
        addResponse("Security Analysis Console", 200);
        addResponse("Educational Cyber Awareness Simulator", 500);
        addResponse("Purpose: Demonstrate ransomware awareness.", 800);
        addResponse("No files are modified or encrypted.", 1100);

        break;

      case "clear":
        setHistory([]);
        break;

      default:
        if (/^[0-9]+$/.test(command)) {
          addResponse("Checking reference ID...", 300);
          addResponse("Reference not found.", 700);
          addResponse("Displaying educational notice...", 1100);

          setTimeout(() => {
            setShowDisclaimer(true);
          }, 1700);
        } else {
          addResponse("Unknown command.", 300);
          addResponse("Type 'help' to view available commands.", 700);
        }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const command = input.trim();

    if (!command) return;

    setHistory((h) => [...h, { text: command, type: "command" }]);

    setInput("");

    handleCommand(command);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="rounded-xl overflow-hidden border border-green-500/30 bg-black/80 shadow-[0_0_40px_-8px_rgba(0,255,128,0.25)]">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border-b border-green-500/20">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />

          <span className="ml-3 flex items-center gap-2 text-xs text-green-300 font-mono">
            <TerminalSquare size={14} />
            Security Analysis Console
          </span>
        </div>

        <div
          ref={scrollRef}
          className="h-[420px] overflow-y-auto px-4 py-3 font-mono text-sm"
        >
          {history.map((line, index) => (
            <div
              key={index}
              className={
                line.type === "boot"
                  ? "text-green-600"
                  : line.type === "command"
                  ? "text-green-300"
                  : "text-green-500"
              }
            >
              {line.type === "command" ? (
                <>
                  <span className="text-green-400">
                    analyst@security-lab:~$
                  </span>{" "}
                  {line.text}
                </>
              ) : (
                line.text
              )}
            </div>
          ))}

          {bootDone && (
            <form onSubmit={handleSubmit} className="flex mt-2">
              <span className="text-green-400 mr-2">
                analyst@security-lab:~$
              </span>

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoFocus
                autoComplete="off"
                spellCheck={false}
                className="flex-1 bg-transparent outline-none text-green-200 caret-green-400"
              />

              <span className="animate-pulse">█</span>
            </form>
          )}
        </div>
      </div>

      <EducationStatsModal
        open={showStats}
        onClose={() => setShowStats(false)}
      />

      <DisclaimerModal
        open={showDisclaimer}
        onClose={() => setShowDisclaimer(false)}
      />
    </div>
  );
}