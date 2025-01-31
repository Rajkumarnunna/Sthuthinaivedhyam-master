import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import { ThemedText } from './ThemedText';
import { IconSymbol } from './ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useDisplaySettings } from '@/contexts/DisplaySettingsContext';
import type { PraiseItem } from '@/types/praise';

interface AudioPlayerProps {
  audioFile: any;
  currentPraise: PraiseItem | null;
  isPlaying: boolean;
  duration: number;
  position: number;
  playbackSpeed: number;
  isRepeatOn: boolean;
  isAutoPlayOn: boolean;
  onPlayPause: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onSeek: (value: number) => void;
  onSpeedChange: () => void;
  onToggleRepeat: () => void;
  onToggleAutoPlay: () => void;
  onSeekBack: () => void;
  onSeekForward: () => void;
}

export function AudioPlayer({
  audioFile,
  currentPraise,
  isPlaying,
  duration,
  position,
  playbackSpeed,
  isRepeatOn,
  isAutoPlayOn,
  onPlayPause,
  onNext,
  onPrevious,
  onSeek,
  onSpeedChange,
  onToggleRepeat,
  onToggleAutoPlay,
  onSeekBack,
  onSeekForward,
}: AudioPlayerProps) {
  const { currentTheme } = useDisplaySettings();
  const [sound, setSound] = useState<Audio.Sound>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (audioFile) {
      loadAudio();
    }
  }, [audioFile]);

  const loadAudio = async () => {
    try {
      setIsLoading(true);
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        audioFile,
        { 
          shouldPlay: isPlaying,
          rate: playbackSpeed,
          isLooping: isRepeatOn,
          progressUpdateIntervalMillis: 100,
        },
        onPlaybackStatusUpdate
      );
      setSound(newSound);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading audio:', error);
      setIsLoading(false);
    }
  };

  const onPlaybackStatusUpdate = useCallback((status: any) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis || 0);
      setPosition(status.positionMillis || 0);
      setIsPlaying(status.isPlaying);

      if (status.didJustFinish) {
        if (isRepeatOn) {
          sound?.replayAsync();
        } else if (isAutoPlayOn && onNext) {
          onNext();
        } else {
          setIsPlaying(false);
        }
      }
    }
  }, [isRepeatOn, isAutoPlayOn, onNext, sound]);

  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getSpeedText = () => {
    return playbackSpeed === 1 ? '1x' : `${playbackSpeed}x`;
  };

  return (
    <View style={[
      styles.container,
      { 
        backgroundColor: Colors[currentTheme].cardBackground,
        borderTopColor: Colors[currentTheme].border 
      }
    ]}>
      <View style={styles.progressContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onSlidingComplete={onSeek}
          minimumTrackTintColor={Colors[currentTheme].gradient.primary}
          maximumTrackTintColor={Colors[currentTheme].border}
          thumbTintColor={Colors[currentTheme].gradient.primary}
        />
        <View style={styles.timeInfo}>
          <ThemedText style={styles.timeText}>{formatTime(position)}</ThemedText>
          <ThemedText style={styles.timeText}>{formatTime(duration)}</ThemedText>
        </View>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.mainControls}>
          <TouchableOpacity onPress={onSeekBack} style={[
            styles.seekButton,
            { backgroundColor: Colors[currentTheme].gradient.tertiary + '20' }
          ]}>
            <IconSymbol name="gobackward.10" size={24} color={Colors[currentTheme].text} />
          </TouchableOpacity>

          <TouchableOpacity onPress={onPrevious} style={[
            styles.seekButton,
            { backgroundColor: Colors[currentTheme].gradient.tertiary + '20' }
          ]}>
            <IconSymbol name="backward.end.fill" size={24} color={Colors[currentTheme].text} />
          </TouchableOpacity>

          <TouchableOpacity onPress={onPlayPause} style={[
            styles.playButton,
            { 
              backgroundColor: Colors[currentTheme].gradient.primary,
              shadowColor: Colors[currentTheme].gradient.primary 
            }
          ]}>
            <IconSymbol
              name={isPlaying ? 'pause.fill' : 'play.fill'}
              size={32}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={onNext} style={[
            styles.seekButton,
            { backgroundColor: Colors[currentTheme].gradient.tertiary + '20' }
          ]}>
            <IconSymbol name="forward.end.fill" size={24} color={Colors[currentTheme].text} />
          </TouchableOpacity>

          <TouchableOpacity onPress={onSeekForward} style={[
            styles.seekButton,
            { backgroundColor: Colors[currentTheme].gradient.tertiary + '20' }
          ]}>
            <IconSymbol name="goforward.10" size={24} color={Colors[currentTheme].text} />
          </TouchableOpacity>
        </View>

        <View style={styles.secondaryControls}>
          <TouchableOpacity 
            onPress={onSpeedChange}
            style={[
              styles.controlButton, 
              { borderColor: Colors[currentTheme].gradient.primary },
              playbackSpeed !== 1 && [
                styles.activeButton,
                { backgroundColor: Colors[currentTheme].gradient.primary }
              ]
            ]}>
            <ThemedText style={[
              styles.speedText, 
              { color: Colors[currentTheme].gradient.primary },
              playbackSpeed !== 1 && styles.activeText
            ]}>
              {playbackSpeed}x
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={onToggleRepeat}
            style={[
              styles.controlButton,
              { borderColor: Colors[currentTheme].gradient.primary },
              isRepeatOn && [
                styles.activeButton,
                { backgroundColor: Colors[currentTheme].gradient.primary }
              ]
            ]}>
            <IconSymbol 
              name="repeat" 
              size={18} 
              color={isRepeatOn ? '#fff' : Colors[currentTheme].gradient.primary} 
            />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={onToggleAutoPlay}
            style={[
              styles.controlButton,
              { borderColor: Colors[currentTheme].gradient.primary },
              isAutoPlayOn && [
                styles.activeButton,
                { backgroundColor: Colors[currentTheme].gradient.primary }
              ]
            ]}>
            <IconSymbol 
              name="play.circle" 
              size={18} 
              color={isAutoPlayOn ? '#fff' : Colors[currentTheme].gradient.primary} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 16,
    borderTopWidth: 1,
  },
  progressContainer: {
    paddingHorizontal: 16,
  },
  slider: {
    height: 40,
    marginHorizontal: -8,
  },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -8,
    paddingHorizontal: 8,
  },
  timeText: {
    fontSize: 12,
    color: Colors.light.icon,
  },
  mainContent: {
    paddingHorizontal: 16,
    gap: 16,
  },
  mainControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 8,
  },
  secondaryControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  seekButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.light.gradient.tertiary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.light.gradient.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.light.gradient.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  controlButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.light.gradient.primary,
  },
  activeButton: {
    backgroundColor: Colors.light.gradient.primary,
    borderColor: Colors.light.gradient.primary,
  },
  speedText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.gradient.primary,
  },
  activeText: {
    color: '#fff',
  },
}); 