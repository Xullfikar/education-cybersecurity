"use client";

import { useState } from "react";
import Header from "@/components/Header";
import CameraStudio from "@/components/CameraStudio";
import GenderToggle, { Gender } from "@/components/GenderToggle";

export default function AppShell() {
  const [gender, setGender] = useState<Gender>("female");

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 ${
        gender === "male" ? "theme-male" : ""
      }`}
      style={{
        background: `linear-gradient(to bottom, var(--bg-mid), var(--bg-soft), #ffffff)`,
      }}
    >
      <Header />
      <section className="flex-1 flex flex-col items-center justify-center pt-2 pb-8 gap-6">
        <div className="text-center px-6">
          <h1 className="font-display italic text-3xl sm:text-4xl text-ink leading-tight">
            Find your{" "}
            <span className="text-[var(--accent-500)] not-italic font-medium">
              glow
            </span>
          </h1>
          <p className="text-sm text-ink/50 mt-2 max-w-sm mx-auto">
            Try beauty filters live from your camera and see the result in real time.
          </p>
        </div>

        <GenderToggle value={gender} onChange={setGender} />

        <CameraStudio />
      </section>
    </div>
  );
}
