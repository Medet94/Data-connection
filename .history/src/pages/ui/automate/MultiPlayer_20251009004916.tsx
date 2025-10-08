import { useState } from 'react';
import { TrackCard } from './TrackCard';

export function MusicPlayer() {
  return (
    <div style={{ textAlign: 'center', marginTop: 0 }}>
      {tracks.length > 0 && <TrackCard track={tracks[current]} />}
    </div>
  );
}
