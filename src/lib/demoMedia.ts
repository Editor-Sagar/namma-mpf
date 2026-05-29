import heroImage from "@/assets/hero-wedding.jpg";

// Demo gallery — replace with real client uploads once backend is wired.
export type GalleryPhoto = {
  id: string;
  title: string;
  src: string;
  width: number;
  height: number;
};

export type Film = {
  id: string;
  title: string;
  duration: string;
  poster: string;
  src: string;
  description: string;
};

const unsplash = (id: string, w = 1600, h = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

export const demoPhotos: GalleryPhoto[] = [
  { id: "p1", title: "The First Look",        src: unsplash("photo-1519741497674-611481863552"),  width: 1600, height: 1067 },
  { id: "p2", title: "Mehendi Hands",         src: unsplash("photo-1583939003579-730e3918a45a"),  width: 1200, height: 1600 },
  { id: "p3", title: "Garland Exchange",      src: unsplash("photo-1604017011826-d3b4c23f8914"),  width: 1600, height: 1067 },
  { id: "p4", title: "Sacred Vows",           src: unsplash("photo-1606800052052-a08af7148866"),  width: 1600, height: 1067 },
  { id: "p5", title: "Bridal Portrait",       src: unsplash("photo-1594552072238-5c4a26f10ed1"),  width: 1200, height: 1600 },
  { id: "p6", title: "Family Blessings",      src: unsplash("photo-1511285560929-80b456fea0bc"),  width: 1600, height: 1067 },
  { id: "p7", title: "Candle-lit Mandap",     src: unsplash("photo-1465495976277-4387d4b0b4c6"),  width: 1600, height: 1067 },
  { id: "p8", title: "Joy in Motion",         src: unsplash("photo-1469371670807-013ccf25f16a"),  width: 1600, height: 1067 },
  { id: "p9", title: "Sangeet Night",         src: unsplash("photo-1530023367847-a683933f4172"),  width: 1600, height: 1067 },
  { id: "p10", title: "Floral Whispers",      src: unsplash("photo-1519225421980-715cb0215aed"),  width: 1200, height: 1600 },
  { id: "p11", title: "Golden Hour",          src: unsplash("photo-1525258946800-98cfd641d0de"),  width: 1600, height: 1067 },
  { id: "p12", title: "The Ring",             src: unsplash("photo-1606216794074-735e91aa2c92"),  width: 1600, height: 1067 },
];

export const demoFilms: Film[] = [
  {
    id: "f1",
    title: "The Wedding Film",
    description: "A cinematic retelling of the entire day — from haldi to vidaai.",
    duration: "08:24",
    poster: heroImage,
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: "f2",
    title: "Traditional Ceremony",
    description: "The sacred rituals captured in full, preserved exactly as they unfolded.",
    duration: "12:10",
    poster: unsplash("photo-1606800052052-a08af7148866"),
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: "f3",
    title: "Sangeet Highlights",
    description: "Music, dance and laughter — every spark of the evening in motion.",
    duration: "05:47",
    poster: unsplash("photo-1530023367847-a683933f4172"),
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
];
