export type BicycleType = 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric';

export type TBicycle = {
  name: string;
  brand: string;
  price: number;
  type: BicycleType;
  description: string;
  quantity: number;
  inStock: boolean;
};
