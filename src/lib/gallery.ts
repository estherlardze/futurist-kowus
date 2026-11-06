export interface GalleryImage {
  src: string;
  title: string;
  large?: boolean;
  wide?: boolean;
  tall?: boolean;
}

export const gallery: GalleryImage[] = [
  { src: "/images/m1.jpeg", title: "Keynote Address — Environmental Justice Forum, 2025", large: true },
  { src: "/images/m2.jpeg", title: "Wacam Community Engagement" },
  { src: "/images/m3.jpeg", title: "ADR Practitioners' Conference" },
  { src: "/images/m5.jpeg", title: "International Transport Workers' Federation, Geneva", wide: true },
  { src: "/images/m4.jpeg", title: "Ghana TUC Leadership Summit", tall: true },
  { src: "/images/m6.jpeg", title: "Book Launch — The Wanderer's Poems, 2024", tall: true },
  { src: "/images/m7.jpeg", title: "Captured moment", large: true },
];

export const familyGallery: GalleryImage[] = [
  { src: "/images/fam1.jpeg", title: "Keynote Speech, 2025" },
  { src: "/images/fam2.jpeg", title: "Financial Workshop" },
  { src: "/images/fam3.jpeg", title: "Team Discussion" },
  { src: "/images/fam4.jpeg", title: "Conference Networking" },
  { src: "/images/fam5.jpeg", title: "Leadership Roundtable" },
  { src: "/images/fam6.jpeg", title: "Public Engagement Session" },
];
