import MatrixRain from "@/components/MatrixRain";
import TerminalProp from "@/components/TerminalProp";

export const metadata = {
  title: "Visual Terminal Simulation — Educational Prop",
};

export default function TerminalPage() {
  return (
    <main className="relative min-h-screen bg-black flex flex-col items-center justify-center px-4 py-10 overflow-hidden">
      <MatrixRain />
      <div className="relative z-10 w-full flex flex-col items-center gap-6">
        <div className="text-center">
          <h1 className="font-mono text-green-300 text-lg sm:text-xl tracking-widest">
            BEAUTY TERMINAL 
          </h1>
          <p className="text-green-500/50 text-xs font-mono mt-1">
            Prohibited for normal user. 
          </p>
          {/* <p className="text-green-500/30 text-[11px] font-mono mt-1">
            Type a number for a notice, or any other word for the stats view.
          </p> */}
        </div>
        <TerminalProp />
      </div>
    </main>
  );
}
