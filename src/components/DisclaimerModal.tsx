"use client";

import { motion, AnimatePresence } from "framer-motion";
import { TerminalSquare, X } from "lucide-react";

const DISCLAIMER_TEXT =
  "This does not contain any cyber attack, for visual education purposes only.";

export default function DisclaimerModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
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
            className="relative w-full max-w-md rounded-2xl border border-green-500/40 bg-[#05100a] shadow-[0_0_60px_-10px_rgba(0,255,128,0.35)] px-6 py-8 text-center font-mono"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 text-green-400/60 hover:text-green-300"
            >
              <X size={18} />
            </button>
            <div className="mx-auto mb-4 w-12 h-12 rounded-full border border-green-500/40 grid place-items-center text-green-400">
              <TerminalSquare size={22} />
            </div>
            <p className="text-green-300 text-base leading-relaxed">
              {DISCLAIMER_TEXT}
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-5 py-2 rounded-full border border-green-500/50 text-green-300 text-sm hover:bg-green-500/10 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
