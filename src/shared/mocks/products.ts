import type { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 'tamagotchi',
    name: 'Tamagotchi Original',
    description:
      'Low-poly 3D asset of the iconic egg-shaped virtual pet—perfect for 90s bedroom scenes, mall nostalgia renders, and retro UI mockups.',
    priceCents: 12900,
    imageUrl: '/images/products/tamagotchi.png',
    details: [
      { label: 'Brand', value: 'Bandai' },
      { label: 'Year', value: '1996' },
      { label: 'Condition', value: 'Used - Good' },
      { label: 'Category', value: 'Virtual Pet' },
      { label: 'Material', value: 'Plastic' },
      { label: 'Authenticity', value: 'Verified' },
    ],
  },
  {
    id: 'game-boy-color',
    name: 'Game Boy Color',
    description:
      'Game-ready handheld model with chunky buttons and that translucent plastic sheen—drop it into any 90s dorm or bus-ride still life.',
    priceCents: 39900,
    imageUrl: '/images/products/game-boy-color.jpg',
    details: [
      { label: 'Brand', value: 'Nintendo' },
      { label: 'Year', value: '1998' },
      { label: 'Condition', value: 'Mint' },
      { label: 'Category', value: 'Handheld Console' },
      { label: 'Material', value: 'Plastic' },
      { label: 'Compatibility', value: 'Game Boy & GBC cartridges' },
    ],
  },
  {
    id: 'super-nes',
    name: 'Super Nintendo',
    description:
      'Hero prop: the gray 16-bit slab with purple sliders—ideal for living-room setups, CRT TV stacks, and “Saturday morning” 3D dioramas.',
    priceCents: 49900,
    imageUrl: '/images/products/super-nes.jpg',
    details: [
      { label: 'Brand', value: 'Nintendo' },
      { label: 'Year', value: '1990' },
      { label: 'Condition', value: 'Used - Excellent' },
      { label: 'Category', value: 'Home Console' },
      { label: 'Material', value: 'Plastic' },
      { label: 'Authenticity', value: 'Verified' },
    ],
  },
  {
    id: 'arcade-cabinet',
    name: 'Arcade 90s Cabinet',
    description:
      'Full upright cabinet mesh with marquee glow and stick layout—your go-to asset for neon arcade halls and fighting-game fever dreams.',
    priceCents: 129900,
    imageUrl: '/images/products/arcade-cabinet.jpg',
    details: [
      { label: 'Brand', value: 'Retro Arcade Co.' },
      { label: 'Year', value: '1993' },
      { label: 'Condition', value: 'Refurbished' },
      { label: 'Category', value: 'Arcade Cabinet' },
      { label: 'Material', value: 'Wood & Metal' },
      { label: 'Authenticity', value: 'Restored Original' },
    ],
  },
  {
    id: 'walkman',
    name: 'Walkman Cassette Player',
    description:
      'Compact portable player 3D model—headphones, hinge detail, tape door—built for sidewalk sketches and “before Spotify” mood boards.',
    priceCents: 15900,
    imageUrl: '/images/products/walkman.jpg',
    details: [
      { label: 'Brand', value: 'Sony' },
      { label: 'Year', value: '1994' },
      { label: 'Condition', value: 'Used - Very Good' },
      { label: 'Category', value: 'Cassette Player' },
      { label: 'Material', value: 'Plastic & Metal' },
      { label: 'Authenticity', value: 'Verified' },
    ],
  },
  {
    id: 'vhs-collection',
    name: '90s VHS Classics Collection',
    description:
      'Stack of labeled clamshell cases and tapes—PBR-friendly plastic and paper labels for shelf clutter, video-store aisles, or basement rec rooms.',
    priceCents: 8900,
    imageUrl: '/images/products/vhs-collection.jpg',
    details: [
      { label: 'Brand', value: 'Mixed Studios' },
      { label: 'Year', value: '1990s' },
      { label: 'Condition', value: 'Used - Good' },
      { label: 'Category', value: 'VHS Collection' },
      { label: 'Material', value: 'Plastic & Paper' },
      { label: 'Authenticity', value: 'Original Covers' },
    ],
  },
  {
    id: 'cassette-mixtape',
    name: 'Mixtape',
    description:
      'Hand-labeled cassette prop with handwritten sticker energy—pair with boomboxes and skate-park renders for peak 90s mixtape culture.',
    priceCents: 4900,
    imageUrl: '/images/products/cassette-mixtape.jpg',
    details: [
      { label: 'Brand', value: 'Custom' },
      { label: 'Year', value: '1990s' },
      { label: 'Condition', value: 'Used - Good' },
      { label: 'Category', value: 'Cassette Tape' },
      { label: 'Material', value: 'Plastic & Magnetic Tape' },
      { label: 'Authenticity', value: 'Hand-labeled' },
    ],
  },
  {
    id: 'retro-joystick',
    name: 'Transparent Retro Joystick',
    description:
      'See-through shell gamepad mesh—late-90s LAN party aesthetic, colored guts visible through the plastic, ready for desk clutter or esports nostalgia shots.',
    priceCents: 7900,
    imageUrl: '/images/products/retro-joystick.jpg',
    details: [
      { label: 'Brand', value: 'RetroX' },
      { label: 'Year', value: '1998' },
      { label: 'Condition', value: 'Used - Excellent' },
      { label: 'Category', value: 'Joystick' },
      { label: 'Material', value: 'Transparent Plastic' },
      { label: 'Compatibility', value: 'PC & Classic Consoles' },
    ],
  },
];
