import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme';
import type { Property } from '../types';

type Props = {
  property: Property;
  onPress?: () => void;
};

const badgeLabel = {
  gold: 'GOLD',
  premium: 'PREMIUM',
  boost: 'BOOST',
} as const;

export function PropertyCard({ property, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imagePlaceholder}>
        {property.badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeLabel[property.badge]}</Text>
          </View>
        ) : null}
        <Text style={styles.imageText}>Foto e pronës</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.price}>{property.priceLabel}</Text>
        <Text style={styles.title} numberOfLines={1}>{property.title}</Text>
        <Text style={styles.location}>{property.location}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.meta}>{property.areaLabel}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.meta}>{property.roomsLabel}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.meta}>{property.typeLabel}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  imagePlaceholder: {
    height: 190,
    backgroundColor: '#D9DDD9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageText: {
    color: colors.muted,
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.forest,
    borderWidth: 1,
    borderColor: colors.gold,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    color: colors.goldSoft,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  content: {
    padding: spacing.md,
    gap: 6,
  },
  price: {
    color: colors.forest,
    fontSize: 20,
    fontWeight: '800',
  },
  title: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '700',
  },
  location: {
    color: colors.muted,
    fontSize: 14,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 7,
    marginTop: 4,
  },
  meta: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: '600',
  },
  dot: {
    color: colors.gold,
  },
});
