import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { ResultsScreen } from './src/screens/ResultsScreen';
import { colors } from './src/theme';

type Tab = 'home' | 'search' | 'publish' | 'saved' | 'profile';

export default function App() {
  const [tab, setTab] = useState<Tab>('home');

  const content =
    tab === 'home' ? <HomeScreen onSearch={() => setTab('search')} /> :
    tab === 'search' ? <ResultsScreen /> :
    <View style={styles.placeholder}>
      <Text style={styles.placeholderTitle}>
        {tab === 'publish' ? 'Publiko pronë' : tab === 'saved' ? 'Pronat e ruajtura' : 'Profili'}
      </Text>
      <Text style={styles.placeholderText}>Ky ekran do të ndërtohet në fazën tjetër.</Text>
    </View>;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>{content}</View>
      <View style={styles.tabBar}>
        <TabButton label="Ballina" active={tab === 'home'} onPress={() => setTab('home')} />
        <TabButton label="Kërko" active={tab === 'search'} onPress={() => setTab('search')} />
        <Pressable style={styles.publishButton} onPress={() => setTab('publish')}>
          <Text style={styles.publishPlus}>＋</Text>
          <Text style={styles.publishText}>Publiko</Text>
        </Pressable>
        <TabButton label="Ruajtur" active={tab === 'saved'} onPress={() => setTab('saved')} />
        <TabButton label="Profili" active={tab === 'profile'} onPress={() => setTab('profile')} />
      </View>
    </SafeAreaView>
  );
}

function TabButton({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable style={styles.tabButton} onPress={onPress}>
      <View style={[styles.tabDot, active && styles.tabDotActive]} />
      <Text style={[styles.tabText, active && styles.tabTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  content: { flex: 1 },
  tabBar: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 10,
    minHeight: 76,
    borderRadius: 24,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  tabButton: { minWidth: 54, alignItems: 'center', gap: 6 },
  tabDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#C8CFCA' },
  tabDotActive: { backgroundColor: colors.gold },
  tabText: { color: colors.muted, fontSize: 11, fontWeight: '700' },
  tabTextActive: { color: colors.forest, fontWeight: '900' },
  publishButton: {
    width: 66,
    height: 66,
    marginTop: -26,
    borderRadius: 33,
    backgroundColor: colors.forest,
    borderWidth: 3,
    borderColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  publishPlus: { color: colors.goldSoft, fontSize: 24, fontWeight: '900', lineHeight: 25 },
  publishText: { color: colors.white, fontSize: 10, fontWeight: '800' },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  placeholderTitle: { color: colors.forest, fontSize: 26, fontWeight: '900', marginBottom: 8 },
  placeholderText: { color: colors.muted, fontWeight: '700', textAlign: 'center' },
});
