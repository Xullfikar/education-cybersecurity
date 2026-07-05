export type FilterPreset = {
  id: string;
  name: string;
  description: string;
  // CSS filter string, applied to the canvas 2D context via ctx.filter
  css: string;
  swatch: string; // small gradient used for the thumbnail
};

export const FILTERS: FilterPreset[] = [
  {
    id: "natural",
    name: "Natural",
    description: "No filter — your true look",
    css: "none",
    swatch: "linear-gradient(135deg,#f5f5f5,#e0e0e0)",
  },
  {
    id: "glow",
    name: "Glow",
    description: "Brighter, softer skin",
    css: "brightness(1.08) contrast(1.02) saturate(1.05) blur(0.4px)",
    swatch: "linear-gradient(135deg,#FDE8EE,#F3A6C0)",
  },
  {
    id: "soft-focus",
    name: "Soft Focus",
    description: "Gentle studio-style softness",
    css: "brightness(1.05) contrast(0.96) blur(0.8px) saturate(1.05)",
    swatch: "linear-gradient(135deg,#ffffff,#F9CBDA)",
  },
  {
    id: "radiant",
    name: "Radiant",
    description: "Vivid, glowing color",
    css: "brightness(1.1) saturate(1.3) contrast(1.05)",
    swatch: "linear-gradient(135deg,#FFD9A0,#E85D8A)",
  },
  {
    id: "golden-hour",
    name: "Golden Hour",
    description: "Warm golden tones",
    css: "brightness(1.05) sepia(0.18) saturate(1.2) contrast(1.02)",
    swatch: "linear-gradient(135deg,#F6D399,#D4AF6A)",
  },
  {
    id: "matte",
    name: "Matte",
    description: "Smooth, low-contrast look",
    css: "brightness(1.02) contrast(0.9) saturate(0.95)",
    swatch: "linear-gradient(135deg,#e8e2e6,#c9c1c6)",
  },
  {
    id: "mono",
    name: "Monochrome",
    description: "Classic black and white",
    css: "grayscale(1) contrast(1.05) brightness(1.03)",
    swatch: "linear-gradient(135deg,#f2f2f2,#8a8a8a)",
  },
];
