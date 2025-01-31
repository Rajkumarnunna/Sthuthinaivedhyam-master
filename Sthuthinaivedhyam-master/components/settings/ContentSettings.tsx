import React from 'react';
import { StyleSheet, View, Switch } from 'react-native';
import { ThemedText } from '../ThemedText';
import { IconSymbol } from '../ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useDisplaySettings } from '@/contexts/DisplaySettingsContext';

export function ContentSettings() {
  const { currentTheme, showReferences, setShowReferences } = useDisplaySettings();

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <View style={styles.itemLeft}>
          <IconSymbol 
            name="book" 
            size={20} 
            color={Colors[currentTheme].gradient.primary} 
          />
          <View>
            <ThemedText style={styles.itemLabel}>బైబిల్ వచనాలు</ThemedText>
            <ThemedText style={styles.itemDescription}>
               బైబిల్ సూచనలు చూపించు/ వద్దు
            </ThemedText>
          </View>
        </View>
        <Switch
          value={showReferences}
          onValueChange={setShowReferences}
          trackColor={{ 
            false: Colors[currentTheme].border, 
            true: Colors[currentTheme].gradient.primary 
          }}
          thumbColor="#fff"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.light.background,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  itemLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginRight: 16,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemDescription: {
    fontSize: 14,
    color: Colors.light.icon,
    marginTop: 2,
  },
}); 