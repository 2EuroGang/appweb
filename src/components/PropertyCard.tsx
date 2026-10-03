import { useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
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
  const [favorite, setFavorite] = useState(Boolean(property.isFavorite));

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <ImageBackground
        source={property.imageUrl ? { uri: property.imageUrl } : undefined}
        style={styles.image}
        imageStyle={styles.imageInner}
      >
        <View style={styles.imageShade} />

        {property.badge ? (
          <View style={[
            styles.badge,
            property.badge === 'premium' && styles.premiumBadge,
            property.badge === 'boost' && styles.boostBadge,
          ]}>
            <Text style={styles.badgeText}>{badgeLabel[property.badge]}</Text>
          </View>
        ) : null}

        <View style={styles.dealTag}>
          <Text style={styles.dealText}>{property.deal === 'rent' ? 'ME QIRA' : 'NË SHITJE'}</Text>
        </View>

        <Pressable
          style={styles.favorite}
          hitSlop={10}
          onPress={(event) => {
            event.stopPropagation();
            setFavorite((value) => !value);
          }}
        >
          <Text style={[styles.heart, favorite && styles.heartActive]}>{favorite ? '♥' : '♡'}</Text>
        </Pressable>

        <View style={styles.photoCount}>
          <Text style={styles.photoCountText}>▧  8</Text>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{property.priceLabel}</Text>
          <Text style={styles.typePill}>{property.typeLabel}</Text>
        </View>

        <Text style={styles.title} numberOfLines={1}>{property.title}</Text>
        <Text style={styles.location}>⌖ {property.location}</Text>

        <View style={styles.divider} />

        <View style={styles.metaRow}>
          <View style={styles.metaItem}><Text style={styles.metaIcon}>▣</Text><Text style={styles.meta}>{property.areaLabel}</Text></View>
          <View style={styles.metaItem}><Text style={styles.metaIcon}>▤</Text><Text style={styles.meta}>{property.roomsLabel}</Text></View>
          <View style={styles.metaItem}><Text style={styles.metaIcon}>⌂</Text><Text style={styles.meta}>{property.typeLabel}</Text></View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.white, borderRadius: radius.lg, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  image: { height: 214, backgroundColor: '#AEBBB4', justifyContent: 'flex-end' },
  imageInner: { resizeMode: 'cover' },
  imageShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(3,43,32,0.12)' },
  badge: { position: 'absolute', top: spacing.sm, left: spacing.sm, backgroundColor: colors.forestDeep, borderWidth: 1, borderColor: colors.gold, borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 7 },
  premiumBadge: { backgroundColor: '#174A92', borderColor: '#BFD8FF' },
  boostBadge: { backgroundColor: '#0B5D46', borderColor: '#F1CA61' },
  badgeText: { color: colors.goldSoft, fontSize: 11, fontWeight: '900', letterSpacing: 0.9 },
  dealTag: { position: 'absolute', left: spacing.sm, bottom: spacing.sm, backgroundColor: colors.forest, borderRadius: radius.pill, paddingHorizontal: 11, paddingVertical: 6, borderWidth: 1, borderColor: 'rgba(217,179,91,0.65)' },
  dealText: { color: colors.white, fontSize: 10, fontWeight: '900', letterSpacing: 0.6 },
  favorite: { position: 'absolute', top: spacing.sm, right: spacing.sm, width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(255,255,255,0.94)', alignItems: 'center', justifyContent: 'center' },
  heart: { color: colors.forest, fontSize: 27, lineHeight: 30 },
  heartActive: { color: colors.danger },
  photoCount: { position: 'absolute', right: spacing.sm, bottom: spacing.sm, backgroundColor: 'rgba(3,43,32,0.78)', borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 6 },
  photoCountText: { color: colors.white, fontSize: 11, fontWeight: '800' },
  content: { padding: spacing.md },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  price: { flex: 1, color: colors.forest, fontSize: 21, fontWeight: '900' },
  typePill: { color: colors.forest, backgroundColor: '#EEF3F0', fontSize: 10, fontWeight: '800', paddingHorizontal: 9, paddingVertical: 5, borderRadius: radius.pill },
  title: { color: colors.ink, fontSize: 16, fontWeight: '800', marginTop: 7 },
  location: { color: colors.muted, fontSize: 13, marginTop: 5 },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 13 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metaIcon: { color: colors.gold, fontSize: 13, fontWeight: '900' },
  meta: { color: colors.ink, fontSize: 12, fontWeight: '700' },
});
