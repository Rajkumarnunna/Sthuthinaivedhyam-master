// This file is a fallback for using MaterialIcons on Android and web.

import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import type { SFSymbols6_0 } from '@/types/icons';

// Map SF Symbols to Ionicons
const iconMap: Record<SFSymbols6_0, string> = {
  // Settings icons
  'gear': 'settings-outline',
  'bell': 'notifications-outline',
  'doc': 'document-text-outline',
  'info': 'information-circle-outline',
  'book': 'book-outline',
  'chevron.right': 'chevron-forward',
  'xmark': 'close',
  'checkmark': 'checkmark',
  'sun.max': 'sunny',
  'moon': 'moon',
  'textformat': 'text',
  'character': 'text',
  'text.alignleft': 'text',
  'text.aligncenter': 'text',
  'text.alignright': 'text',
  
  // Praise tab icons
  'music.note': 'musical-note',
  'chevron.left': 'chevron-back',
  'search': 'search',
  'play.fill': 'play',
  'pause.fill': 'pause',
  'forward.end.fill': 'play-forward',
  'backward.end.fill': 'play-back',
  'goforward.10': 'play-forward',
  'gobackward.10': 'play-back',
  'repeat': 'repeat',
  'play.circle': 'play-circle',
};

interface IconSymbolProps {
  name: SFSymbols6_0;
  size: number;
  color: string;
}

export function IconSymbol({ name, size, color }: IconSymbolProps) {
  return (
    <Ionicons 
      name={iconMap[name] as any} 
      size={size} 
      color={color}
    />
  );
}
