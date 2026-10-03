import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { ResultsScreen } from './src/screens/ResultsScreen';
import { colors } from './src/theme';

type Tab = 'home' | 'search' | 'saved' | 'notifications' | 'profile';

const tabs: Array<{ key: Tab; icon: string; labelHome: string; labelOther: string }> = [
  { key: 'home', icon: '⌂', labelHome: 'Ballina', labelOther: 'Kreu' },
  { key: 'search', icon: '⌕', labelHome: 'Kërko', labelOther: 'Kërko' },
  { key: 'saved', icon: '♡', labelHome: 'Të Ruajturat', labelOther: 'Të Ruajturat' },
  { key: 'notifications', icon: '♧', labelHome: 'Njoftimet', labelOther: 'Njoftimet' },
  { key: 'profile', icon: '♙', labelHome: 'Profili', labelOther: 'Profili' },
];

export default function App() {
  const [tab, setTab] = useState<Tab>('home');

  const content =
    tab === 'home' ? <HomeScreen onSearch={() => setTab('search')} /> :
    tab === 'search' ? <ResultsScreen /> :
    <View style={styles.placeholder}>
      <Text style={styles.placeholderTitle}>
        {tab === 'saved' ? 'Të Ruajturat' : tab === 'notifications' ? 'Njoftimet' : 'Profili'}
      </Text>
      <Text style={styles.placeholderText}>Ky ekran do të ndërtohet pas Home dhe Results.</Text>
    </View>;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>{content}</View>

      <View style={styles.tabBar}>
        {tabs.map((item) => {
          const active = tab === item.key;
          const label = tab === 'home' ? item.labelHome : item.labelOther;
          return (
            <Pressable key={item.key} style={styles.tabButton} onPress={() => setTab(item.key)}>
              <View style={styles.iconWrap}>
                <Text style={[styles.tabIcon, active && styles.tabIconActive]}>{item.icon}</Text>
                {item.key === 'notifications' ? <View style={styles.notifyDot} /> : null}
                {active && item.key === 'search' ? <View style={styles.searchGoldDot} /> : null}
              </View>
              <Text style={[styles.tabText, active && styles.tabTextActive]}>{label}</Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1 },
  tabBar: {
    height: 76,
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 3,
    paddingBottom: 3,
  },
  tabButton: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 3 },
  iconWrap: { width: 34, height: 30, alignItems: 'center', justifyContent: 'center' },
  tabIcon: { color: '#A9A39D', fontSize: 30, lineHeight: 31, fontWeight: '400' },
  tabIconActive: { color: colors.forestDeep },
  tabText: { color: '#A9A39D', fontSize: 11, fontWeight: '600' },
  tabTextActive: { color: colors.forestDeep, fontWeight: '800' },
  notifyDot: { position: 'absolute', right: 2, top: 1, width: 6, height: 6, borderRadius: 3, backgroundColor: colors.gold },
  searchGoldDot: { position: 'absolute', bottom: -2, width: 5, height: 5, borderRadius: 3, backgroundColor: colors.gold },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  placeholderTitle: { color: colors.forest, fontFamily: 'Georgia', fontSize: 28, fontWeight: '700', marginBottom: 8 },
  placeholderText: { color: colors.muted, fontWeight: '600', textAlign: 'center' },
});
