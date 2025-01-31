import { View, ViewProps } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useDisplaySettings } from '@/contexts/DisplaySettingsContext';

export function ThemedView(props: ViewProps) {
  const { style, ...otherProps } = props;
  const { currentTheme } = useDisplaySettings();

  return (
    <View
      style={[
        { backgroundColor: Colors[currentTheme].background },
        style,
      ]}
      {...otherProps}
    />
  );
}
