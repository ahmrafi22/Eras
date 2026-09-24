import type {
  Amenity,
  ApartmentType,
  FeatureSlide,
  GalleryItem,
  LocationPoint,
  NavigationItem,
  ProjectDetail,
} from "./types";

export const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Select an Apartment", href: "/apartments" },
  { label: "Book a call", href: "#" },
  { label: "Contact", href: "/contact" },
] as const satisfies readonly NavigationItem[];

export const featureSlides = [
  {
    id: "real-life-location",
    title: "Real-Life Location",
    description:
      "Nestled between pristine beaches, world-class golf courses and exclusive wellness clubs, Era Residence offers a rare balance of seclusion and seamless access to the finest Mediterranean lifestyle.",
    caption: "Designed as a community, not a complex",
    image: {
      src: "/assets/img/6a150affaf1d8cc969d57dd0_img_cam_02.webp",
      alt: "",
    },
  },
  {
    id: "built-to-stay",
    title: "Built to stay",
    description:
      "Drawing on the spirit of Marbella's golden age, the design blends modern architecture with natural materials, lush landscaping and thoughtfully crafted spaces.",
    caption: "Designed as a community, not a complex",
    image: {
      src: "/assets/img/6a150bbc2a39862be04f2cd5_era-residence-terrace.webp",
      alt: "",
    },
  },
  {
    id: "boutique-concept",
    title: "Boutique concept",
    description:
      "A boutique gated community of 25 residences on Costa del Sol, designed around privacy, wellbeing and timeless Mediterranean living.",
    caption: "Designed as a community, not a complex",
    image: {
      src: "/assets/img/6a150cc2f810e37eec2ea963_era-residence-garden.webp",
      alt: "",
    },
  },
] as const satisfies readonly FeatureSlide[];

export const apartmentTypes = [
  {
    id: "ground-floor-basement",
    title: "Ground floor + basement",
    bedrooms: "3",
    area: "178 — 202 m²",
    image: {
      src: "/assets/img/6a1514d7c27920c70252da1f_era-residence-ground-floor-basement.webp",
      alt: "",
    },
    href: "/apartments?type=ground-floor-basement",
  },
  {
    id: "ground-floor",
    title: "Ground Floor",
    bedrooms: "2",
    area: "97 — 104 m²",
    image: {
      src: "/assets/img/6a1575f46655e8c4e795ec64_era-residence-landscaping.webp",
      alt: "",
    },
    href: "/apartments?type=ground-floor",
  },
  {
    id: "penthouse-duplex",
    title: "Penthouse duplex",
    bedrooms: "2-3",
    area: "124 — 243 m²",
    image: {
      src: "/assets/img/6a15153b797c328a9f2f5964_era-residence-terrace.webp",
      alt: "",
    },
    href: "/apartments?type=penthouse-duplex",
  },
] as const satisfies readonly ApartmentType[];

export const amenities = [
  {
    id: "gated-community",
    label: "Gated community",
    image: {
      src: "/assets/img/6a1512e5b24991c76981118b_era-residence-gated-community.webp",
      alt: "",
    },
  },
  {
    id: "swimming-pool-2",
    label: "Swimming Pool",
    image: {
      src: "/assets/img/6a151264dc1dcca76fda17d9_era-residence-pool.webp",
      alt: "",
    },
  },
  {
    id: "swimming-pool",
    label: "Parking area",
    image: {
      src: "/assets/img/6a1573fc640c344ee0705819_era-residence-parking.webp",
      alt: "",
    },
  },
  {
    id: "spa-gym",
    label: "Spa & gym",
    image: {
      src: "/assets/img/6a15132fe66907986a254201_era-residence-spa-&-gym.webp",
      alt: "",
    },
  },
  {
    id: "landscaping",
    label: "Landscaping",
    image: {
      src: "/assets/img/6a151382fb101ce2ca9db288_era-residence-landscaping.webp",
      alt: "",
    },
  },
] as const satisfies readonly Amenity[];

export const projectDetails = [
  {
    id: "developer",
    label: "Developer",
    content: "Swiss Technology S.L.",
  },
  {
    id: "sales-marketing",
    label: "Sales & Marketing",
    content: "Unreal Estate Group",
  },
  {
    id: "license-obtained",
    label: "License obtained",
    content:
      "The project holds all required permits and an active construction license. All documentation is publicly available. Construction is already underway — visit the site in person or follow progress via our live online stream.",
  },
  {
    id: "2026",
    label: "2026",
    content:
      "Currently under construction. The first phase of construction is underway, with ongoing development of the apartments and communal areas. Potential buyers can anticipate a modern living space upon completion of the build.",
  },
] as const satisfies readonly ProjectDetail[];

export const locationPoints = [
  {
    id: "gibraltar",
    title: "GIBRALTAR",
    distance: "50 MIN",
    description: "",
  },
  {
    id: "estepona",
    title: "ESTEPONA",
    distance: "10 MIN",
    description: "",
  },
  {
    id: "kempinski",
    title: "KEMPINSKI",
    distance: "5 MIN",
    description: "",
  },
  {
    id: "puerto-banus",
    title: "PUERTO BANUS",
    distance: "20 MIN",
    description: "",
  },
  {
    id: "marbella",
    title: "MARBELLA",
    distance: "25 MIN",
    description: "",
  },
  {
    id: "malaga-airport",
    title: "MALAGA AIRPORT",
    distance: "45 MIN",
    description: "",
  },
] as const satisfies readonly LocationPoint[];

export const interiorGallery = [
  {
    id: "img-cam-03",
    src: "/assets/img/6a1507fddb26e71ff717c30c_img_cam_03.webp",
    alt: "",
  },
  {
    id: "img-cam-07",
    src: "/assets/img/6a15080748155bc8e151f5ff_img_cam_07.webp",
    alt: "",
  },
  {
    id: "img-cam-09",
    src: "/assets/img/6a150812aefa2e544369d4a6_img_cam_09.webp",
    alt: "",
  },
  {
    id: "era-residence-kitchen",
    src: "/assets/img/6a1575180f248400b7124a46_era-residence-kitchen.webp",
    alt: "",
  },
] as const satisfies readonly GalleryItem[];

export const headerLinks = [
  { label: "Select an Apartment", href: "/apartments" },
  { label: "Book a call", href: "#" },
  { label: "Contact", href: "/contact" },
] as const satisfies readonly NavigationItem[];

export const menuLinks = navigationItems;
