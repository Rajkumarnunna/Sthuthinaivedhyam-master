import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { useDisplaySettings } from '@/contexts/DisplaySettingsContext';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';

export default function TabLayout() {
  const { currentTheme } = useDisplaySettings();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors[currentTheme].cardBackground,
          borderTopColor: Colors[currentTheme].border,
        },
        tabBarActiveTintColor: Colors[currentTheme].gradient.primary,
        tabBarInactiveTintColor: Colors[currentTheme].icon,
        headerStyle: {
          backgroundColor: Colors[currentTheme].background,
        },
        headerTintColor: Colors[currentTheme].text,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Praises',
          tabBarIcon: ({ color }) => <IconSymbol name="music.note" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="magnifyingglass" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <IconSymbol name="gear" color={color} />,
        }}
      />
    </Tabs>
  );
}
