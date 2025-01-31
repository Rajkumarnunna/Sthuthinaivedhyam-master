import React, { useState } from 'react';
import { StyleSheet, View, Switch } from 'react-native';
import { ThemedText } from '../ThemedText';
import { IconSymbol } from '../ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import type { SFSymbols6_0 } from '@/types/icons';

interface AccessibilityItemProps {
  label: string;
  description?: string;
  icon: SFSymbols6_0;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

function AccessibilityItem({ 
  label, 
  description, 
  icon, 
  value, 
  onValueChange 
}: AccessibilityItemProps) {
  return (
    <View style={styles.accessibilityItem}>
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
    </View>
  );
}

export function AccessibilitySettings() {
  const [screenReader, setScreenReader] = useState(false);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  return (
    <View style={styles.container}>
      <AccessibilityItem
        label="Screen Reader"
        description="Enable VoiceOver/TalkBack support"
        icon="accessibility"
        value={screenReader}
        onValueChange={setScreenReader}
      />

      <AccessibilityItem
        label="Haptic Feedback"
        description="Vibrate on interactions"
        icon="iphone.radiowaves.left.and.right"
        value={hapticFeedback}
        onValueChange={setHapticFeedback}
      />

      <AccessibilityItem
        label="High Contrast"
        description="Increase contrast for better visibility"
        icon="circle.lefthalf.filled"
        value={highContrast}
        onValueChange={setHighContrast}
      />

      <AccessibilityItem
        label="Reduce Motion"
        description="Minimize animations and motion effects"
        icon="hand.raised.slash"
        value={reduceMotion}
        onValueChange={setReduceMotion}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  accessibilityItem: {
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