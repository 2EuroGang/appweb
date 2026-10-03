export type PropertyBadge = 'gold' | 'premium' | 'boost';

export type Property = {
  id: string;
  title: string;
  location: string;
  priceLabel: string;
  areaLabel: string;
  roomsLabel: string;
  typeLabel: string;
  badge?: PropertyBadge;
  isFavorite?: boolean;
};
