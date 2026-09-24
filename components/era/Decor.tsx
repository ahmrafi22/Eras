import type { HTMLAttributes } from "react";

export function Decor({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className} {...props}>
      <div className="frame_l-tb w-embed">
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
            x1="50%"
            x2="50%"
            y1="0%"
            y2="100%"
          />
        </svg>
      </div>
      <div className="frame_lt w-embed">
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
            x1="0%"
            x2="100%"
            y1="100%"
            y2="0%"
          />
        </svg>
      </div>
      <div className="frame_t-lr w-embed">
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
            x1="0%"
            x2="100%"
            y1="50%"
            y2="50%"
          />
        </svg>
      </div>
      <div className="frame_rt w-embed">
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
            x1="0%"
            x2="100%"
            y1="0%"
            y2="100%"
          />
        </svg>
      </div>
      <div className="frame_r-tb w-embed">
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
            x1="50%"
            x2="50%"
            y1="0%"
            y2="100%"
          />
        </svg>
      </div>
      <div className="frame_rb w-embed">
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
            x1="0%"
            x2="100%"
            y1="100%"
            y2="0%"
          />
        </svg>
      </div>
      <div className="frame_b-lr w-embed">
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
            x1="0%"
            x2="100%"
            y1="50%"
            y2="50%"
          />
        </svg>
      </div>
      <div className="frame_lb w-embed">
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
            x1="0%"
            x2="100%"
            y1="0%"
            y2="100%"
          />
        </svg>
      </div>
    </div>
  );
}
