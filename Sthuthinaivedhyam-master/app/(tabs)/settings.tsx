import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { SettingsSection } from '@/components/settings/SettingsSection';
import { DisplaySettings } from '@/components/settings/DisplaySettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { ContentSettings } from '@/components/settings/ContentSettings';
import { AppInfo } from '@/components/settings/AppInfo';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  return (
    <ScrollView 
      style={[
        styles.container, 
        { backgroundColor: Colors[theme].background }
      ]}
      contentContainerStyle={styles.content}
    >
      <SettingsSection title="ప్రదర్శన" icon="gear">
        <DisplaySettings />
      </SettingsSection>

      <SettingsSection title="నోటిఫికేషన్లు" icon="bell">
        <NotificationSettings />
      </SettingsSection>

      <SettingsSection title="కంటెంట్" icon="doc">
        <ContentSettings />
      </SettingsSection>

      <SettingsSection title="యాప్ సమాచారం" icon="info">
        <AppInfo />
      </SettingsSection>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
}); 