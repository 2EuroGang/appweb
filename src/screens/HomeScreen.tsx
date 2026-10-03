import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { PropertyCard } from '../components/PropertyCard';
import { featuredProperties } from '../mock-data';
import { colors, radius, spacing } from '../theme';

type Props = { onSearch: () => void };

const HERO =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDVQo4vDK838ixcjhJKcsB0uZw3nnxl5LkXiHmPEldYkkJ32bx2Py9V5llSsYEbGQr0_GJj6wrcLFEO4HnLL6kswK3-IDASbaRmlREVWRPf83paXoX-h-1nCzSsol4lrAqz3XEMT-l3DnpBrF3pWypFar0u4rG0nP_2WqRszLKfOpWczmgAticTXfDNn85Kf6egdZOyjxRKcV1CR5PUviWpzjoum9knCK5hIuH2t47knLYV-AU41dW-Z3k1nV-MvPYhYg';

const LOGO =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB-Qp6TrA8a6UKIs1f29ytWjIhTQnndhMKqi5sj5yno7SqSyQbzR2k5-xefhPR07Yh0KHJTsiUcJzw5d59ah_EqpWRDRmI533REG5gsWq0FzV6ImfIdcneXmGN8wEoHhpIoJZbmtrtjFqWcj3CIM40yCxKXpMFYa_ER37HJilTjke0i2jTXMOencshuCkgYS7q02ZIbYKbcj9uRfM3ZxpLtyqw6jM0ImSOKjdGT1NvTMFHJwwFrYJF_c7yjF2xZr6Psjg';

function Field({ label }: { label: string }) {
  return (
    <Pressable style={styles.field}>
      <View>
        <Text style={styles.fieldLabel}>{label}</Text>
        <Text style={styles.fieldValue}>Të gjitha</Text>
      </View>
      <Text style={styles.chevron}>⌄</Text>
    </Pressable>
  );
}

export function HomeScreen({ onSearch }: Props) {
  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ImageBackground source={{ uri: HERO }} style={styles.hero} imageStyle={styles.heroImage}>
          <View style={styles.heroOverlay} />

          <View style={styles.topNav}>
            <Pressable style={styles.glassCircle}><Text style={styles.menuIcon}>☰</Text></Pressable>
            <View style={styles.logoPill}>
              <Image source={{ uri: LOGO }} style={styles.logo} resizeMode="contain" />
              <Text style={styles.logoText}>Banesa Ime</Text>
            </View>
            <Pressable style={styles.glassCircle}><Text style={styles.heartTop}>♡</Text></Pressable>
          </View>

          <View style={styles.heroCopy}>
            <View style={styles.activePill}>
              <View style={styles.activeDot} />
              <Text style={styles.activeText}>SHFLETONI PRONAT AKTIVE</Text>
            </View>
            <View>
              <Text style={styles.heroTitle}>Gjej vendin</Text>
              <Text style={styles.heroTitle}>ku jeta merr</Text>
              <Text style={[styles.heroTitle, styles.heroItalic]}>formë</Text>
            </View>
            <Text style={styles.heroSubtitle}>Shfletoni prona për shitje dhe qira.</Text>
          </View>
        </ImageBackground>

        <View style={styles.searchWrap}>
          <View style={styles.searchCard}>
            <View style={styles.segment}>
              <Pressable style={[styles.segmentTab, styles.segmentActive]}><Text style={styles.segmentActiveText}>Të gjitha</Text></Pressable>
              <Pressable style={styles.segmentTab}><Text style={styles.segmentText}>Në shitje</Text></Pressable>
              <Pressable style={styles.segmentTab}><Text style={styles.segmentText}>Me qira</Text></Pressable>
            </View>

            <View style={styles.fieldGrid}>
              <Field label="SHTETI" />
              <Field label="KOMUNA/QARKU" />
              <Field label="LLOJI" />
              <Field label="DHOMA" />
            </View>

            <Pressable style={styles.searchButton} onPress={onSearch}>
              <Text style={styles.searchIcon}>⌕</Text>
              <Text style={styles.searchButtonText}>Kërko</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.categoriesHeader}>
          <Text style={styles.categoriesTitle}>KATEGORITË E PREFERUARA</Text>
          <Text style={styles.explore}>Eksploro</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          <View style={styles.categoryChip}><View style={[styles.categoryIcon, styles.categoryGold]}><Text>⌂</Text></View><Text style={styles.categoryText}>Vila bregdetare</Text></View>
          <View style={styles.categoryChip}><View style={[styles.categoryIcon, styles.categoryGreen]}><Text>▦</Text></View><Text style={styles.categoryText}>Apartamente moderne</Text></View>
          <View style={styles.categoryChip}><View style={[styles.categoryIcon, styles.categoryGold]}><Text>★</Text></View><Text style={styles.categoryText}>Rezidenca luksoze</Text></View>
        </ScrollView>

        <View style={styles.section}>
          <Text style={styles.eyebrow}>KOLEKSIONI ELITAR</Text>
          <Text style={styles.sectionTitle}>Rezidencat & Pronat Gold</Text>
          <Text style={styles.sectionSubtitle}>Shfletoni pronat Gold të publikuara në platformë.</Text>
          <View style={styles.cards}>
            {featuredProperties.map((property) => <PropertyCard key={property.id} property={property} />)}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: 22 },
  hero: { height: 470, justifyContent: 'space-between' },
  heroImage: { resizeMode: 'cover' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,25,37,0.30)' },
  topNav: { marginTop: 18, paddingHorizontal: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  glassCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.20)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.30)', alignItems: 'center', justifyContent: 'center' },
  menuIcon: { color: 'white', fontSize: 23, lineHeight: 25 },
  heartTop: { color: 'white', fontSize: 33, lineHeight: 34, fontWeight: '300' },
  logoPill: { minWidth: 168, height: 50, paddingHorizontal: 14, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.18)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.30)', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  logo: { width: 31, height: 31 },
  logoText: { color: 'white', fontFamily: 'Georgia', fontSize: 20, fontWeight: '700' },
  heroCopy: { paddingHorizontal: 24, paddingBottom: 78 },
  activePill: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(15,56,44,0.88)', borderWidth: 1, borderColor: 'rgba(229,169,60,0.55)', paddingHorizontal: 12, paddingVertical: 7, borderRadius: radius.pill, marginBottom: 12 },
  activeDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.gold },
  activeText: { color: colors.gold, fontSize: 11, fontWeight: '900', letterSpacing: 1.1 },
  heroTitle: { color: 'white', fontFamily: 'Georgia', fontSize: 42, lineHeight: 46, fontWeight: '700', letterSpacing: -1.3 },
  heroItalic: { color: '#F4D66E', fontStyle: 'italic', fontWeight: '400' },
  heroSubtitle: { color: '#E7E2DC', fontSize: 13, fontWeight: '600', marginTop: 8 },
  searchWrap: { marginTop: -60, paddingHorizontal: 16 },
  searchCard: { backgroundColor: 'rgba(255,255,255,0.97)', borderRadius: 24, borderWidth: 1, borderColor: '#F1D583', padding: 16, shadowColor: colors.forest, shadowOpacity: 0.13, shadowRadius: 28, shadowOffset: { width: 0, height: 12 }, elevation: 8 },
  segment: { backgroundColor: '#EEECEB', borderRadius: 16, padding: 4, flexDirection: 'row', gap: 4 },
  segmentTab: { flex: 1, height: 44, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  segmentActive: { backgroundColor: '#0A4638' },
  segmentText: { color: '#2F2D2B', fontSize: 15, fontWeight: '600' },
  segmentActiveText: { color: 'white', fontSize: 15, fontWeight: '800' },
  fieldGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 14, rowGap: 12 },
  field: { width: '48.7%', minHeight: 72, backgroundColor: 'white', borderWidth: 1, borderColor: colors.border, borderRadius: 18, paddingHorizontal: 14, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 5, shadowOffset: { width: 0, height: 2 }, elevation: 1 },
  fieldLabel: { color: '#AAA49F', fontSize: 10, fontWeight: '900', letterSpacing: 1.0 },
  fieldValue: { color: colors.ink, fontSize: 15, fontWeight: '700', marginTop: 5 },
  chevron: { color: '#77716B', fontSize: 22, marginTop: 4 },
  searchButton: { marginTop: 14, height: 58, borderRadius: 17, backgroundColor: colors.gold, flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center', shadowColor: colors.gold, shadowOpacity: 0.24, shadowRadius: 14, shadowOffset: { width: 0, height: 5 }, elevation: 4 },
  searchIcon: { color: colors.forestDeep, fontSize: 28, lineHeight: 28 },
  searchButtonText: { color: colors.forestDeep, fontSize: 19, fontWeight: '800' },
  categoriesHeader: { marginTop: 28, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  categoriesTitle: { color: '#77716B', fontSize: 12, fontWeight: '900', letterSpacing: 0.5 },
  explore: { color: colors.forestDeep, fontSize: 14, fontWeight: '700' },
  categoryScroll: { paddingHorizontal: 20, paddingVertical: 14, gap: 12 },
  categoryChip: { height: 52, paddingHorizontal: 16, borderRadius: 28, borderWidth: 1, borderColor: colors.border, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', gap: 10 },
  categoryIcon: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  categoryGold: { backgroundColor: '#FFF6DD' },
  categoryGreen: { backgroundColor: '#E9F6F0' },
  categoryText: { color: colors.ink, fontSize: 15, fontWeight: '600' },
  section: { paddingHorizontal: 20, marginTop: 26 },
  eyebrow: { color: colors.gold, fontSize: 12, fontWeight: '900', letterSpacing: 1.3 },
  sectionTitle: { color: colors.forestDeep, fontFamily: 'Georgia', fontSize: 30, lineHeight: 36, fontWeight: '700', marginTop: 7 },
  sectionSubtitle: { color: colors.muted, fontSize: 13, marginTop: 5, marginBottom: 16 },
  cards: { gap: 22 },
});
