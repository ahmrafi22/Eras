import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";

type LabelVariant = "nav" | "link" | "item";

type AnimatedLabelProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  label: ReactNode;
  variant?: LabelVariant;
  className?: string;
};

export function AnimatedLabel({
  href,
  label,
  variant = "nav",
  className = "",
  ...props
}: AnimatedLabelProps) {
  if (variant === "link") {
    return (
      <Link
        href={href}
        className={`link w-inline-block ${className}`}
        hover-link=""
        {...props}
      >
        <div className="link_label">
          <div className="link_label_text">
            <div className="h6" hover="text">
              {label}
            </div>
          </div>
          <div className="link_label_text is-2">
            <div className="h6" hover="text">
              {label}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`nav-item w-inline-block ${className}`}
      hover-nav-item={variant === "item" ? "" : undefined}
      hover-nav-item-l2={variant === "nav" ? "" : undefined}
      {...props}
    >
      <div className="nav-item_label">
        <div className="nav-item_label_text" hover="text">
          {label}
        </div>
        <div className="nav-item_label_text is-2" hover="text">
          {label}
        </div>
      </div>
    </Link>
  );
}
