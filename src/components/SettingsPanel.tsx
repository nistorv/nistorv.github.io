import { motion } from "framer-motion";
import { timings } from "../util/settings";
import { useSettings } from "../context/SettingsContext";

export function SettingsPanel() {
  const { bgTimingsIndex, setBgTimingsIndex } = useSettings();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className="absolute bottom-full right-0 mb-3 w-64 rounded-lg bg-white/95 p-4 text-slate-800 shadow-lg backdrop-blur"
    >
      <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
        <span>Background timings</span>
        <span className="text-slate-800">{timings[bgTimingsIndex].label}</span>
      </div>
      <input
        type="range"
        min={0}
        max={timings.length - 1}
        step={1}
        value={bgTimingsIndex}
        onChange={(e) => setBgTimingsIndex(Number(e.target.value))}
        className="w-full accent-slate-800"
      />
      <div className="mt-1 flex justify-between text-[10px] text-slate-400">
        <span>Static</span>
        <span>10 sec</span>
      </div>
    </motion.div>
  );
}