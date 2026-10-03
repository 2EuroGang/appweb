import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeScreen } from './src/screens/HomeScreen';
import { ResultsScreen } from './src/screens/ResultsScreen';
import { colors } from './src/theme';

type Tab = 'home' | 'search' | 'saved' | 'notifications' | 'profile';

const tabs: Array<{
  key: Tab;
  icon: keyof typeof Ionicons.glyphMap;
  iconActive: keyof typeof Ionicons.glyphMap;
  labelHome: string;
  labelOther: string;
}> = [
  { key: 'home', icon: 'home-outline', iconActive: 'home', labelHome: 'Ballina', labelOther: 'Kreu' },
  { key: 'search', icon: 'search-outline', iconActive: 'search', labelHome: 'Kërko', labelOther: 'Kërko' },
  { key: 'saved', icon: 'heart-outline', iconActive: 'heart', labelHome: 'Të Ruajturat', labelOther: 'Të Ruajturat' },
  { key: 'notifications', icon: 'notifications-outline', iconActive: 'notifications', labelHome: 'Njoftimet', labelOther: 'Njoftimet' },
  { key: 'profile', icon: 'person-outline', iconActive: 'person', labelHome: 'Profili', labelOther: 'Profili' },
];

export default function App() {
  return (
    <SafeAreaProvider>
      <AppShell />
    </SafeAreaProvider>
  );
}

function AppShell() {
  const [tab, setTab] = useState<Tab>('home');
  const insets = useSafeAreaInsets();

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
    <View style={styles.root}>
      <View style={styles.content}>{content}</View>

      <View style={[styles.tabBar, { paddingBottom: Math.max(insets.bottom, 8), height: 68 + Math.max(insets.bottom, 8) }]}>
        {tabs.map((item) => {
          const active = tab === item.key;
          const label = tab === 'home' ? item.labelHome : item.labelOther;

          return (
            <Pressable
              key={item.key}
              style={styles.tabButton}
              onPress={() => setTab(item.key)}
              android_ripple={{ color: 'rgba(15,56,44,0.06)', borderless: true }}
            >
              <View style={styles.iconWrap}>
                <Ionicons
                  name={active ? item.iconActive : item.icon}
                  size={26}
                  color={active ? colors.forestDeep : '#A8A5A0'}
                />
                {item.key === 'notifications' ? <View style={styles.notifyDot} /> : null}
              </View>
              <Text style={[styles.tabText, active && styles.tabTextActive]} numberOfLines={1}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 8,
    paddingHorizontal: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 3,
  },
  iconWrap: {
    width: 34,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: '#A8A5A0',
    fontSize: 10.5,
    lineHeight: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  tabTextActive: {
    color: colors.forestDeep,
    fontWeight: '800',
  },
  notifyDot: {
    position: 'absolute',
    right: 1,
    top: 0,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.gold,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  placeholderTitle: {
    color: colors.forest,
    fontFamily: 'Georgia',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  placeholderText: {
    color: colors.muted,
    fontWeight: '600',
    textAlign: 'center',
  },
});
