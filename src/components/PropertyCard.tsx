import { useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme';
import type { Property } from '../types';

type Props = {
  property: Property;
  onPress?: () => void;
};

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

        {property.badge === 'premium' ? (
          <View style={styles.premiumRibbon}>
            <Text style={styles.ribbonText}>PREMIUM</Text>
          </View>
        ) : property.badge ? (
          <View style={styles.roundBadge}>
            <Text style={styles.roundBadgeB}>B</Text>
            <Text style={styles.roundBadgeText}>{property.badge === 'gold' ? 'GOLD' : 'BOOST'}</Text>
          </View>
        ) : null}

        <View style={styles.hangingTag}>
          <Text style={styles.hangingText}>{property.deal === 'rent' ? 'ME\nQIRA' : 'NË\nSHITJE'}</Text>
        </View>

        <Pressable
          style={styles.favorite}
          hitSlop={10}
          onPress={(event) => {
            event.stopPropagation();
            setFavorite((value) => !value);
          }}
        >
          <Ionicons
            name={favorite ? 'heart' : 'heart-outline'}
            size={31}
            color={favorite ? '#F12D4F' : colors.forestDeep}
          />
        </Pressable>

        <View style={styles.pricePill}>
          <Text style={styles.price}>{property.priceLabel}</Text>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{property.title}</Text>

        <View style={styles.locationRow}>
          <View style={styles.locationDot} />
          <Text style={styles.location} numberOfLines={1}>{property.location}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.metaRow}>
          <Meta icon="home-outline" label={property.areaLabel} />
          <Meta icon="sofa-outline" label="1 Sallon" />
          <Meta icon="bed-outline" label={property.roomsLabel} />
          <Meta icon="shower" label={property.deal === 'rent' ? '1 Banjo' : '2 Banjo'} />
        </View>
      </View>
    </Pressable>
  );
}

function Meta({ icon, label }: { icon: keyof typeof MaterialCommunityIcons.glyphMap; label: string }) {
  return (
    <View style={styles.metaItem}>
      <MaterialCommunityIcons name={icon} size={16} color="#555650" />
      <Text style={styles.meta} numberOfLines={1}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(229,226,218,0.85)',
    shadowColor: '#0F382C',
    shadowOpacity: 0.07,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  image: {
    height: 230,
    backgroundColor: '#D7D5D1',
  },
  imageInner: {
    resizeMode: 'cover',
  },
  imageShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  premiumRibbon: {
    position: 'absolute',
    left: -28,
    top: 18,
    width: 112,
    height: 26,
    backgroundColor: '#0C52C9',
    transform: [{ rotate: '-45deg' }],
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowRadius: 5,
  },
  ribbonText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  roundBadge: {
    position: 'absolute',
    left: 14,
    top: 14,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.forestDeep,
    borderWidth: 3,
    borderColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundBadgeB: {
    color: colors.gold,
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 18,
  },
  roundBadgeText: {
    color: colors.goldSoft,
    fontSize: 6.5,
    fontWeight: '900',
  },
  hangingTag: {
    position: 'absolute',
    top: -2,
    right: 72,
    width: 74,
    minHeight: 48,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.gold,
    backgroundColor: colors.forestDeep,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '4deg' }],
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  hangingText: {
    color: '#FFF4D4',
    fontFamily: 'Georgia',
    fontSize: 11,
    lineHeight: 11,
    fontWeight: '900',
    textAlign: 'center',
  },
  favorite: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.97)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.13,
    shadowRadius: 7,
    elevation: 3,
  },
  pricePill: {
    position: 'absolute',
    left: 18,
    bottom: 18,
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 9,
    backgroundColor: 'rgba(4,47,38,0.92)',
    borderWidth: 1,
    borderColor: colors.gold,
  },
  price: {
    color: colors.goldSoft,
    fontSize: 18,
    fontWeight: '900',
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 18,
  },
  title: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 21,
    lineHeight: 27,
    fontWeight: '700',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginTop: 9,
  },
  locationDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#75837E',
  },
  location: {
    flex: 1,
    color: colors.muted,
    fontSize: 13,
    fontWeight: '600',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#EDEAE4',
    marginTop: 16,
    marginBottom: 14,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 7,
  },
  metaItem: {
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  meta: {
    color: '#494944',
    fontSize: 11,
    fontWeight: '600',
  },
});
