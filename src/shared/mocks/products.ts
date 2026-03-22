/* eslint-disable max-lines */
import type { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 'super-nes',
    name: 'Retro Desktop PC',
    description:
      'Classic 90s desktop computer model set with multiple angles for realistic environment builds.',
    priceCents: 49900,
    imageUrl: '/images/products/retro-pc-04.webp',
    galleryImageUrls: [
      '/images/products/retro-pc-04.webp',
      '/images/products/retro-pc-01.jpg',
      '/images/products/retro-pc-02.jpg',
      '/images/products/retro-pc-03.jpg',
    ],
    details: [
      { label: 'Brand', value: 'RetroTech' },
      { label: 'Year', value: '1995' },
      { label: 'Condition', value: 'Used - Excellent' },
      { label: 'Category', value: 'Desktop Computer' },
      { label: 'Material', value: 'Plastic & Metal' },
      { label: 'Authenticity', value: 'Verified' },
    ],
  },
  {
    id: 'tamagotchi',
    name: 'Tamagotchi Original',
    description:
      'Classic Tamagotchi hero image for compact product cards and nostalgic storefront highlights.',
    priceCents: 12900,
    imageUrl: '/images/products/tamagotchi.png',
    galleryImageUrls: [
      '/images/products/tamagotchi.png',
      '/images/products/tamagotchi-02.png',
      '/images/products/tamagotchi-03.png',
      '/images/products/tamagotchi-04.png',
    ],
    details: [
      { label: 'Brand', value: 'Bandai' },
      { label: 'Year', value: '1996' },
      { label: 'Condition', value: 'Used - Excellent' },
      { label: 'Category', value: 'Virtual Pet' },
      { label: 'Material', value: 'Plastic' },
      { label: 'Compatibility', value: 'Standalone' },
    ],
  },
  {
    id: 'arcade-cabinet',
    name: 'Retro Boombox',
    description:
      'Portable retro boombox with a full gallery for front, side, and detail presentation shots.',
    priceCents: 129900,
    imageUrl: '/images/products/retro-boombox-01.jpg',
    galleryImageUrls: [
      '/images/products/retro-boombox-01.jpg',
      '/images/products/retro-boombox-02.jpg',
      '/images/products/retro-boombox-03.jpg',
      '/images/products/retro-boombox-04.jpg',
    ],
    details: [
      { label: 'Brand', value: 'RetroSound' },
      { label: 'Year', value: '1992' },
      { label: 'Condition', value: 'Refurbished' },
      { label: 'Category', value: 'Boombox' },
      { label: 'Material', value: 'Plastic & Metal' },
      { label: 'Authenticity', value: 'Digitally Restored' },
    ],
  },
  {
    id: 'walkman',
    name: 'Cassette Tape Set',
    description:
      'Gray cassette tape and case set with multiple product angles for marketplace galleries.',
    priceCents: 15900,
    imageUrl: '/images/products/cassette-tape-02.jpg',
    galleryImageUrls: [
      '/images/products/cassette-tape-02.jpg',
      '/images/products/cassette-tape-01.jpg',
      '/images/products/cassette-tape-03.jpg',
      '/images/products/cassette-tape-04.jpg',
    ],
    details: [
      { label: 'Brand', value: 'MagTape' },
      { label: 'Year', value: '1991' },
      { label: 'Condition', value: 'Used - Very Good' },
      { label: 'Category', value: 'Cassette Tape' },
      { label: 'Material', value: 'Plastic' },
      { label: 'Authenticity', value: 'Verified' },
    ],
  },
  {
    id: 'cassette-mixtape',
    name: 'CRT TV',
    description:
      'Sony Trinitron style CRT television with a full image gallery and clean English file naming.',
    priceCents: 4900,
    imageUrl: '/images/products/crt-tv-03.jpg',
    galleryImageUrls: [
      '/images/products/crt-tv-03.jpg',
      '/images/products/crt-tv-01.jpg',
      '/images/products/crt-tv-02.jpg',
      '/images/products/crt-tv-04.jpg',
    ],
    details: [
      { label: 'Brand', value: 'Sony' },
      { label: 'Year', value: '1990s' },
      { label: 'Condition', value: 'Used - Good' },
      { label: 'Category', value: 'CRT Television' },
      { label: 'Material', value: 'Plastic & Glass' },
      { label: 'Authenticity', value: 'Verified' },
    ],
  },
  {
    id: 'vhs-collection',
    name: 'VHS Tapes Collection',
    description:
      'Collection of VHS tapes with multiple photos for storefront cards and detailed gallery browsing.',
    priceCents: 8900,
    imageUrl: '/images/products/vhs-tapes-01.jpg',
    galleryImageUrls: [
      '/images/products/vhs-tapes-01.jpg',
      '/images/products/vhs-tapes-02.jpg',
      '/images/products/vhs-tapes-03.webp',
      '/images/products/vhs-tapes-04.jpg',
    ],
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
    id: 'game-boy-color',
    name: 'SAS Operator',
    description:
      'Biomechanical alien character with all related creature images grouped in the same product gallery.',
    priceCents: 39900,
    imageUrl: '/images/products/swat-operator-01.webp',
    galleryImageUrls: [
      '/images/products/swat-operator-01.webp',
      '/images/products/alien-statue-fanart-3d-model-bd56f37b26.jpg',
      '/images/products/alien-statue-fanart-3d-model-1bb3184571.jpg',
      '/images/products/alien-statue-fanart-3d-model-71e188431d.jpg',
    ],
    details: [
      { label: 'Collection', value: 'Creature Assets' },
      { label: 'Edition', value: 'B' },
      { label: 'Condition', value: 'Mint' },
      { label: 'Category', value: 'Alien Character' },
      { label: 'Material', value: 'Digital Sculpt' },
      { label: 'Compatibility', value: 'Blender, Maya, Unreal, Unity' },
    ],
  },
  {
    id: 'retro-joystick',
    name: 'Alien Warlord',
    description:
      'High-detail alien warrior model built for retro sci-fi scenes, key art, and creature-focused game environments.',
    priceCents: 27900,
    imageUrl: '/images/products/alien-statue-fanart-3d-model-1bb3184571.jpg',
    galleryImageUrls: [
      '/images/products/alien-statue-fanart-3d-model-1bb3184571.jpg',
      '/images/products/alien-statue-fanart-3d-model-bd56f37b26.jpg',
      '/images/products/alien-statue-fanart-3d-model-71e188431d.jpg',
    ],
    details: [
      { label: 'Collection', value: 'Creature Assets' },
      { label: 'Edition', value: 'C' },
      { label: 'Condition', value: 'Mint' },
      { label: 'Category', value: 'Alien Character' },
      { label: 'Material', value: 'Digital Sculpt' },
      { label: 'Authenticity', value: 'Verified 3D Asset' },
    ],
  },
];
