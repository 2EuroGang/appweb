import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { ResultsScreen } from './src/screens/ResultsScreen';
import { colors } from './src/theme';

type Tab = 'home' | 'search' | 'saved' | 'profile';

export default function App() {
  const [tab, setTab] = useState<Tab>('home');

  const content =
    tab === 'home' ? <HomeScreen /> :
    tab === 'search' ? <ResultsScreen /> :
    <View style={styles.placeholder}><Text style={styles.placeholderText}>Ky ekran vjen në hapin tjetër.</Text></View>;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>{content}</View>
      <View style={styles.tabBar}>
        <TabButton label="Ballina" active={tab === 'home'} onPress={() => setTab('home')} />
        <TabButton label="Kërko" active={tab === 'search'} onPress={() => setTab('search')} />
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
  root: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 12,
    height: 72,
    borderRadius: 22,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  tabButton: {
    minWidth: 68,
    alignItems: 'center',
    gap: 6,
  },
  tabDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C8CFCA',
  },
  tabDotActive: {
    backgroundColor: colors.gold,
  },
  tabText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
  },
  tabTextActive: {
    color: colors.forest,
    fontWeight: '900',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  placeholderText: {
    color: colors.muted,
    fontWeight: '700',
  },
});
