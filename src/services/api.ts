import { config } from '../config';
import type { Property } from '../types';

type SearchResponse = {
  items?: unknown[];
  listings?: unknown[];
  results?: unknown[];
};

function asString(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

function asNumber(value: unknown, fallback = 0) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function normalizeProperty(raw: any): Property {
  const id = asString(raw?.id, asString(raw?.slug, String(Math.random())));
  const title = asString(raw?.title, 'Pronë');
  const city = asString(raw?.city);
  const location = asString(raw?.location, asString(raw?.address, city || 'Kosovë'));
  const price = asNumber(raw?.price, asNumber(raw?.price_cents) / 100);
  const currency = asString(raw?.currency, 'EUR');
  const area = asNumber(raw?.area, asNumber(raw?.area_m2));
  const rooms = asNumber(raw?.rooms, asNumber(raw?.bedrooms));
  const typeLabel = asString(raw?.property_type, asString(raw?.type, 'Pronë'));
  const imagePath =
    asString(raw?.cover_image_url) ||
    asString(raw?.image_url) ||
    asString(raw?.coverImageUrl);

  const badgeRaw = asString(raw?.promotion, asString(raw?.badge)).toLowerCase();
  const badge =
    badgeRaw.includes('gold') ? 'gold' :
    badgeRaw.includes('premium') ? 'premium' :
    badgeRaw.includes('boost') ? 'boost' :
    undefined;

  const rent = ['rent', 'qira', 'rental'].includes(asString(raw?.deal_type, asString(raw?.listing_type)).toLowerCase());

  return {
    id,
    title,
    location,
    priceLabel: price > 0
      ? new Intl.NumberFormat('de-CH', { style: 'currency', currency, maximumFractionDigits: 0 }).format(price)
      : 'Çmimi sipas kërkesës',
    areaLabel: area > 0 ? `${area} m²` : '— m²',
    roomsLabel: rooms > 0 ? `${rooms} Dhoma` : '— Dhoma',
    typeLabel,
    badge,
    deal: rent ? 'rent' : 'sale',
    imageUrl: imagePath
      ? (imagePath.startsWith('http') ? imagePath : `https://www.banesa-ime.com${imagePath.startsWith('/') ? '' : '/'}${imagePath}`)
      : undefined,
  };
}

export async function searchProperties(params: Record<string, string> = {}): Promise<Property[]> {
  const query = new URLSearchParams(params);
  const response = await fetch(`${config.apiBaseUrl}/search?${query.toString()}`, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Search failed with status ${response.status}`);
  }

  const payload = await response.json() as SearchResponse | unknown[];
  const rows = Array.isArray(payload)
    ? payload
    : payload.items ?? payload.listings ?? payload.results ?? [];

  return rows.map(normalizeProperty);
}
