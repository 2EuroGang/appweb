export type PropertyBadge = 'gold' | 'premium' | 'boost';
export type PropertyDeal = 'sale' | 'rent';

export type Property = {
  id: string;
  title: string;
  location: string;
  priceLabel: string;
  areaLabel: string;
  roomsLabel: string;
  typeLabel: string;
  badge?: PropertyBadge;
  deal: PropertyDeal;
  isFavorite?: boolean;
  imageUrl?: string;
};
