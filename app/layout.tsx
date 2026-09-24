import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const title =
  "ERA Residence — Contemporary Mediterranean Residences in Estepona";
const description =
  "Boutique residences on the New Golden Mile combining contemporary architecture, natural materials and resort-style living near Marbella and Estepona.";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: title,
  description,
  url: "/",
  inLanguage: "en",
  mainEntity: {
    "@type": "ApartmentComplex",
    name: "ERA Residence",
    description:
      "A boutique gated community of 25 residences on Costa del Sol, designed around privacy, wellbeing and timeless Mediterranean living.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Avenida Litoral",
      addressLocality: "Estepona",
      addressRegion: "Málaga",
      postalCode: "29680",
      addressCountry: "ES",
    },
    geo: {
      "@type": "Place",
      name: "New Golden Mile, Estepona",
    },
    numberOfAccommodationUnits: 25,
    amenityFeature: [
      "Saltwater Swimming Pool",
      "Children's Pool",
      "Sauna",
      "Jacuzzi",
      "Wellness Shower",
      "Spa & Gym",
      "Gated Community",
      "Parking with EV Charging Pre-installation",
    ].map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    containsPlace: [
      {
        "@type": "Accommodation",
        name: "Ground Floor + Basement",
        numberOfRooms: 3,
        floorSize: {
          "@type": "QuantitativeValue",
          minValue: 178,
          maxValue: 202,
          unitCode: "MTK",
        },
      },
      {
        "@type": "Accommodation",
        name: "Ground Floor",
        numberOfRooms: 2,
        floorSize: {
          "@type": "QuantitativeValue",
          minValue: 97,
          maxValue: 104,
          unitCode: "MTK",
        },
      },
      {
        "@type": "Accommodation",
        name: "Penthouse Duplex",
        numberOfRooms: {
          "@type": "QuantitativeValue",
          minValue: 2,
          maxValue: 3,
        },
        floorSize: {
          "@type": "QuantitativeValue",
          minValue: 124,
          maxValue: 243,
          unitCode: "MTK",
        },
      },
    ],
    telephone: "+34655408648",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.era-residence.com"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "ERA Residence",
    type: "website",
    images: [
      {
        url: "/assets/img/6a39f0aba46d0d055c0476ff_open-graph.webp",
        width: 2400,
        height: 1260,
        alt: "ERA Residence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/assets/img/6a39f0aba46d0d055c0476ff_open-graph.webp"],
  },
  icons: {
    icon: "/assets/img/6a068e91270853940feb77b8_fav_512x512.png",
    apple: "/assets/img/6a068e91270853940feb77b8_fav_512x512.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-wf-domain="www.era-residence.com"
      data-wf-page="6a068da7ad91b057365bf968"
      data-wf-site="6a068da7ad91b057365bf967"
      className="h-full antialiased"
    >
      <body className="body min-h-full">
        {children}
        <Script
          id="typekit"
          src="https://use.typekit.net/pig8glj.js"
          strategy="beforeInteractive"
        />
        <Script id="typekit-init" strategy="beforeInteractive">
          {"try{Typekit.load();}catch(error){}"}
        </Script>
        <Script
          id="era-structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
