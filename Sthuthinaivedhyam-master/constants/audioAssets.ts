// Map all audio files
const audioFiles = {
  praise1: require('../assets/audio/praise1.mp3'),
  praise2: require('../assets/audio/praise2.mp3'),
  praise3: require('../assets/audio/praise3.mp3'),
  praise4: require('../assets/audio/praise4.mp3'),
  praise5: require('../assets/audio/praise5.mp3'),
  praise6: require('../assets/audio/praise6.mp3'),
  praise7: require('../assets/audio/praise7.mp3'),
  praise8: require('../assets/audio/praise8.mp3'),
  praise9: require('../assets/audio/praise9.mp3'),
  praise10: require('../assets/audio/praise10.mp3'),
  praise11: require('../assets/audio/praise11.mp3'),
  praise12: require('../assets/audio/praise12.mp3'),
  praise13: require('../assets/audio/praise13.mp3'),
  praise14: require('../assets/audio/praise14.mp3'),
  praise15: require('../assets/audio/praise15.mp3'),
  praise16: require('../assets/audio/praise16.mp3'),
  praise17: require('../assets/audio/praise17.mp3'),
  praise18: require('../assets/audio/praise18.mp3'),
  praise19: require('../assets/audio/praise19.mp3'),
  praise20: require('../assets/audio/praise20.mp3'),
  praise21: require('../assets/audio/praise21.mp3'),
  praise22: require('../assets/audio/praise22.mp3'),
  praise23: require('../assets/audio/praise23.mp3'),
  praise24: require('../assets/audio/praise24.mp3'),
  praise25: require('../assets/audio/praise25.mp3'),
  praise26: require('../assets/audio/praise26.mp3'),
  praise27: require('../assets/audio/praise27.mp3'),
  praise28: require('../assets/audio/praise28.mp3'),
  praise29: require('../assets/audio/praise29.mp3'),
  praise30: require('../assets/audio/praise30.mp3'),
};

export const getAudioFile = (sectionId: number) => {
  const key = `praise${sectionId}` as keyof typeof audioFiles;
  return audioFiles[key];
}; 