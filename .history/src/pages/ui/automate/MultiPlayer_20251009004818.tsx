import { useState } from 'react';
import { TrackCard } from './TrackCard';

export function MusicPlayer() {
  return (
    <div style={{ textAlign: 'center', marginTop: 0 }}>
      <input
        type="file"
        accept="audio/*"
        multiple
        onChange={handleFiles}
        style={{ marginBottom: 20 }}
      />
      {tracks.length > 0 && (
        <TrackCard track={tracks[current]} onNext={nextTrack} />
      )}
    </div>
  );
}
