import "react";

declare module "react" {
  interface HTMLAttributes<T> {
    hover?: string;
    "hover-apart-card"?: string;
    "hover-btn"?: string;
    "hover-btn-circle"?: string;
    "hover-card"?: string;
    "hover-img-card"?: string;
    "hover-link"?: string;
    "hover-link-trigger"?: string;
    "hover-media-item"?: string;
    "hover-nav-item"?: string;
    "hover-nav-item-l2"?: string;
    "hover-nav-item-trigger"?: string;
    "hover-pin"?: string;
    "hover-pin-trigger"?: string;
    "hover-select-item"?: string;
    "hover-social"?: string;
    "hover-social-trigger"?: string;
    "floating-tip"?: string;
    "floating-tip-trigger"?: string;
  }
}

export {};
