import { FaLocationDot } from "react-icons/fa6";
import type { BackgroundMetadata } from "../util/backgrounds";

export interface BackgroundDescriptorProps {
  background: BackgroundMetadata;
}

export function BackgroundDescriptor(props: BackgroundDescriptorProps) {
  return (
    <div className="absolute bottom-4 right-4 text-sm text-white/75">
      <a
        className="flex items-center gap-2 hover:text-white"
        href={`www.google.com/maps?q=loc:${props.background.lat},${props.background.lon}`}
      >
        <FaLocationDot />
        <span>{props.background.name}</span>
        {props.background.localName && (
          <>
            <span>·</span>
            <span>{props.background.localName}</span>
          </>
        )}
      </a>
    </div>
  );
}
