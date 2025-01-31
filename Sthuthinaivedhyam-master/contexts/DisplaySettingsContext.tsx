import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useSystemColorScheme } from 'react-native';

type FontSize = 'small' | 'medium' | 'large' | 'xlarge';
type Theme = 'light' | 'dark' | 'system';
type TeluguFont = 'System' | 'SpaceMono' | 'Mallanna' | 'Mandali' | 'Ramabhadra';
type TextAlignment = 'left' | 'center' | 'right';

interface DisplaySettings {
  fontSize: FontSize;
  theme: Theme;
  teluguFont: TeluguFont;
  textAlignment: TextAlignment;
  currentTheme: 'light' | 'dark';
  showReferences: boolean;
}

interface DisplaySettingsContextType extends DisplaySettings {
  setFontSize: (size: FontSize) => Promise<void>;
  setTheme: (theme: Theme) => Promise<void>;
  setTeluguFont: (font: TeluguFont) => Promise<void>;
  setTextAlignment: (alignment: TextAlignment) => Promise<void>;
  toggleTheme: () => Promise<void>;
  setShowReferences: (show: boolean) => void;
}

const DisplaySettingsContext = createContext<DisplaySettingsContextType | null>(null);

export function useDisplaySettings() {
  const context = useContext(DisplaySettingsContext);
  if (!context) {
    throw new Error('useDisplaySettings must be used within a DisplaySettingsProvider');
  }
  return context;
}

export const DisplaySettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const systemColorScheme = useSystemColorScheme();
  const [fontSize, setFontSizeState] = useState<FontSize>('medium');
  const [theme, setThemeState] = useState<Theme>('system');
  const [teluguFont, setTeluguFontState] = useState<TeluguFont>('System');
  const [textAlignment, setTextAlignmentState] = useState<TextAlignment>('left');
  const [showReferences, setShowReferences] = useState(true);

  // Calculate current theme based on system preference and user setting
  const currentTheme = React.useMemo(() => {
    if (theme === 'system') {
      return systemColorScheme ?? 'light';
    }
    return theme;
  }, [theme, systemColorScheme]);

  // Toggle between light and dark themes
  const toggleTheme = useCallback(async () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    try {
      await AsyncStorage.setItem('@display_theme', newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  }, [currentTheme]);

  const setFontSize = useCallback(async (size: FontSize) => {
    try {
      await AsyncStorage.setItem('@display_fontSize', size);
      setFontSizeState(size);
    } catch (error) {
      console.error('Error saving font size:', error);
    }
  }, []);

  const setTheme = useCallback(async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem('@display_theme', newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  }, []);

  const setTeluguFont = useCallback(async (font: TeluguFont) => {
    try {
      await AsyncStorage.setItem('@display_teluguFont', font);
      setTeluguFontState(font);
    } catch (error) {
      console.error('Error saving Telugu font:', error);
    }
  }, []);

  const setTextAlignment = useCallback(async (alignment: TextAlignment) => {
    try {
      await AsyncStorage.setItem('@display_textAlignment', alignment);
      setTextAlignmentState(alignment);
    } catch (error) {
      console.error('Error saving text alignment:', error);
    }
  }, []);

  // Add persistence for showReferences
  const setShowReferencesWithStorage = useCallback(async (show: boolean) => {
    try {
      await AsyncStorage.setItem('@display_showReferences', JSON.stringify(show));
      setShowReferences(show);
    } catch (error) {
      console.error('Error saving show references setting:', error);
    }
  }, []);

  // Combined load settings effect
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('@display_theme');
        if (savedTheme) {
          setThemeState(savedTheme as Theme);
        } else {
          setThemeState('system');
        }
        
        const [
          savedFontSize, 
          savedTeluguFont, 
          savedTextAlignment,
          savedShowReferences
        ] = await Promise.all([
          AsyncStorage.getItem('@display_fontSize'),
          AsyncStorage.getItem('@display_teluguFont'),
          AsyncStorage.getItem('@display_textAlignment'),
          AsyncStorage.getItem('@display_showReferences'),
        ]);

        if (savedFontSize) setFontSizeState(savedFontSize as FontSize);
        if (savedTeluguFont) setTeluguFontState(savedTeluguFont as TeluguFont);
        if (savedTextAlignment) setTextAlignmentState(savedTextAlignment as TextAlignment);
        if (savedShowReferences !== null) {
          setShowReferences(JSON.parse(savedShowReferences));
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };

    loadSettings();
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    if (theme === 'system') {
      // Update the theme when system preference changes
      const newTheme = systemColorScheme ?? 'light';
      // You might want to persist this or handle it differently
      console.log('System theme changed to:', newTheme);
    }
  }, [systemColorScheme, theme]);

  const value = {
    fontSize,
    theme,
    teluguFont,
    textAlignment,
    currentTheme,
    showReferences,
    setFontSize,
    setTheme,
    setTeluguFont,
    setTextAlignment,
    toggleTheme,
    setShowReferences: setShowReferencesWithStorage,
  };

  return (
    <DisplaySettingsContext.Provider value={value}>
      {children}
    </DisplaySettingsContext.Provider>
  );
};

export function useAppTheme() {
  const systemColorScheme = useSystemColorScheme();
  const { theme } = useDisplaySettings();

  switch (theme) {
    case 'light':
      return 'light';
    case 'dark':
      return 'dark';
    default:
      return systemColorScheme ?? 'light';
  }
} 