"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, GraduationCap, RotateCcw, Sparkles } from "lucide-react";

type Stage = "idle" | "running" | "done";

const STEPS = [
  "Loading awareness material...",
  "Reviewing phishing & fake endorsement tactics...",
  "Reviewing ransomware warning signs...",
  "Reviewing safe download practices...",
  "Finalizing your progress...",
];

export default function EducationDashboard() {
  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleStart = () => {
    setStage("running");
    setProgress(0);
    setStepIndex(0);

    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + (4 + Math.random() * 6));
        const newStepIndex = Math.min(
          STEPS.length - 1,
          Math.floor((next / 100) * STEPS.length)
        );
        setStepIndex(newStepIndex);

        if (next >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setTimeout(() => setStage("done"), 400);
        }
        return next;
      });
    }, 250);
  };

  const handleReset = () => {
    setStage("idle");
    setProgress(0);
    setStepIndex(0);
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl border border-slate-200 bg-white px-6 py-8 sm:px-8 sm:py-10 text-center shadow-[0_12px_40px_-12px_rgba(30,41,59,0.18)]">
      <div className="mx-auto mb-4 w-14 h-14 rounded-full grid place-items-center bg-slate-100 text-slate-600">
        <GraduationCap size={26} />
      </div>

      <h1 className="font-display italic text-xl sm:text-2xl text-slate-800">
        Download Application
      </h1>
      <p className="text-slate-500 text-xs mt-2 max-w-xs mx-auto">
        Applications can be downloaded from various sources, but not all of them are safe. This walkthrough will help you understand the risks associated with downloading applications and how to identify safe sources.
      </p>

      <div className="mt-8">
        <AnimatePresence mode="wait">
          {stage === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <button
                onClick={handleStart}
                className="px-8 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold tracking-wide transition-colors"
              >
                Start Download
              </button>
            </motion.div>
          )}

          {stage === "running" && (
            <motion.div
              key="running"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-left"
            >
              <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-slate-500 to-slate-700"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.2 }}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-slate-500 text-xs">{STEPS[stepIndex]}</p>
                <p className="text-slate-700 text-xs tabular-nums font-medium">
                  {Math.floor(progress)}%
                </p>
              </div>
            </motion.div>
          )}

          {stage === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="flex flex-col items-center gap-3"
            >
              <span className="grid place-items-center w-14 h-14 rounded-full bg-slate-100 text-slate-700">
                <CheckCircle2 size={30} />
              </span>
              <p className="font-display italic text-lg text-slate-800 flex items-center gap-1.5">
                You have successfully completed the download
                <Sparkles size={16} className="text-slate-500" />
              </p>
              <p className="text-slate-500 text-xs max-w-xs">
                Congratulations! You have completed the download process. You are now better equipped to identify safe sources for downloading applications and avoid potential risks.
              </p>
              <button
                onClick={handleReset}
                className="mt-3 flex items-center gap-2 px-5 py-2 rounded-full border border-slate-300 text-slate-600 text-sm hover:bg-slate-50 transition-colors"
              >
                <RotateCcw size={14} /> Restart
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
