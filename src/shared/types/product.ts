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
    description: 'Take care of your pocket virtual pet just like in the 90s.',
    priceCents: 12900,
    imageUrl: '/images/products/tamagotchi.jpg',
  },
  {
    id: 'game-boy-color',
    name: 'Game Boy Color',
    description: 'Classic Nintendo handheld to play Pokémon and other 90s hits.',
    priceCents: 39900,
    imageUrl: '/images/products/game-boy-color.jpg',
  },
  {
    id: 'super-nes',
    name: 'Super Nintendo',
    description: '16-bit console to marathon Mario, Donkey Kong and many more classics.',
    priceCents: 49900,
    imageUrl: '/images/products/super-nes.jpg',
  },
  {
    id: 'arcade-cabinet',
    name: 'Arcade 90s Cabinet',
    description: 'Arcade cabinet loaded with 90s fighting and racing classics.',
    priceCents: 129900,
    imageUrl: '/images/products/arcade-cabinet.jpg',
  },
  {
    id: 'walkman',
    name: 'Walkman Cassette Player',
    description: 'Cassette tape player to listen to your mixtapes anywhere.',
    priceCents: 15900,
    imageUrl: '/images/products/walkman.jpg',
  },
  {
    id: 'vhs-collection',
    name: 'Coleção VHS Clássicos 90s',
    description: 'Box set with iconic 90s movies in original VHS tapes.',
    priceCents: 8900,
    imageUrl: '/images/products/vhs-collection.jpg',
  },
  {
    id: 'cassette-mixtape',
    name: 'Mixtape Cassete Personalizada',
    description: 'Cassette mixtape with a curated selection of 90s hits.',
    priceCents: 4900,
    imageUrl: '/images/products/cassette-mixtape.jpg',
  },
  {
    id: 'retro-joystick',
    name: 'Joystick Retro Transparente',
    description: 'Controller with transparent shell and full late-90s LAN party vibe.',
    priceCents: 7900,
    imageUrl: '/images/products/retro-joystick.jpg',
  },
];
