"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Download,
  RefreshCcw,
  RotateCcw,
  ShieldAlert,
  Video,
} from "lucide-react";
import { FILTERS } from "@/lib/filters";

type Status = "idle" | "requesting" | "streaming" | "denied" | "unsupported";

export default function CameraStudio() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [activeFilter, setActiveFilter] = useState(FILTERS[1].id);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [photo, setPhoto] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);

  const currentFilter = FILTERS.find((f) => f.id === activeFilter) ?? FILTERS[0];

  const stopStream = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const startStream = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setStatus("unsupported");
      return;
    }
    setStatus("requesting");
    try {
      stopStream();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setStatus("streaming");
    } catch (err) {
      console.error(err);
      setStatus("denied");
    }
  }, [facingMode, stopStream]);

  // draw loop: paints the live video frame onto canvas with the selected CSS filter applied
  useEffect(() => {
    if (status !== "streaming") return;

    const draw = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (video && canvas && video.videoWidth > 0) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
          }
          ctx.save();
          if (facingMode === "user") {
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
          }
          ctx.filter = currentFilter.css;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          ctx.restore();
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [status, currentFilter, facingMode]);

  useEffect(() => {
    return () => stopStream();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCapture = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setFlash(true);
    setTimeout(() => setFlash(false), 250);
    setPhoto(canvas.toDataURL("image/png"));
  };

  const handleSwitchCamera = () => {
    setFacingMode((m) => (m === "user" ? "environment" : "user"));
  };

  useEffect(() => {
    if (status === "streaming") {
      startStream();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode]);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto px-4 pb-10">
      {/* Viewport */}
      <div
        className="relative w-full aspect-[3/4] rounded-[2rem] overflow-hidden bg-ink ring-1"
        style={{
          boxShadow: `0 8px 30px -8px var(--accent-glow)`,
          borderColor: "var(--accent-300)",
        }}
      >
        <video ref={videoRef} playsInline muted className="hidden" />
        <canvas
          ref={canvasRef}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            status === "streaming" ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Flash effect on capture */}
        <AnimatePresence>
          {flash && (
            <motion.div
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-white pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Idle / permission states */}
        {status !== "streaming" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-8 bg-gradient-to-b from-ink to-[#1a1620] text-white">
            {status === "denied" ? (
              <>
                <ShieldAlert size={36} className="text-rose-300" />
                <p className="font-display italic text-lg">Camera access denied</p>
                <p className="text-sm text-white/60">
                  Allow camera access in your browser settings, then try again.
                </p>
              </>
            ) : status === "unsupported" ? (
              <>
                <ShieldAlert size={36} className="text-rose-300" />
                <p className="font-display italic text-lg">Camera not supported</p>
                <p className="text-sm text-white/60">
                  This browser doesn&apos;t support camera access.
                </p>
              </>
            ) : (
              <>
                <span className="grid place-items-center w-14 h-14 rounded-full bg-white/10">
                  <Video size={26} />
                </span>
                <p className="font-display italic text-lg">Your camera studio</p>
                <p className="text-sm text-white/60">
                  Turn on your camera to try beauty filters live.
                </p>
              </>
            )}
            <button
              onClick={startStream}
              disabled={status === "requesting"}
              className="mt-2 px-6 py-2.5 rounded-full text-white transition-colors text-sm font-semibold disabled:opacity-60"
              style={{ background: "var(--accent-500)" }}
            >
              {status === "requesting" ? "Requesting access..." : "Turn On Camera"}
            </button>
          </div>
        )}

        {/* Switch camera button */}
        {status === "streaming" && (
          <button
            onClick={handleSwitchCamera}
            aria-label="Switch camera"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 backdrop-blur text-white grid place-items-center hover:bg-black/50 transition-colors"
          >
            <RefreshCcw size={16} />
          </button>
        )}

        {/* Filter name label */}
        {status === "streaming" && (
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/30 backdrop-blur text-white text-xs font-medium tracking-wide">
            {currentFilter.name}
          </div>
        )}
      </div>

      {/* Filter strip */}
      {status === "streaming" && (
        <div className="w-full">
          <div className="flex gap-3 overflow-x-auto pb-2 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {FILTERS.map((f) => {
              const isActive = f.id === activeFilter;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className="flex flex-col items-center gap-1.5 shrink-0"
                >
                  <span
                    className="relative w-14 h-14 rounded-full grid place-items-center transition-all"
                    style={{
                      background: f.swatch,
                      boxShadow: isActive
                        ? `0 0 0 2px var(--accent-500), 0 0 14px 2px var(--accent-glow)`
                        : "none",
                      transform: isActive ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                  <span
                    className="text-[11px] font-medium"
                    style={{ color: isActive ? "var(--accent-600)" : undefined }}
                  >
                    {f.name}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-center text-xs text-ink/40 mt-1">{currentFilter.description}</p>
        </div>
      )}

      {/* Capture button with pulsing ring-light glow */}
      {status === "streaming" && (
        <div className="relative">
          <span
            className="absolute inset-0 rounded-full animate-ping"
            style={{ background: "var(--accent-400)", opacity: 0.5 }}
          />
          <span
            className="absolute -inset-3 rounded-full border animate-pulse"
            style={{ borderColor: "var(--accent-300)" }}
          />
          <button
            onClick={handleCapture}
            aria-label="Take photo"
            className="relative w-16 h-16 rounded-full bg-white ring-4 grid place-items-center active:scale-95 transition-transform"
            style={{
              boxShadow: `0 8px 30px -8px var(--accent-glow)`,
              ["--tw-ring-color" as string]: "var(--accent-500)",
            }}
          >
            <Camera size={22} style={{ color: "var(--accent-600)" }} />
          </button>
        </div>
      )}

      {/* Captured photo overlay */}
      <AnimatePresence>
        {photo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-sm flex flex-col items-center justify-center gap-5 p-6"
          >
            <p className="font-display italic text-white text-xl">Your shot ✨</p>
            <img
              src={photo}
              alt="Captured photo with filter applied"
              className="max-h-[65vh] rounded-2xl shadow-2xl ring-1 ring-white/10"
            />
            <div className="flex gap-3">
              <a
                href={photo}
                download={`glowbeauty-${currentFilter.id}.png`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold transition-colors"
                style={{ background: "var(--accent-500)" }}
              >
                <Download size={16} /> Save
              </a>
              <button
                onClick={() => setPhoto(null)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors"
              >
                <RotateCcw size={16} /> Retake
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
