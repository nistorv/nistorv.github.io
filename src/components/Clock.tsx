import { useEffect, useState } from "react";
import tvData from "../../content/tv.json";

interface ClockZone {
  label: string;
  timeZone: string;
}

interface TvConfig {
  mainTZ: ClockZone;
  altTZ: ClockZone[];
}

const tvConfig: TvConfig = tvData;

function formatTime(date: Date, timeZone: string, includeSeconds?: boolean): string {
  return date.toLocaleTimeString("en-GB", {
    timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: includeSeconds? "2-digit": undefined,
        hour12: false,
    });
}

export function  Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-white drop-shadow-lg justify-center bg-slate-800/30 p-5 border-2 border-white">
      <div className="text-8xl font-bold tabular-nums leading-none">
        {formatTime(now, tvConfig.mainTZ.timeZone, true)}
      </div>
      <div className="mt-1 text-sm text-center font-semibold text-white/80">{tvConfig.mainTZ.label}</div>
        <div className="mt-4 flex gap-6 justify-center">
            {tvConfig.altTZ.map((zone) => (
              <div key={zone.timeZone}>
                  <div className="text-2xl text-center font-bold tabular-nums">
                      {formatTime(now, zone.timeZone)}
                  </div>
                  <div className="text-xs text-center font-semibold text-white/80">{zone.label}</div>
              </div>
            ))}
        </div>
    </div>
  );
}
