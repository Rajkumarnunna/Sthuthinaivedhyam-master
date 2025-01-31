import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { IconSymbol } from './ui/IconSymbol';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { BlurView } from 'expo-blur';

export function MiniPlayer() {
  const [sound, setSound] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<{
    title: string;
    duration: number;
    position: number;
  }>();

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const togglePlayback = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <BlurView intensity={80} tint="dark" style={styles.container}>
      <View style={styles.content}>
        <ThemedText numberOfLines={1} style={styles.title}>
          {currentTrack?.title || 'No track playing'}
        </ThemedText>
        <TouchableOpacity onPress={togglePlayback}>
          <IconSymbol
            name={isPlaying ? 'pause.fill' : 'play.fill'}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.progress}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${
                currentTrack
                  ? (currentTrack.position / currentTrack.duration) * 100
                  : 0
              }%`,
            },
          ]}
        />
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 49, // Height of tab bar
    left: 0,
    right: 0,
    height: 64,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    flex: 1,
  },
  title: {
    fontSize: 16,
    flex: 1,
    marginRight: 16,
  },
  progress: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
  },
}); 