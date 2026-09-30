import { FaLocationDot } from "react-icons/fa6";
import type { BackgroundMetadata } from "../util/backgrounds";
import { Clock } from "./Clock";
import { Weather } from "./Weather";

export interface TvLayoutProps {
  background: BackgroundMetadata;
}

export function TvLayout(props: TvLayoutProps) {
  return (
    <>
      <div className="absolute bottom-16 left-16 flex gap-4">
        <Clock />
        <Weather />
      </div>

      <div className="absolute bottom-16 right-16 text-right text-white/90 drop-shadow-lg">
        <div className="flex items-center justify-end gap-2 text-xl font-bold">
          <span>{props.background.name}</span>
          {props.background.localName && (
            <>
                <span>·</span>
                <span>{props.background.localName}</span>
            </>
          )}
          <FaLocationDot />
        </div>
        <div className="mt-1 text-sm font-semibold tabular-nums text-white/70">
          {props.background.lat.toFixed(6)}, {props.background.lon.toFixed(6)}
        </div>
      </div>
    </>
  );
}