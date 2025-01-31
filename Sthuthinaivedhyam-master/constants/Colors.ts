/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#8B5CF6';
const tintColorDark = '#A78BFA';

export const Colors = {
  light: {
    text: '#1F2937',
    background: '#F9FAFB',
    cardBackground: '#FFFFFF',
    tint: tintColorLight,
    tabIconDefault: '#6B7280',
    tabIconSelected: tintColorLight,
    border: '#E5E7EB',
    icon: '#6B7280',
    gradient: {
      primary: '#8B5CF6',
      secondary: '#A78BFA',
    },
  },
  dark: {
    text: '#F9FAFB',
    background: '#111827',
    cardBackground: '#1F2937',
    tint: tintColorDark,
    tabIconDefault: '#9CA3AF',
    tabIconSelected: tintColorDark,
    border: '#374151',
    icon: '#9CA3AF',
    gradient: {
      primary: '#A78BFA',
      secondary: '#C4B5FD',
    },
  },
};
