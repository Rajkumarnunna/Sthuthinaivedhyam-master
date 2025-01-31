import React, { useState, useCallback } from 'react';
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View, Keyboard, Text } from 'react-native';
import { ThemedText } from './ThemedText';
import { IconSymbol } from './ui/IconSymbol';
import type { PraiseItem, PraiseSection } from '@/types/praise';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useDisplayStyles } from '@/hooks/useDisplayStyles';
import { useDisplaySettings } from '@/contexts/DisplaySettingsContext';

interface PraiseListProps {
  section: PraiseSection;
  onPraiseSelect: (item: PraiseItem) => void;
  currentlyPlayingId: number | null;
  onSectionChange: (sectionId: number) => void;
  totalSections: number;
}

// Move static styles outside
const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionInfo: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  list: {
    padding: 16,
  },
  praiseContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  textContainer: {
    flex: 1,
  },
  clearButton: {
    padding: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    marginBottom: 8,
    opacity: 0.7,
  },
  emptyExamples: {
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 32,
  },
  emptyExample: {
    fontSize: 14,
    opacity: 0.7,
    marginVertical: 4,
  },
  emptyList: {
    flexGrow: 1,
  },
});

export function PraiseList({
  section,
  onPraiseSelect,
  currentlyPlayingId,
  onSectionChange,
  totalSections,
}: PraiseListProps) {
  const colorScheme = useColorScheme();
  const [searchQuery, setSearchQuery] = useState('');
  const { fontSize, currentTheme, teluguFont, showReferences } = useDisplaySettings();
  const displayStyles = useDisplayStyles();

  // Create dynamic styles inside the component
  const styles = React.useMemo(() => ({
    ...baseStyles,
    container: {
      ...baseStyles.container,
      backgroundColor: Colors[currentTheme].background,
    },
    praiseItem: {
      marginHorizontal: 16,
      marginBottom: 12,
      borderRadius: 16,
      backgroundColor: Colors[currentTheme].cardBackground,
      borderWidth: 1,
      borderColor: Colors[currentTheme].border,
      shadowColor: Colors[currentTheme].gradient.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
      overflow: 'hidden',
    },
    idBadge: {
      backgroundColor: Colors[currentTheme].gradient.tertiary + '20',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      minWidth: 48,
      alignItems: 'center',
    },
    praiseId: {
      fontSize: 16,
      fontWeight: '700',
      color: Colors[currentTheme].gradient.primary,
    },
    searchContainer: {
      marginHorizontal: 20,
      marginVertical: 12,
      padding: 10,
      backgroundColor: Colors[currentTheme].cardBackground,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: Colors[currentTheme].border,
      shadowColor: Colors[currentTheme].gradient.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    searchInput: {
      flex: 1,
      marginLeft: 8,
      fontSize: 15,
      color: Colors[currentTheme].text,
      ...(teluguFont !== 'System' && {
        fontFamily: teluguFont,
      }),
      paddingVertical: 6,
    },
  }), [currentTheme, teluguFont]);

  const filteredItems = section.items.filter(item => {
    const query = searchQuery.toLowerCase().trim();
    
    if (!query) return true;

    if (!isNaN(Number(query))) {
      return item.id.toString().includes(query);
    }

    const isReferenceSearch = /[0-9]/.test(query) && /[a-z]/i.test(query);
    if (isReferenceSearch) {
      return item.reference.toLowerCase().includes(query);
    }

    return (
      item.text.toLowerCase().includes(query) ||
      item.reference.toLowerCase().includes(query) ||
      item.id.toString() === query
    );
  });

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const clearSearch = () => {
    setSearchQuery('');
    Keyboard.dismiss();
  };

  const getSearchPlaceholder = () => {
    return 'స్తుతి వచనం, సూచన (ఉదా: యోహాను 3:16) లేదా ID (ఉదా: 42)';
  };

  const getFontSize = () => {
    switch (fontSize) {
      case 'small':
        return { text: 16, reference: 12 };
      case 'large':
        return { text: 20, reference: 16 };
      case 'xlarge':
        return { text: 22, reference: 18 };
      default: // medium
        return { text: 18, reference: 14 };
    }
  };

  const fontSizes = getFontSize();

  // Dynamic styles that depend on fontSizes
  const dynamicStyles = {
    praiseText: {
      fontSize: fontSizes.text,
      marginBottom: 6,
      color: Colors[currentTheme].text,
      ...(teluguFont !== 'System' && {
        fontFamily: teluguFont,
      }),
      lineHeight: fontSizes.text * 1.5,
    },
    reference: {
      fontSize: fontSizes.reference,
      color: Colors[currentTheme].icon,
      ...(teluguFont !== 'System' && {
        fontFamily: teluguFont,
      }),
    },
  };

  const renderEmptyList = () => {
    if (!searchQuery) return null;
    
    return (
      <View style={styles.emptyContainer}>
        <IconSymbol 
          name="search" 
          size={48} 
          color={Colors[currentTheme].icon} 
        />
        <ThemedText style={styles.emptyTitle}>ఫలితాలు లేవు</ThemedText>
        <ThemedText style={styles.emptyText}>
          వీటిని శోధించండి:
        </ThemedText>
        <View style={styles.emptyExamples}>
          <ThemedText style={styles.emptyExample}>• స్తుతి వచనం (ఉదా: "తండ్రి")</ThemedText>
          <ThemedText style={styles.emptyExample}>• సూచన (ఉదా: "యోహాను 3:16")</ThemedText>
          <ThemedText style={styles.emptyExample}>• స్తుతి ID (ఉదా: "42")</ThemedText>
        </View>
      </View>
    );
  };

  const renderItem = useCallback(({ item }: { item: PraiseItem }) => {
    const isPlaying = currentlyPlayingId === item.id;

    return (
      <View style={[
        styles.praiseItem,
        { backgroundColor: Colors[currentTheme].cardBackground }
      ]}>
        <View style={styles.praiseContent}>
          <View style={styles.idBadge}>
            <ThemedText style={styles.praiseId}>
              {item.id}
            </ThemedText>
          </View>
          <View style={styles.textContainer}>
            <Text style={dynamicStyles.praiseText}>
              {item.text}
            </Text>
            {showReferences && (
              <Text style={dynamicStyles.reference}>{item.reference}</Text>
            )}
          </View>
          {isPlaying && (
            <IconSymbol 
              name="music.note" 
              size={20} 
              color={Colors[currentTheme].gradient.primary} 
            />
          )}
        </View>
      </View>
    );
  }, [currentlyPlayingId, currentTheme, dynamicStyles, showReferences]);

  return (
    <View style={styles.container}>
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          onPress={() => onSectionChange(section.id - 1)}
          disabled={section.id === 1}
          style={styles.navButton}
        >
          <IconSymbol
            name="chevron.left"
            size={24}
            color={section.id === 1 ? Colors[currentTheme].border : Colors[currentTheme].gradient.primary}
          />
        </TouchableOpacity>
        <ThemedText style={styles.sectionInfo}>
          విభాగం {section.id} / {totalSections}
        </ThemedText>
        <TouchableOpacity
          onPress={() => onSectionChange(section.id + 1)}
          disabled={section.id === totalSections}
          style={styles.navButton}
        >
          <IconSymbol
            name="chevron.right"
            size={24}
            color={section.id === totalSections ? Colors[currentTheme].border : Colors[currentTheme].gradient.primary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <IconSymbol 
          name="search" 
          size={20} 
          color={Colors[currentTheme].icon} 
        />
        <TextInput
          style={styles.searchInput}
          placeholder={getSearchPlaceholder()}
          placeholderTextColor={Colors[currentTheme].icon}
          value={searchQuery}
          onChangeText={handleSearch}
          returnKeyType="search"
          clearButtonMode="while-editing"
          autoCorrect={false}
          autoCapitalize="none"
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <IconSymbol 
              name="xmark" 
              size={20} 
              color={Colors[currentTheme].icon} 
            />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={[
          styles.list,
          filteredItems.length === 0 && styles.emptyList,
        ]}
        ListEmptyComponent={renderEmptyList}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
} 