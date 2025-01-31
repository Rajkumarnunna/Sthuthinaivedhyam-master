import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { IconSymbol } from '../ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import type { SFSymbols6_0 } from '@/types/icons';
import { useDisplaySettings } from '@/contexts/DisplaySettingsContext';

interface SettingsSectionProps {
  title: string;
  icon: SFSymbols6_0;
  children: React.ReactNode;
}

export function SettingsSection({ title, icon, children }: SettingsSectionProps) {
  const { currentTheme } = useDisplaySettings();

  return (
    <View style={[
      styles.container,
      { backgroundColor: Colors[currentTheme].cardBackground }
    ]}>
      <View style={styles.header}>
        <IconSymbol 
          name={icon}
          size={24}
          color={Colors[currentTheme].gradient.primary}
        />
        <ThemedText style={styles.title}>{title}</ThemedText>
      </View>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
}); 