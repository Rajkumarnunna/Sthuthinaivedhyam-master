import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '../ThemedText';
import { IconSymbol } from '../ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import type { SFSymbols6_0 } from '@/types/icons';

interface StorageItemProps {
  label: string;
  value?: string;
  description?: string;
  icon: SFSymbols6_0;
  onPress: () => void;
  destructive?: boolean;
}

function StorageItem({ 
  label, 
  value, 
  description, 
  icon, 
  onPress,
  destructive = false 
}: StorageItemProps) {
  return (
    <TouchableOpacity 
      style={styles.storageItem} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.itemLeft}>
        <IconSymbol 
          name={icon} 
          size={20} 
          color={destructive ? '#ef4444' : Colors.light.gradient.primary} 
        />
        <View>
          <ThemedText style={[
            styles.itemLabel,
            destructive && styles.destructiveText
          ]}>
            {label}
          </ThemedText>
          {description && (
            <ThemedText style={styles.itemDescription}>{description}</ThemedText>
          )}
        </View>
      </View>
      {value && (
        <View style={styles.itemRight}>
          <ThemedText style={styles.itemValue}>{value}</ThemedText>
          <IconSymbol 
            name="chevron.right" 
            size={16} 
            color={Colors.light.icon} 
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

export function StorageSettings() {
  const handleClearCache = () => {
    // TODO: Implement clear cache
  };

  const handleClearDownloads = () => {
    // TODO: Implement clear downloads
  };

  const handleResetSettings = () => {
    // TODO: Implement reset settings
  };

  const handleBackupSettings = () => {
    // TODO: Implement backup settings
  };

  const handleRestoreSettings = () => {
    // TODO: Implement restore settings
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Storage Usage</ThemedText>
        <StorageItem
          label="Audio Files"
          value="45 MB"
          icon="music.note"
          onPress={() => {}}
        />
        <StorageItem
          label="Cache"
          value="12 MB"
          icon="internaldrive"
          onPress={() => {}}
        />
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Data Management</ThemedText>
        <StorageItem
          label="Clear Cache"
          description="Free up space by clearing temporary files"
          icon="trash"
          onPress={handleClearCache}
          destructive
        />
        <StorageItem
          label="Clear Downloads"
          description="Remove all downloaded audio files"
          icon="arrow.down.circle"
          onPress={handleClearDownloads}
          destructive
        />
        <StorageItem
          label="Reset All Settings"
          description="Reset app to default settings"
          icon="arrow.counterclockwise"
          onPress={handleResetSettings}
          destructive
        />
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Backup & Restore</ThemedText>
        <StorageItem
          label="Backup Settings"
          description="Export your settings and preferences"
          icon="square.and.arrow.up"
          onPress={handleBackupSettings}
        />
        <StorageItem
          label="Restore Settings"
          description="Import previously backed up settings"
          icon="square.and.arrow.down"
          onPress={handleRestoreSettings}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.icon,
    marginLeft: 4,
  },
  storageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.light.background,
    padding: 12,
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
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  itemValue: {
    fontSize: 16,
    color: Colors.light.icon,
  },
  destructiveText: {
    color: '#ef4444',
  },
}); 