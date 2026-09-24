export type ThemeName = "color" | "light" | "dark";

export type MediaAsset = {
  src: string;
  poster?: string;
  alt: string;
};

export type FeatureSlide = {
  id: string;
  title: string;
  description: string;
  caption: string;
  image: MediaAsset;
};

export type ApartmentType = {
  id: string;
  title: string;
  bedrooms: string;
  area: string;
  image: MediaAsset;
  href: string;
};

export type Amenity = {
  id: string;
  label: string;
  image: MediaAsset;
};

export type ProjectDetail = {
  id: string;
  label: string;
  content: string;
};

export type LocationPoint = {
  id: string;
  title: string;
  distance: string;
  description: string;
};

export type GalleryItem = MediaAsset & {
  id: string;
};

export type NavigationItem = {
  label: string;
  href: string;
};
