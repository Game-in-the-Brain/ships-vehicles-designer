/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'ms-bg': '#121212','ms-elevated': '#1a1a1a','ms-panel': '#1e1e1e','ms-input': '#2a2a2a',
        'ms-hair': '#333333','ms-cyan': '#00E5FF','ms-cyan-dim': '#00b8cc','ms-ink': '#e0e0e0',
        'ms-ink-soft': '#a0a0a0','ms-ink-dim': '#666666','ms-good': '#4ade80','ms-warn': '#ff7a5a','ms-amber': '#fbbf24',
      },
      fontFamily: { display: ['"Space Grotesk"','sans-serif'], mono: ['"JetBrains Mono"','monospace'] },
    },
  },
  plugins: [],
}
