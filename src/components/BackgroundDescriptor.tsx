import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { AnimatePresence } from "framer-motion";
import type { BackgroundMetadata } from "../util/backgrounds";
import { IoSettingsSharp } from "react-icons/io5";
import { SettingsPanel } from "./SettingsPanel";

export interface BackgroundDescriptorProps {
  background: BackgroundMetadata;
}

export function BackgroundDescriptor(props: BackgroundDescriptorProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="absolute bottom-4 right-4 text-sm text-white/75 flex items-center">
      <a
        className="flex items-center gap-2 hover:text-white"
        href={`https://www.google.com/maps?q=loc:${props.background.lat},${props.background.lon}`}
      >
        <span>{props.background.name}</span>
        {props.background.localName && (
          <>
            <span>·</span>
            <span>{props.background.localName}</span>
          </>
        )}
        <FaLocationDot />
      </a>
      <div className="relative ml-2">
        <IoSettingsSharp
          className="hover:text-white hover:cursor-pointer"
          onClick={() => setSettingsOpen((open) => !open)}
        />
        <AnimatePresence>
          {settingsOpen && <SettingsPanel />}
        </AnimatePresence>
      </div>
    </div>
  );
}