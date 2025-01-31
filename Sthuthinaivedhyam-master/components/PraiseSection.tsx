import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { IconSymbol } from './ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import type { PraiseSection } from '@/types/praise';

interface PraiseSectionHeaderProps {
  section: PraiseSection;
  onPlayAll: () => void;
  isPlaying: boolean;
}

export function PraiseSectionHeader({ section, onPlayAll, isPlaying }: PraiseSectionHeaderProps) {
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <ThemedText style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {section.title}
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            {section.endId - section.startId + 1} Praises
          </ThemedText>
        </View>
        <TouchableOpacity 
          onPress={onPlayAll} 
          style={[styles.playButton, isPlaying && styles.playingButton]}
          activeOpacity={0.7}>
          <View style={styles.playButtonContent}>
            <IconSymbol
              name={isPlaying ? 'pause.fill' : 'play.fill'}
              size={24}
              color="#fff"
            />
            <ThemedText style={styles.playButtonText}>
              {isPlaying ? 'Pause' : 'Play All'}
            </ThemedText>
          </View>
          {isPlaying && (
            <View style={styles.playingIndicator}>
              <IconSymbol name="music.note" size={16} color="#fff" />
            </View>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: Colors.light.gradient.primary,
    minHeight: 90,
  },
  titleContainer: {
    flex: 1,
    marginRight: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 6,
    letterSpacing: 0.3,
    fontFamily: 'Telugu',
    flexWrap: 'wrap',
    flexShrink: 1,
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: 0.2,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  playButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  playingButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  playButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  playingIndicator: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: Colors.light.gradient.primary,
    borderRadius: 12,
    padding: 4,
    borderWidth: 2,
    borderColor: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.gradient.tertiary,
    opacity: 0.2,
  },
}); 