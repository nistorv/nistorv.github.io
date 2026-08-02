import { createContext, useContext, useState, useMemo } from "react";
import type { ReactNode } from "react";
import { timings, loadBgImageSwitching, saveBgImageSwitching } from "../util/settings";

interface SettingsContextValue {
  bgTimingsIndex: number;
  setBgTimingsIndex: (index: number) => void;
  bgTimingsMs: number | null;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(
  undefined
);

export function SettingsProvider(props: { children: ReactNode }) {
  const [bgTimingsIndex, setBgTimingsIndexState] = useState<number>(() =>
    loadBgImageSwitching()
  );

  const setBgTimingsIndex = (index: number) => {
    setBgTimingsIndexState(index);
    saveBgImageSwitching(index);
  };

  const value = useMemo<SettingsContextValue>(
    () => ({
      bgTimingsIndex,
      setBgTimingsIndex,
      bgTimingsMs: timings[bgTimingsIndex].ms,
    }),
    [bgTimingsIndex]
  );

  return (
    <SettingsContext.Provider value={value}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}