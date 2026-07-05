"use client";

export type Gender = "female" | "male";

export default function GenderToggle({
  value,
  onChange,
}: {
  value: Gender;
  onChange: (g: Gender) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-3">
      <button
        onClick={() => onChange("female")}
        className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all border ${
          value === "female"
            ? "bg-rose-500 border-rose-500 text-white shadow-glow scale-105"
            : "bg-transparent border-ink/15 text-ink/50 hover:border-rose-300"
        }`}
      >
        For Her
      </button>
      <button
        onClick={() => onChange("male")}
        className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all border ${
          value === "male"
            ? "bg-[#326fae] border-[#326fae] text-white shadow-[0_8px_30px_-8px_rgba(50,111,174,0.45)] scale-105"
            : "bg-transparent border-ink/15 text-ink/50 hover:border-sky-300"
        }`}
      >
        For Him
      </button>
    </div>
  );
}
