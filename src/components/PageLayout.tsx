import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { getBackground } from "../util/backgrounds";
import type { BackgroundMetadata } from "../util/backgrounds";
import { BackgroundDescriptor } from "./BackgroundDescriptor";
import { TvLayout } from "./TvOverlay";
import { useSettings } from "../context/SettingsContext";
import tvData from "../../content/tv.json";
import {minsToMs} from "../util/settings.ts";

const TV_BG_INTERVAL_MS = minsToMs(tvData.bgInterval);

export interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout(props: PageLayoutProps) {
  const [background, setBackground] = useState<BackgroundMetadata>(() =>
    getBackground()
  );
  const { bgTimingsMs } = useSettings();

  const isTv = useLocation().pathname === "/tv";
  const intervalMs = isTv ? TV_BG_INTERVAL_MS : bgTimingsMs;

  useEffect(() => {
    if (intervalMs === null) {
      return;
    }

    let cancelled = false;

    const timer = setInterval(() => {
      const next = getBackground(background.id);
      const preload = new Image();
      preload.src = next.url;
      preload.onload = () => {
        if (!cancelled) {
          setBackground(next);
        }
      };
    }, intervalMs);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };

  }, [background.id, intervalMs]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={background.id}
          className="absolute inset-0"
          style={{
            background: `url(${background.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        />
      </AnimatePresence>
      <div className="relative w-full h-full flex justify-center items-center">
        {props.children}
      </div>
      {isTv ? (
        <TvLayout background={background} />
      ) : (
        <BackgroundDescriptor background={background} />
      )}
    </div>
  );
}