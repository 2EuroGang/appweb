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
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
}

function absoluteImageUrl(value: string) {
  const url = value.trim();
  if (!url) return undefined;

  if (/^https?:\/\//i.test(url)) return url;

  if (url.startsWith('/')) {
    return `https://www.banesa-ime.com${url}`;
  }

  if (url.startsWith('api/') || url.startsWith('images/')) {
    return `https://www.banesa-ime.com/${url.startsWith('api/') ? '' : 'api/'}${url}`;
  }

  return undefined;
}

function imageFromObject(value: any): string | undefined {
  if (!value) return undefined;

  if (typeof value === 'string') {
    return absoluteImageUrl(value);
  }

  const directCandidates = [
    value.publicUrl,
    value.public_url,
    value.url,
    value.src,
    value.image_url,
    value.imageUrl,
    value.cover_image_url,
    value.coverImageUrl,
    value.storage_url,
    value.storageUrl,
  ];

  for (const candidate of directCandidates) {
    if (typeof candidate === 'string') {
      const resolved = absoluteImageUrl(candidate);
      if (resolved) return resolved;
    }
  }

  // Banesa Ime backend can serve protected/public image records through /api/images/:id.
  const id = asString(value.id);
  if (id) return `https://www.banesa-ime.com/api/images/${encodeURIComponent(id)}`;

  return undefined;
}

function resolveImageUrl(raw: any): string | undefined {
  const direct = [
    raw?.cover_image_url,
    raw?.coverImageUrl,
    raw?.image_url,
    raw?.imageUrl,
    raw?.publicUrl,
    raw?.public_url,
  ];

  for (const candidate of direct) {
    if (typeof candidate === 'string') {
      const resolved = absoluteImageUrl(candidate);
      if (resolved) return resolved;
    }
  }

  const objectCandidates = [
    raw?.cover_image,
    raw?.coverImage,
    raw?.image,
    raw?.featured_image,
    raw?.featuredImage,
  ];

  for (const candidate of objectCandidates) {
    const resolved = imageFromObject(candidate);
    if (resolved) return resolved;
  }

  const collections = [
    raw?.images,
    raw?.photos,
    raw?.property_images,
    raw?.propertyImages,
  ];

  for (const collection of collections) {
    if (Array.isArray(collection) && collection.length > 0) {
      const cover = collection.find((item: any) =>
        item?.is_cover === true ||
        item?.isCover === true ||
        item?.cover === true
      );
      const resolvedCover = imageFromObject(cover);
      if (resolvedCover) return resolvedCover;

      const resolvedFirst = imageFromObject(collection[0]);
      if (resolvedFirst) return resolvedFirst;
    }
  }

  const imageId =
    asString(raw?.cover_image_id) ||
    asString(raw?.coverImageId) ||
    asString(raw?.image_id) ||
    asString(raw?.imageId);

  if (imageId) {
    return `https://www.banesa-ime.com/api/images/${encodeURIComponent(imageId)}`;
  }

  return undefined;
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
  const imageUrl = resolveImageUrl(raw);

  const badgeRaw = asString(raw?.promotion, asString(raw?.badge)).toLowerCase();
  const badge =
    badgeRaw.includes('gold') ? 'gold' :
    badgeRaw.includes('premium') ? 'premium' :
    badgeRaw.includes('boost') ? 'boost' :
    undefined;

  const rent = ['rent', 'qira', 'rental'].includes(
    asString(raw?.deal_type, asString(raw?.listing_type)).toLowerCase()
  );

  return {
    id,
    title,
    location,
    priceLabel: price > 0
      ? new Intl.NumberFormat('de-CH', {
          style: 'currency',
          currency,
          maximumFractionDigits: 0,
        }).format(price)
      : 'Çmimi sipas kërkesës',
    areaLabel: area > 0 ? `${area} m²` : '— m²',
    roomsLabel: rooms > 0 ? `${rooms} Dhoma` : '— Dhoma',
    typeLabel,
    badge,
    deal: rent ? 'rent' : 'sale',
    imageUrl,
  };
}

export async function searchProperties(
  params: Record<string, string> = {}
): Promise<Property[]> {
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
