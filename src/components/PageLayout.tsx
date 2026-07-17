import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getBackground } from "../util/backgrounds";
import type { BackgroundMetadata } from "../util/backgrounds";
import { BackgroundDescriptor } from "./BackgroundDescriptor";

export interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout(props: PageLayoutProps) {
  const [background, setBackground] = useState<BackgroundMetadata>(() =>
    getBackground()
  );

  useEffect(() => {
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
    }, 60000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [background.id]);

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
      <BackgroundDescriptor background={background} />
    </div>
  );
}