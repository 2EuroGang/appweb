import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { PropertyCard } from '../components/PropertyCard';
import { featuredProperties } from '../mock-data';
import { colors, radius, spacing } from '../theme';

type Props = { onSearch: () => void };

export function HomeScreen({ onSearch }: Props) {
  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.brandRow}>
            <View style={styles.logoMark}><Text style={styles.logoLetter}>B</Text></View>
            <View>
              <Text style={styles.brand}>BANESA IME</Text>
              <Text style={styles.brandSub}>Prona për ty</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>Gjeje pronën që të përshtatet.</Text>
          <Text style={styles.heroSubtitle}>Bli, merr me qira ose publiko pronën tënde.</Text>

          <View style={styles.searchPanel}>
            <View style={styles.segment}>
              <View style={[styles.segmentItem, styles.segmentItemActive]}><Text style={styles.segmentTextActive}>Në shitje</Text></View>
              <View style={styles.segmentItem}><Text style={styles.segmentText}>Me qira</Text></View>
            </View>

            <Text style={styles.fieldLabel}>Lokacioni</Text>
            <TextInput placeholder="Qyteti ose lagjja" placeholderTextColor={colors.muted} style={styles.input} />

            <View style={styles.quickFilters}>
              <Pressable style={styles.filterChip}><Text style={styles.filterChipText}>Lloji</Text></Pressable>
              <Pressable style={styles.filterChip}><Text style={styles.filterChipText}>Dhoma</Text></Pressable>
              <Pressable style={styles.filterChip}><Text style={styles.filterChipText}>Çmimi</Text></Pressable>
            </View>

            <Pressable style={styles.searchButton} onPress={onSearch}>
              <Text style={styles.searchButtonText}>Kërko prona</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.eyebrow}>TË PËRZGJEDHURA</Text>
          <View style={styles.sectionHeadingRow}>
            <Text style={styles.sectionTitle}>Prona Gold</Text>
            <Text style={styles.seeAll}>Shiko të gjitha</Text>
          </View>
          <View style={styles.cards}>
            {featuredProperties.map((property) => <PropertyCard key={property.id} property={property} />)}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  content: { paddingBottom: 120 },
  hero: { backgroundColor: colors.forest, paddingTop: 52, paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 34 },
  logoMark: { width: 46, height: 46, borderRadius: 23, borderWidth: 2, borderColor: colors.gold, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.forestDeep },
  logoLetter: { color: colors.goldSoft, fontSize: 24, fontWeight: '900' },
  brand: { color: colors.goldSoft, fontSize: 15, fontWeight: '900', letterSpacing: 1.8 },
  brandSub: { color: '#BFD0C7', fontSize: 11, marginTop: 2 },
  heroTitle: { color: colors.white, fontSize: 36, lineHeight: 42, fontWeight: '800', maxWidth: 330 },
  heroSubtitle: { color: '#DCE7E1', marginTop: 12, fontSize: 16, lineHeight: 23 },
  searchPanel: { marginTop: 28, backgroundColor: colors.white, borderRadius: radius.lg, padding: spacing.md, gap: 12 },
  segment: { flexDirection: 'row', backgroundColor: '#F2F1EC', borderRadius: radius.pill, padding: 4 },
  segmentItem: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: radius.pill },
  segmentItemActive: { backgroundColor: colors.forest },
  segmentText: { color: colors.muted, fontWeight: '700' },
  segmentTextActive: { color: colors.white, fontWeight: '800' },
  fieldLabel: { color: colors.ink, fontSize: 12, fontWeight: '800', marginTop: 2 },
  input: { height: 52, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: 14, color: colors.ink, fontSize: 15 },
  quickFilters: { flexDirection: 'row', gap: 8 },
  filterChip: { flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingVertical: 11, alignItems: 'center' },
  filterChipText: { color: colors.forest, fontSize: 12, fontWeight: '800' },
  searchButton: { height: 52, borderRadius: radius.md, backgroundColor: colors.gold, alignItems: 'center', justifyContent: 'center' },
  searchButtonText: { color: colors.forestDeep, fontWeight: '900', fontSize: 15 },
  section: { padding: spacing.lg },
  eyebrow: { color: colors.gold, fontWeight: '900', fontSize: 12, letterSpacing: 1.4 },
  sectionHeadingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4, marginBottom: 16 },
  sectionTitle: { color: colors.forest, fontSize: 29, fontWeight: '800' },
  seeAll: { color: colors.forest, fontSize: 12, fontWeight: '800' },
  cards: { gap: 16 },
});
