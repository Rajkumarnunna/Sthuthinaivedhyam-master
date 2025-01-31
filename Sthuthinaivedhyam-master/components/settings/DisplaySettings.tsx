import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Modal } from 'react-native';
import { ThemedText } from '../ThemedText';
import { IconSymbol } from '../ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useDisplaySettings } from '@/contexts/DisplaySettingsContext';
import type { SFSymbols6_0 } from '@/types/icons';

interface SettingItemProps {
  label: string;
  value: string;
  icon: SFSymbols6_0;
  onPress: () => void;
  styles: any;
  currentTheme: 'light' | 'dark';
}

function SettingItem({ label, value, icon, onPress, styles, currentTheme }: SettingItemProps) {
  return (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingLeft}>
        <IconSymbol 
          name={icon} 
          size={20} 
          color={Colors[currentTheme].gradient.primary} 
        />
        <ThemedText style={styles.settingLabel}>{label}</ThemedText>
      </View>
      <View style={styles.settingRight}>
        <ThemedText style={styles.settingValue}>{value}</ThemedText>
        <IconSymbol 
          name="chevron.right" 
          size={16} 
          color={Colors[currentTheme].icon} 
        />
      </View>
    </TouchableOpacity>
  );
}

interface OptionModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  options: { label: string; value: string }[];
  selectedValue: string;
  onSelect: (value: any) => void;
  styles: any;
  currentTheme: 'light' | 'dark';
}

function OptionModal({ 
  visible, 
  onClose, 
  title, 
  options, 
  selectedValue, 
  onSelect,
  styles,
  currentTheme,
}: OptionModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <ThemedText style={styles.modalTitle}>{title}</ThemedText>
            <TouchableOpacity onPress={onClose}>
              <IconSymbol 
                name="xmark" 
                size={24} 
                color={Colors[currentTheme].icon} 
              />
            </TouchableOpacity>
          </View>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.optionItem}
              onPress={() => {
                onSelect(option.value);
                onClose();
              }}
            >
              <ThemedText style={styles.optionLabel}>{option.label}</ThemedText>
              {selectedValue === option.value && (
                <IconSymbol 
                  name="checkmark" 
                  size={20} 
                  color={Colors[currentTheme].gradient.primary} 
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
}

// Static styles that don't depend on theme
const baseStyles = StyleSheet.create({
  container: {
    gap: 24,
    padding: 16,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  optionLabel: {
    fontSize: 16,
  },
});

export function DisplaySettings() {
  const { 
    fontSize, 
    theme,
    currentTheme, 
    teluguFont, 
    textAlignment,
    setFontSize,
    setTheme,
    setTeluguFont,
    setTextAlignment,
    toggleTheme,
  } = useDisplaySettings();

  const [modalType, setModalType] = useState<string | null>(null);

  // Dynamic styles that depend on theme
  const styles = React.useMemo(() => ({
    ...baseStyles,
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: Colors[currentTheme].cardBackground,
      padding: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: Colors[currentTheme].border,
    },
    settingValue: {
      fontSize: 16,
      color: Colors[currentTheme].icon,
    },
    modalContent: {
      backgroundColor: Colors[currentTheme].background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 16,
      maxHeight: '80%',
    },
    modalHeader: {
      ...baseStyles.modalHeader,
      borderBottomWidth: 1,
      borderBottomColor: Colors[currentTheme].border,
    },
    optionItem: {
      ...baseStyles.optionItem,
      borderBottomWidth: 1,
      borderBottomColor: Colors[currentTheme].border,
    },
    themeToggle: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderRadius: 12,
      backgroundColor: Colors[currentTheme].cardBackground,
      borderWidth: 1,
      borderColor: Colors[currentTheme].border,
      marginTop: 8,
    },
    themeToggleText: {
      marginLeft: 12,
      fontSize: 16,
      fontWeight: '500',
      color: Colors[currentTheme].text,
    },
  }), [currentTheme]);

  const fontSizeOptions = [
    { label: 'చిన్నది (14px)', value: 'small' },
    { label: 'మధ్యమం (16px)', value: 'medium' },
    { label: 'పెద్దది (18px)', value: 'large' },
    { label: 'చాలా పెద్దది (20px)', value: 'xlarge' },
  ];

  const themeOptions = [
    { label: 'తెలుపు', value: 'light' },
    { label: 'నలుపు', value: 'dark' },
    { label: 'సిస్టమ్', value: 'system' },
  ];

  const teluguFontOptions = [
    { label: 'డిఫాల్ట్', value: 'System' },
    { label: 'స్పేస్ మోనో', value: 'SpaceMono' },
    { label: 'మల్లన్న', value: 'Mallanna' },
    { label: 'మండలి', value: 'Mandali' },
    { label: 'రామభద్ర', value: 'Ramabhadra' },
  ];

  const alignmentOptions = [
    { label: 'ఎడమ', value: 'left' },
    { label: 'మధ్య', value: 'center' },
    { label: 'కుడి', value: 'right' },
  ];

  const getFontSizeLabel = () => {
    return fontSizeOptions.find(opt => opt.value === fontSize)?.label || 'Medium';
  };

  const getThemeLabel = () => {
    return themeOptions.find(opt => opt.value === theme)?.label || 'System';
  };

  const getTeluguFontLabel = () => {
    return teluguFontOptions.find(opt => opt.value === teluguFont)?.label || 'Default';
  };

  const getAlignmentLabel = () => {
    return alignmentOptions.find(opt => opt.value === textAlignment)?.label || 'Left';
  };

  const getAlignmentIcon = (alignment: string): SFSymbols6_0 => {
    switch (alignment) {
      case 'left':
        return 'text.alignleft';
      case 'center':
        return 'text.aligncenter';
      case 'right':
        return 'text.alignright';
      default:
        return 'text.alignleft';
    }
  };

  return (
    <View style={styles.container}>
      {/* Display Section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>ప్రదర్శన</ThemedText>
        
        <SettingItem
          label="అక్షర పరిమాణం"
          value={getFontSizeLabel()}
          icon="textformat"
          onPress={() => setModalType('fontSize')}
          styles={styles}
          currentTheme={currentTheme}
        />

        <SettingItem
          label="థీమ్"
          value={getThemeLabel()}
          icon="circle.righthalf.fill"
          onPress={() => setModalType('theme')}
          styles={styles}
          currentTheme={currentTheme}
        />

        <TouchableOpacity 
          style={styles.themeToggle}
          onPress={toggleTheme}
        >
          <IconSymbol 
            name={currentTheme === 'dark' ? "sun.max" : "moon"}
            size={20} 
            color={Colors[currentTheme].gradient.primary} 
          />
          <ThemedText style={styles.themeToggleText}>
            {currentTheme === 'dark' ? 'తెలుపు' : 'నలుపు'} థీమ్‌కి మారండి
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Text Section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>టెక్స్ట్</ThemedText>
        
        <SettingItem
          label="తెలుగు ఫాంట్"
          value={getTeluguFontLabel()}
          icon="character"
          onPress={() => setModalType('teluguFont')}
          styles={styles}
          currentTheme={currentTheme}
        />

        <SettingItem
          label="టెక్స్ట్ అలైన్మెంట్"
          value={getAlignmentLabel()}
          icon={getAlignmentIcon(textAlignment)}
          onPress={() => setModalType('alignment')}
          styles={styles}
          currentTheme={currentTheme}
        />
      </View>

      {/* Option Modals */}
      <OptionModal
        visible={modalType === 'fontSize'}
        onClose={() => setModalType(null)}
        title="అక్షర పరిమాణం ఎంచుకోండి"
        options={fontSizeOptions}
        selectedValue={fontSize}
        onSelect={setFontSize}
        styles={styles}
        currentTheme={currentTheme}
      />

      <OptionModal
        visible={modalType === 'theme'}
        onClose={() => setModalType(null)}
        title="థీమ్ ఎంచుకోండి"
        options={themeOptions}
        selectedValue={theme}
        onSelect={setTheme}
        styles={styles}
        currentTheme={currentTheme}
      />

      <OptionModal
        visible={modalType === 'teluguFont'}
        onClose={() => setModalType(null)}
        title="తెలుగు ఫాంట్ ఎంచుకోండి"
        options={teluguFontOptions}
        selectedValue={teluguFont}
        onSelect={setTeluguFont}
        styles={styles}
        currentTheme={currentTheme}
      />

      <OptionModal
        visible={modalType === 'alignment'}
        onClose={() => setModalType(null)}
        title="టెక్స్ట్ అలైన్మెంట్ ఎంచుకోండి"
        options={alignmentOptions}
        selectedValue={textAlignment}
        onSelect={setTextAlignment}
        styles={styles}
        currentTheme={currentTheme}
      />
    </View>
  );
} 