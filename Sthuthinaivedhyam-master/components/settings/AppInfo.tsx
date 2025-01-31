import React from 'react';
import { StyleSheet, View, TouchableOpacity, Linking } from 'react-native';
import { ThemedText } from '../ThemedText';
import { IconSymbol } from '../ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import type { SFSymbols6_0 } from '@/types/icons';

interface InfoItemProps {
  label: string;
  value?: string;
  icon: SFSymbols6_0;
  onPress?: () => void;
  valueStyle?: object;
}

function InfoItem({ label, value, icon, onPress, valueStyle }: InfoItemProps) {
  return (
    <TouchableOpacity 
      style={styles.infoItem} 
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
    >
      <View style={styles.itemLeft}>
        <IconSymbol 
          name={icon} 
          size={20} 
          color={Colors.light.gradient.primary} 
        />
        <ThemedText style={styles.itemLabel}>{label}</ThemedText>
      </View>
      {value && (
        <View style={styles.itemRight}>
          <ThemedText style={[styles.itemValue, valueStyle]}>{value}</ThemedText>
          {onPress && (
            <IconSymbol 
              name="chevron.right" 
              size={16} 
              color={Colors.light.icon} 
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

export function AppInfo() {
  

  const handleSupport = () => {
    // TODO: Open support email
    Linking.openURL('mailto:naninunna48@gmail.com');
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>App Version</ThemedText>
        <InfoItem
          label="Version"
          value="1.0.0"
          icon="info.circle"
        />
        <InfoItem
          label="Build"
          value="100"
          icon="hammer"
        />
       
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Support</ThemedText>
        <InfoItem
          label="Contact Support"
          icon="envelope"
          onPress={handleSupport}
        />
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Credits</ThemedText>
        <InfoItem
          label="Developers"
          value="Pentecostal movement"
          icon="person.2"
          valueStyle={{ fontSize: 10 }}
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
  infoItem: {
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  itemValue: {
    fontSize: 16,
    color: Colors.light.icon,
  },
}); 