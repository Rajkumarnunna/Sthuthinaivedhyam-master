import { Text, TextProps } from 'react-native';
import { useDisplayStyles } from '@/hooks/useDisplayStyles';
import { useDisplaySettings } from '@/contexts/DisplaySettingsContext';
import { Colors } from '@/constants/Colors';

export function ThemedText(props: TextProps) {
  const { style, ...otherProps } = props;
  const displayStyles = useDisplayStyles();
  const { currentTheme } = useDisplaySettings();

  return (
    <Text
      style={[
        displayStyles.text,
        { color: Colors[currentTheme].text },
        style,
      ]}
      {...otherProps}
    />
  );
}

const styles = {
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
};
