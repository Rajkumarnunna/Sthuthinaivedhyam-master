import { useState, useCallback, useEffect } from 'react';
import { Audio } from 'expo-av';
import { praises } from '@/data/praises';
import { getAudioFile } from '@/constants/audioAssets';
import type { PraiseItem } from '@/types/praise';

export function useAudio() {
  const [currentSectionId, setCurrentSectionId] = useState(1);
  const [currentPraise, setCurrentPraise] = useState<PraiseItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound>();
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [isRepeatOn, setIsRepeatOn] = useState(false);
  const [isAutoPlayOn, setIsAutoPlayOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentSection = praises[currentSectionId - 1];

  // Initialize audio session
  useEffect(() => {
    const setupAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          shouldDuckAndroid: true,
        });
      } catch (error) {
        console.error('Error setting up audio:', error);
      }
    };
    setupAudio();
  }, []);

  // Cleanup sound on unmount
  useEffect(() => {
    return () => {
      if (sound) {
        (async () => {
          try {
            const status = await sound.getStatusAsync();
            if (status.isLoaded) {
              await sound.unloadAsync();
            }
          } catch (error) {
            // Ignore cleanup errors on unmount
            console.log('Cleanup on unmount skipped:', error);
          }
        })();
      }
    };
  }, [sound]);

  // Stop and unload audio when changing sections
  useEffect(() => {
    const cleanup = async () => {
      if (sound) {
        try {
          const status = await sound.getStatusAsync();
          if (status.isLoaded) {
            await sound.stopAsync();
            await sound.unloadAsync();
          }
        } catch (error) {
          // Ignore cleanup errors on section change
          console.log('Section change cleanup skipped:', error);
        }
        setSound(undefined);
        setIsPlaying(false);
      }
    };
    cleanup();
  }, [currentSectionId]);

  const onPlaybackStatusUpdate = useCallback((status: any) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis || 0);
      setPosition(status.positionMillis || 0);
      setIsPlaying(status.isPlaying);

      if (status.didJustFinish) {
        if (isRepeatOn) {
          sound?.replayAsync();
        } else if (isAutoPlayOn) {
          // Find next praise in section
          const currentIndex = currentSection.items.findIndex(item => item.id === currentPraise?.id);
          if (currentIndex < currentSection.items.length - 1) {
            // Play next praise in same section
            setCurrentPraise(currentSection.items[currentIndex + 1]);
            loadAndPlayAudio();
          } else if (currentSectionId < praises.length) {
            // Move to next section's first praise
            setCurrentSectionId(prev => prev + 1);
            setCurrentPraise(praises[currentSectionId].items[0]);
            loadAndPlayAudio();
          } else {
            // End of all sections
            setIsPlaying(false);
          }
        } else {
          setIsPlaying(false);
        }
      }
    }
  }, [isRepeatOn, isAutoPlayOn, currentSection, currentPraise, currentSectionId, sound]);

  const loadAndPlayAudio = useCallback(async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      
      // Cleanup existing sound
      if (sound) {
        try {
          const status = await sound.getStatusAsync();
          if (status.isLoaded) {
            await sound.stopAsync();
            await sound.unloadAsync();
          }
        } catch (error) {
          // Ignore cleanup errors, just log them
          console.log('Sound cleanup skipped:', error);
        }
        setSound(undefined);
      }

      // Get current praise or first praise of section
      const praiseToPlay = currentPraise || currentSection.items[0];
      if (!praiseToPlay) {
        console.error('No praise available to play');
        return;
      }

      const audioFile = getAudioFile(currentSectionId);
      if (!audioFile) {
        console.error('Audio file not found');
        return;
      }

      // Create and load new sound
      const { sound: newSound } = await Audio.Sound.createAsync(
        audioFile,
        { 
          shouldPlay: true,
          rate: playbackSpeed,
          isLooping: isRepeatOn,
          progressUpdateIntervalMillis: 100,
          positionMillis: 0,
        },
        onPlaybackStatusUpdate
      );

      setSound(newSound);
      setIsPlaying(true);
    } catch (error) {
      console.error('Error loading audio:', error);
      setIsPlaying(false);
      setSound(undefined);
    } finally {
      setIsLoading(false);
    }
  }, [currentPraise, currentSection, currentSectionId, playbackSpeed, isRepeatOn, onPlaybackStatusUpdate, sound]);

  const handleSeek = useCallback(async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value);
      setPosition(value);
    }
  }, [sound]);

  const handleSpeedChange = useCallback(async () => {
    const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    setPlaybackSpeed(nextSpeed);
    
    if (sound) {
      await sound.setRateAsync(nextSpeed, true);
    }
  }, [sound, playbackSpeed]);

  const handleToggleRepeat = useCallback(async () => {
    setIsRepeatOn(prev => !prev);
    if (sound) {
      await sound.setIsLoopingAsync(!isRepeatOn);
    }
  }, [sound, isRepeatOn]);

  const handleToggleAutoPlay = useCallback(() => {
    setIsAutoPlayOn(prev => !prev);
  }, []);

  const handleSeekBack = useCallback(async () => {
    if (sound) {
      const newPosition = Math.max(0, position - 10000);
      await sound.setPositionAsync(newPosition);
    }
  }, [sound, position]);

  const handleSeekForward = useCallback(async () => {
    if (sound) {
      const newPosition = Math.min(duration, position + 10000);
      await sound.setPositionAsync(newPosition);
    }
  }, [sound, position, duration]);

  const handlePraiseSelect = useCallback(async (praise: PraiseItem) => {
    setCurrentPraise(praise);
    await loadAndPlayAudio();
  }, []);

  const handlePlayPause = useCallback(async () => {
    if (isLoading) return;

    try {
      if (isPlaying) {
        // If playing, just pause
        if (sound) {
          await sound.pauseAsync();
          setIsPlaying(false);
        }
      } else {
        // If not playing
        if (!currentPraise) {
          // If no praise selected, start with first one
          const firstPraise = currentSection.items[0];
          setCurrentPraise(firstPraise);
          await new Promise(resolve => setTimeout(resolve, 100));
          await loadAndPlayAudio();
        } else {
          // If praise is selected
          if (!sound) {
            // If no sound loaded, load and play
            await loadAndPlayAudio();
          } else {
            // If sound is loaded, just resume
            try {
              const status = await sound.getStatusAsync();
              if (status.isLoaded) {
                await sound.playAsync();
                setIsPlaying(true);
              } else {
                // If sound is not properly loaded, reload it
                await loadAndPlayAudio();
              }
            } catch (error) {
              // If error checking status, reload sound
              console.error('Error checking sound status:', error);
              await loadAndPlayAudio();
            }
          }
        }
      }
    } catch (error) {
      console.error('Error in play/pause:', error);
      // Reset state on error
      setIsPlaying(false);
      if (sound) {
        try {
          await sound.unloadAsync();
        } catch (unloadError) {
          console.error('Error unloading sound:', unloadError);
        }
        setSound(undefined);
      }
    }
  }, [sound, isPlaying, currentPraise, currentSection, isLoading, loadAndPlayAudio]);

  const handlePlayAll = useCallback(async () => {
    try {
      if (isPlaying) {
        // If already playing, pause
        if (sound) {
          await sound.pauseAsync();
          setIsPlaying(false);
        }
      } else {
        // Always start with first praise when using Play All
        const firstPraise = currentSection.items[0];
        setCurrentPraise(firstPraise);
        
        // Wait for state update
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Load and play the audio
        await loadAndPlayAudio();
      }
    } catch (error) {
      console.error('Error in play all:', error);
      // Reset state on error
      setIsPlaying(false);
      if (sound) {
        await sound.unloadAsync();
        setSound(undefined);
      }
    }
  }, [currentSection, sound, isPlaying, loadAndPlayAudio]);

  const handleSectionChange = useCallback(async (newSectionId: number) => {
    try {
      if (sound) {
        try {
          const status = await sound.getStatusAsync();
          if (status.isLoaded) {
            await sound.stopAsync();
            await sound.unloadAsync();
          }
        } catch (error) {
          console.log('Section change sound cleanup skipped:', error);
        }
        setSound(undefined);
      }
      setIsPlaying(false);
      setCurrentPraise(null);
      setCurrentSectionId(newSectionId);
    } catch (error) {
      console.error('Error changing section:', error);
    }
  }, [sound]);

  const handleNext = useCallback(async () => {
    const currentIndex = currentSection.items.findIndex(item => item.id === currentPraise?.id);
    if (currentIndex < currentSection.items.length - 1) {
      setCurrentPraise(currentSection.items[currentIndex + 1]);
      await loadAndPlayAudio();
    } else if (currentSectionId < praises.length) {
      setCurrentSectionId(prev => prev + 1);
      setCurrentPraise(praises[currentSectionId].items[0]);
      await loadAndPlayAudio();
    }
  }, [currentSection, currentPraise, currentSectionId]);

  const handlePrevious = useCallback(async () => {
    const currentIndex = currentSection.items.findIndex(item => item.id === currentPraise?.id);
    if (currentIndex > 0) {
      setCurrentPraise(currentSection.items[currentIndex - 1]);
      await loadAndPlayAudio();
    } else if (currentSectionId > 1) {
      setCurrentSectionId(prev => prev - 1);
      const prevSection = praises[currentSectionId - 2];
      setCurrentPraise(prevSection.items[prevSection.items.length - 1]);
      await loadAndPlayAudio();
    }
  }, [currentSection, currentPraise, currentSectionId]);

  return {
    currentSection,
    currentPraise,
    isPlaying,
    duration,
    position,
    playbackSpeed,
    isRepeatOn,
    isAutoPlayOn,
    isLoading,
    handlePraiseSelect,
    handlePlayAll,
    handleSectionChange,
    handlePlayPause,
    handleNext,
    handlePrevious,
    handleSeek,
    handleSpeedChange,
    handleToggleRepeat,
    handleToggleAutoPlay,
    handleSeekBack,
    handleSeekForward,
  };
} 