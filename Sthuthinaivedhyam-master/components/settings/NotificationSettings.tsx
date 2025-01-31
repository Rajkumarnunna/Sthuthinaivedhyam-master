import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Switch } from 'react-native';
import { ThemedText } from '../ThemedText';
import { IconSymbol } from '../ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import type { SFSymbols6_0 } from '@/types/icons';
import { useDisplaySettings } from '@/contexts/DisplaySettingsContext';
import { 
  setupDailyNotifications, 
  toggleNotifications, 
  areNotificationsEnabled 
} from '@/utils/notifications';

interface NotificationItemProps {
  label: string;
  description?: string;
  icon: SFSymbols6_0;
  value: boolean;
  onValueChange: (value: boolean) => void;
  onPress?: () => void;
}

function NotificationItem({ 
  label, 
  description, 
  icon, 
  value, 
  onValueChange,
  onPress 
}: NotificationItemProps) {
  return (
    <TouchableOpacity 
      style={styles.notificationItem} 
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.itemLeft}>
        <IconSymbol 
          name={icon} 
          size={20} 
          color={Colors.light.gradient.primary} 
        />
        <View>
          <ThemedText style={styles.itemLabel}>{label}</ThemedText>
          {description && (
            <ThemedText style={styles.itemDescription}>{description}</ThemedText>
          )}
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ 
          false: Colors.light.border, 
          true: Colors.light.gradient.primary 
        }}
        thumbColor="#fff"
      />
    </TouchableOpacity>
  );
}

export function NotificationSettings() {
  const { currentTheme } = useDisplaySettings();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    // Check initial notification status
    areNotificationsEnabled().then(setNotificationsEnabled);
  }, []);

  const handleToggleNotifications = async (value: boolean) => {
    await toggleNotifications(value);
    setNotificationsEnabled(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.notificationItem}>
        <View style={styles.itemLeft}>
          <IconSymbol 
            name="bell.badge" 
            size={20} 
            color={Colors[currentTheme].gradient.primary} 
          />
          <View>
            <ThemedText style={styles.itemLabel}>Daily Reminders</ThemedText>
            <ThemedText style={styles.itemDescription}>
              Get notified twice daily for praise time
            </ThemedText>
          </View>
        </View>
        <Switch
          value={notificationsEnabled}
          onValueChange={handleToggleNotifications}
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
  notificationItem: {
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