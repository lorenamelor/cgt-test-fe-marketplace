export type ProductId =
  | 'tamagotchi'
  | 'game-boy-color'
  | 'super-nes'
  | 'arcade-cabinet'
  | 'walkman'
  | 'vhs-collection'
  | 'cassette-mixtape'
  | 'retro-joystick';

export type Product = {
  id: ProductId;
  name: string;
  description: string;
  priceCents: number;
  imageUrl: string;
};

export const products: Product[] = [
  {
    id: 'tamagotchi',
    name: 'Tamagotchi Original',
    description:
      'Low-poly 3D asset of the iconic egg-shaped virtual pet—perfect for 90s bedroom scenes, mall nostalgia renders, and retro UI mockups.',
    priceCents: 12900,
    imageUrl: '/images/products/tamagotchi.png',
  },
  {
    id: 'game-boy-color',
    name: 'Game Boy Color',
    description:
      'Game-ready handheld model with chunky buttons and that translucent plastic sheen—drop it into any 90s dorm or bus-ride still life.',
    priceCents: 39900,
    imageUrl: '/images/products/game-boy-color.jpg',
  },
  {
    id: 'super-nes',
    name: 'Super Nintendo',
    description:
      'Hero prop: the gray 16-bit slab with purple sliders—ideal for living-room setups, CRT TV stacks, and “Saturday morning” 3D dioramas.',
    priceCents: 49900,
    imageUrl: '/images/products/super-nes.jpg',
  },
  {
    id: 'arcade-cabinet',
    name: 'Arcade 90s Cabinet',
    description:
      'Full upright cabinet mesh with marquee glow and stick layout—your go-to asset for neon arcade halls and fighting-game fever dreams.',
    priceCents: 129900,
    imageUrl: '/images/products/arcade-cabinet.jpg',
  },
  {
    id: 'walkman',
    name: 'Walkman Cassette Player',
    description:
      'Compact portable player 3D model—headphones, hinge detail, tape door—built for sidewalk sketches and “before Spotify” mood boards.',
    priceCents: 15900,
    imageUrl: '/images/products/walkman.jpg',
  },
  {
    id: 'vhs-collection',
    name: '90s VHS Classics Collection',
    description:
      'Stack of labeled clamshell cases and tapes—PBR-friendly plastic and paper labels for shelf clutter, video-store aisles, or basement rec rooms.',
    priceCents: 8900,
    imageUrl: '/images/products/vhs-collection.jpg',
  },
  {
    id: 'cassette-mixtape',
    name: 'Mixtape',
    description:
      'Hand-labeled cassette prop with handwritten sticker energy—pair with boomboxes and skate-park renders for peak 90s mixtape culture.',
    priceCents: 4900,
    imageUrl: '/images/products/cassette-mixtape.jpg',
  },
  {
    id: 'retro-joystick',
    name: 'Transparent Retro Joystick',
    description:
      'See-through shell gamepad mesh—late-90s LAN party aesthetic, colored guts visible through the plastic, ready for desk clutter or esports nostalgia shots.',
    priceCents: 7900,
    imageUrl: '/images/products/retro-joystick.jpg',
  },
];
