import { Sparkle } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full px-5 py-4 sm:px-8 sm:py-5 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span
          className="grid place-items-center w-9 h-9 rounded-full text-white"
          style={{
            background: `linear-gradient(135deg, var(--accent-400), var(--secondary))`,
            boxShadow: `0 8px 30px -8px var(--accent-glow)`,
          }}
        >
          <Sparkle size={18} strokeWidth={2.2} />
        </span>
        <span className="font-display italic text-2xl sm:text-3xl tracking-tight text-ink">
          Glow
          <span className="text-[var(--accent-500)] not-italic font-medium">
            Beauty
          </span>
        </span>
      </div>
      <p className="hidden sm:block text-xs tracking-[0.2em] uppercase text-ink/40 font-medium">
        Camera Studio
      </p>
    </header>
  );
}
