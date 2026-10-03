import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PropertyCard } from '../components/PropertyCard';
import { featuredProperties } from '../mock-data';
import { searchProperties } from '../services/api';
import { colors, radius } from '../theme';
import type { Property } from '../types';

export function ResultsScreen() {
  const [properties, setProperties] = useState<Property[]>(featuredProperties);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    searchProperties({})
      .then((rows) => { if (rows.length) setProperties(rows); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.back}>‹</Text>
          <View style={styles.titleCenter}>
            <Text style={styles.title}>Rezultatet e kërkimit</Text>
            <Text style={styles.subtitle}>{properties.length} prona të gjetura</Text>
          </View>
          <Text style={styles.search}>⌕</Text>
        </View>

        <View style={styles.toolbar}>
          <Pressable style={[styles.toolbarButton, styles.sortButton]}>
            <Text style={styles.toolbarIcon}>⇅</Text>
            <Text style={styles.toolbarText}>Rendit: Më të rejat</Text>
            <Text style={styles.chev}>⌄</Text>
          </Pressable>
          <Pressable style={styles.toolbarButton}>
            <Text style={styles.toolbarIcon}>≡</Text>
            <Text style={styles.toolbarText}>Filtrat</Text>
            <View style={styles.countBadge}><Text style={styles.countText}>2</Text></View>
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {loading ? <ActivityIndicator color={colors.forest} style={styles.loader} /> : null}
        {properties.map((property) => <PropertyCard key={property.id} property={property} />)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: colors.background, borderBottomWidth: 1, borderBottomColor: colors.border, paddingHorizontal: 18, paddingTop: 18, paddingBottom: 16 },
  titleRow: { height: 72, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  back: { width: 36, color: colors.ink, fontSize: 45, lineHeight: 46, fontWeight: '300' },
  search: { width: 36, color: colors.ink, fontSize: 34, lineHeight: 35, textAlign: 'right' },
  titleCenter: { flex: 1, alignItems: 'center' },
  title: { color: colors.forestDeep, fontFamily: 'Georgia', fontSize: 24, fontWeight: '700' },
  subtitle: { color: colors.muted, fontSize: 13, marginTop: 3 },
  toolbar: { flexDirection: 'row', gap: 12 },
  toolbarButton: { height: 54, borderRadius: 22, borderWidth: 1, borderColor: colors.border, backgroundColor: 'white', paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 1 },
  sortButton: { flex: 1 },
  toolbarIcon: { color: '#77716B', fontSize: 20 },
  toolbarText: { color: '#34322F', fontSize: 14, fontWeight: '600' },
  chev: { color: '#AAA39B', fontSize: 18, marginLeft: 'auto' },
  countBadge: { width: 27, height: 27, borderRadius: 14, backgroundColor: colors.goldDark, alignItems: 'center', justifyContent: 'center' },
  countText: { color: 'white', fontSize: 13, fontWeight: '900' },
  list: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 28, gap: 24 },
  loader: { marginBottom: 4 },
});
