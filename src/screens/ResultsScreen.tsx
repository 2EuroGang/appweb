import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PropertyCard } from '../components/PropertyCard';
import { featuredProperties } from '../mock-data';
import { searchProperties } from '../services/api';
import { colors, radius, spacing } from '../theme';
import type { Property } from '../types';

export function ResultsScreen() {
  const [properties, setProperties] = useState<Property[]>(featuredProperties);
  const [loading, setLoading] = useState(false);
  const [apiMode, setApiMode] = useState(false);

  async function loadFromApi() {
    setLoading(true);
    try {
      const rows = await searchProperties({});
      if (rows.length > 0) {
        setProperties(rows);
        setApiMode(true);
      }
    } catch {
      setApiMode(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadFromApi();
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.kicker}>KËRKIMI</Text>
        <Text style={styles.title}>Rezultatet</Text>
        <Text style={styles.subtitle}>Prona të gjetura sipas filtrave të zgjedhur.</Text>

        <View style={styles.activeFilterRow}>
          <View style={styles.activeFilter}><Text style={styles.activeFilterText}>Në shitje</Text></View>
          <View style={styles.activeFilter}><Text style={styles.activeFilterText}>Prishtinë</Text></View>
          <View style={styles.activeFilter}><Text style={styles.activeFilterText}>2+ dhoma</Text></View>
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.actionButton}><Text style={styles.actionText}>☰  Filtro</Text></Pressable>
          <Pressable style={styles.actionButton}><Text style={styles.actionText}>↕  Rendit</Text></Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        <View style={styles.countRow}>
          <View>
            <Text style={styles.count}>{properties.length} prona</Text>
            <Text style={styles.source}>{apiMode ? 'Të dhëna nga Banesa Ime' : 'Demo data'}</Text>
          </View>
          {loading ? <ActivityIndicator color={colors.forest} /> : <Text style={styles.viewLabel}>Pamja: Listë</Text>}
        </View>

        {properties.map((property) => <PropertyCard key={property.id} property={property} />)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  header: { paddingTop: 52, paddingHorizontal: spacing.lg, paddingBottom: spacing.md, backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.border },
  kicker: { color: colors.gold, fontSize: 11, letterSpacing: 1.5, fontWeight: '900' },
  title: { color: colors.forest, fontSize: 31, fontWeight: '900', marginTop: 3 },
  subtitle: { color: colors.muted, marginTop: 6, lineHeight: 20 },
  activeFilterRow: { flexDirection: 'row', gap: 8, marginTop: 14, flexWrap: 'wrap' },
  activeFilter: { backgroundColor: '#EEF3F0', borderRadius: radius.pill, paddingHorizontal: 11, paddingVertical: 7 },
  activeFilterText: { color: colors.forest, fontSize: 12, fontWeight: '800' },
  actions: { flexDirection: 'row', gap: 10, marginTop: 16 },
  actionButton: { flex: 1, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 16, paddingVertical: 12, borderRadius: radius.pill, alignItems: 'center' },
  actionText: { color: colors.forest, fontWeight: '800' },
  list: { padding: spacing.lg, paddingBottom: 120, gap: 16 },
  countRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  count: { color: colors.ink, fontWeight: '900' },
  source: { color: colors.muted, fontSize: 10, marginTop: 3 },
  viewLabel: { color: colors.muted, fontSize: 12, fontWeight: '700' },
});
