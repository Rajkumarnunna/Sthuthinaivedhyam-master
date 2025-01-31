import { StyleSheet } from 'react-native';
import { useDisplaySettings } from '@/contexts/DisplaySettingsContext';
import { Colors } from '@/constants/Colors';

export function useDisplayStyles() {
  const { fontSize, textAlignment, teluguFont, currentTheme } = useDisplaySettings();

  const getFontSize = () => {
    switch (fontSize) {
      case 'small':
        return 14;
      case 'large':
        return 18;
      case 'xlarge':
        return 20;
      default:
        return 16; // medium
    }
  };

  const styles = StyleSheet.create({
    text: {
      fontSize: getFontSize(),
      textAlign: textAlignment,
      ...(teluguFont !== 'System' && {
        fontFamily: teluguFont,
      }),
      color: Colors[currentTheme].text,
    },
    title: {
      fontSize: getFontSize() + 4,
      textAlign: textAlignment,
      fontFamily: teluguFont,
      fontWeight: '600',
      color: Colors[currentTheme].text,
    },
    subtitle: {
      fontSize: getFontSize() - 2,
      textAlign: textAlignment,
      fontFamily: teluguFont,
      opacity: 0.7,
      color: Colors[currentTheme].text,
    },
  });

  return styles;
} 