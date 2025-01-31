import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { PraiseList } from '@/components/PraiseList';
import { PraiseSectionHeader } from '@/components/PraiseSection';
import { AudioPlayer } from '@/components/AudioPlayer';
import { praises } from '@/data/praises';
import { useAudio } from '@/hooks/useAudio';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';

export default function PraisesScreen() {
  const { 
    currentSection,
    currentPraise,
    isPlaying,
    duration,
    position,
    playbackSpeed,
    isRepeatOn,
    isAutoPlayOn,
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
  } = useAudio();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <View style={styles.content}>
          <PraiseSectionHeader
            section={currentSection}
            onPlayAll={handlePlayAll}
            isPlaying={isPlaying}
          />
          <PraiseList
            section={currentSection}
            onPraiseSelect={handlePraiseSelect}
            currentlyPlayingId={currentPraise?.id}
            onSectionChange={handleSectionChange}
            totalSections={praises.length}
          />
        </View>
        {currentPraise && (
          <View style={styles.playerContainer}>
            <AudioPlayer
              audioFile={currentSection.audioFile}
              currentPraise={currentPraise}
              isPlaying={isPlaying}
              duration={duration}
              position={position}
              playbackSpeed={playbackSpeed}
              isRepeatOn={isRepeatOn}
              isAutoPlayOn={isAutoPlayOn}
              onPlayPause={handlePlayPause}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onSeek={handleSeek}
              onSpeedChange={handleSpeedChange}
              onToggleRepeat={handleToggleRepeat}
              onToggleAutoPlay={handleToggleAutoPlay}
              onSeekBack={handleSeekBack}
              onSeekForward={handleSeekForward}
            />
          </View>
        )}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  playerContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    backgroundColor: Colors.light.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
