import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { PropertyCard } from '../components/PropertyCard';
import { featuredProperties } from '../mock-data';
import { colors, radius, spacing } from '../theme';

export function HomeScreen() {
  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.brand}>BANESA IME</Text>
          <Text style={styles.heroTitle}>Gjeje pronën që të përshtatet.</Text>
          <Text style={styles.heroSubtitle}>Bli, merr me qira ose publiko pronën tënde.</Text>

          <View style={styles.searchPanel}>
            <View style={styles.segment}>
              <View style={[styles.segmentItem, styles.segmentItemActive]}>
                <Text style={styles.segmentTextActive}>Në shitje</Text>
              </View>
              <View style={styles.segmentItem}>
                <Text style={styles.segmentText}>Me qira</Text>
              </View>
            </View>
            <TextInput
              placeholder="Qyteti ose lagjja"
              placeholderTextColor={colors.muted}
              style={styles.input}
            />
            <View style={styles.searchButton}>
              <Text style={styles.searchButtonText}>Kërko prona</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.eyebrow}>TË PËRZGJEDHURA</Text>
          <Text style={styles.sectionTitle}>Prona Gold</Text>
          <View style={styles.cards}>
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  content: {
    paddingBottom: 110,
  },
  hero: {
    backgroundColor: colors.forest,
    paddingTop: 58,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  brand: {
    color: colors.goldSoft,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2.2,
    marginBottom: 36,
  },
  heroTitle: {
    color: colors.white,
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '800',
    maxWidth: 330,
  },
  heroSubtitle: {
    color: '#DCE7E1',
    marginTop: 12,
    fontSize: 16,
    lineHeight: 23,
  },
  searchPanel: {
    marginTop: 28,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: 14,
  },
  segment: {
    flexDirection: 'row',
    backgroundColor: '#F2F1EC',
    borderRadius: radius.pill,
    padding: 4,
  },
  segmentItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: radius.pill,
  },
  segmentItemActive: {
    backgroundColor: colors.forest,
  },
  segmentText: {
    color: colors.muted,
    fontWeight: '700',
  },
  segmentTextActive: {
    color: colors.white,
    fontWeight: '800',
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    color: colors.ink,
    fontSize: 15,
  },
  searchButton: {
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    color: colors.forestDeep,
    fontWeight: '900',
    fontSize: 15,
  },
  section: {
    padding: spacing.lg,
  },
  eyebrow: {
    color: colors.gold,
    fontWeight: '900',
    fontSize: 12,
    letterSpacing: 1.4,
  },
  sectionTitle: {
    color: colors.forest,
    fontSize: 29,
    fontWeight: '800',
    marginTop: 4,
    marginBottom: 16,
  },
  cards: {
    gap: 16,
  },
});
