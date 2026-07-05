import { Sparkle } from "lucide-react";
import EducationDashboard from "@/components/EducationDashboard";

export const metadata = {
  title: "GlowBeauty — Awareness Education",
};

export default function EducationPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-slate-100 via-slate-50 to-white">
      <header className="w-full px-5 py-4 sm:px-8 sm:py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="grid place-items-center w-9 h-9 rounded-full bg-slate-800 text-white">
            <Sparkle size={18} strokeWidth={2.2} />
          </span>
          <span className="font-display italic text-2xl sm:text-3xl tracking-tight text-slate-800">
            Glow<span className="not-italic font-medium">Beauty</span>
          </span>
        </div>
        <p className="hidden sm:block text-xs tracking-[0.2em] uppercase text-slate-400 font-medium">
          Awareness Program
        </p>
      </header>
      <section className="flex-1 flex items-center justify-center px-4 py-10">
        <EducationDashboard />
      </section>
    </main>
  );
}
