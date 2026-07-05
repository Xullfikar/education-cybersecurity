"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, X } from "lucide-react";

const DISCLAIMER_TEXT =
  "This does not contain any cyber attack, for visual education purposes only.";

const BAR_COUNT = 14;

export default function EducationStatsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [count, setCount] = useState(18240);
  const [bars, setBars] = useState<number[]>(() =>
    Array.from({ length: BAR_COUNT }, () => 20 + Math.random() * 30)
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!open) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setCount((c) => c + Math.floor(4 + Math.random() * 37));
      setBars((prev) => {
        const next = prev.slice(1);
        const last = prev[prev.length - 1];
        const trend = Math.max(15, Math.min(100, last + (Math.random() * 20 - 6)));
        next.push(trend);
        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-green-500/40 bg-[#05100a] shadow-[0_0_60px_-10px_rgba(0,255,128,0.35)] px-6 py-7 font-mono"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 text-green-400/60 hover:text-green-300"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 justify-center mb-1">
              <GraduationCap size={18} className="text-green-400" />
              <p className="text-green-400/70 text-[11px] tracking-[0.2em] uppercase">
                Awareness Campaign
              </p>
            </div>
            <p className="text-center text-green-300/90 text-sm mb-4">
              Total People Educated
            </p>

            {/* Animated counter */}
            <p className="text-center text-4xl sm:text-5xl font-bold text-green-300 tabular-nums tracking-tight">
              {count.toLocaleString("en-US")}
            </p>

            {/* Bar chart */}
            <div className="mt-6 flex items-end gap-1 h-24">
              {bars.map((v, i) => (
                <motion.div
                  key={i}
                  animate={{ height: `${v}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-green-600/40 to-green-400/80"
                />
              ))}
            </div>
            <p className="text-center text-green-500/40 text-[11px] mt-2">
              Simulated growth — updates every second
            </p>

            <div className="mt-5 pt-4 border-t border-green-500/15 text-center">
              <p className="text-green-300/80 text-xs leading-relaxed">
                {DISCLAIMER_TEXT}
              </p>
            </div>

            <button
              onClick={onClose}
              className="mt-5 w-full px-5 py-2 rounded-full border border-green-500/50 text-green-300 text-sm hover:bg-green-500/10 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
