/* eslint-disable max-lines */
export type ProductId =
  | 'tamagotchi'
  | 'game-boy-color'
  | 'super-nes'
  | 'arcade-cabinet'
  | 'walkman'
  | 'vhs-collection'
  | 'cassette-mixtape'
  | 'retro-joystick';

export type ProductDetailRow = {
  label: string;
  value: string;
};

export type Product = {
  id: ProductId;
  name: string;
  description: string;
  priceCents: number;
  imageUrl: string;
  galleryImageUrls?: string[];
  details: ProductDetailRow[];
};
export { products } from '../mocks/products';
