import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { PropertyCard } from '../components/PropertyCard';
import { featuredProperties } from '../mock-data';
import { colors, radius, spacing } from '../theme';

export function ResultsScreen() {
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>Rezultatet</Text>
        <Text style={styles.subtitle}>Prona të gjetura sipas kërkimit tënd</Text>
        <View style={styles.actions}>
          <View style={styles.actionButton}><Text style={styles.actionText}>Filtro</Text></View>
          <View style={styles.actionButton}><Text style={styles.actionText}>Rendit</Text></View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {featuredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  header: {
    paddingTop: 58,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    color: colors.forest,
    fontSize: 30,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.muted,
    marginTop: 6,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  actionButton: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: radius.pill,
  },
  actionText: {
    color: colors.forest,
    fontWeight: '800',
  },
  list: {
    padding: spacing.lg,
    paddingBottom: 110,
    gap: 16,
  },
});
