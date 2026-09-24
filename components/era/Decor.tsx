import type { HTMLAttributes } from "react";

const mediumVariant =
  "w-variant-db77920b-274b-9558-1ced-34e87f5b7d94";

type DecorProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "medium";
};

const frames = [
  { name: "frame_l-tb", x1: "50%", y1: "0%", x2: "50%", y2: "100%" },
  { name: "frame_lt", x1: "0%", y1: "100%", x2: "100%", y2: "0%" },
  { name: "frame_t-lr", x1: "0%", y1: "50%", x2: "100%", y2: "50%" },
  { name: "frame_rt", x1: "0%", y1: "0%", x2: "100%", y2: "100%" },
  { name: "frame_r-tb", x1: "50%", y1: "0%", x2: "50%", y2: "100%" },
  { name: "frame_rb", x1: "0%", y1: "100%", x2: "100%", y2: "0%" },
  { name: "frame_b-lr", x1: "0%", y1: "50%", x2: "100%", y2: "50%" },
  { name: "frame_lb", x1: "0%", y1: "0%", x2: "100%", y2: "100%" },
] as const;

export function Decor({
  className = "",
  variant = "default",
  ...props
}: DecorProps) {
  return (
    <div className={className} {...props}>
      {frames.map((frame) => (
        <div
          className={`${frame.name} w-embed${variant === "medium" ? ` ${mediumVariant}` : ""}`}
          key={frame.name}
        >
          <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1={frame.x1}
              x2={frame.x2}
              y1={frame.y1}
              y2={frame.y2}
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
