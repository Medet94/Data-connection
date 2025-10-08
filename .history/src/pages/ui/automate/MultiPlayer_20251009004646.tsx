import { useState } from 'react';
import { TrackCard } from './TrackCard';

export function MusicPlayer() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newTracks = files.map((file) => ({
      title: file.name.replace(/\.[^/.]+$/, ''),
      artist: 'Local file',
      mediaUrl: URL.createObjectURL(file),
      duration: 0,
    }));
    setTracks(newTracks);
    setCurrent(0);
  };

  const nextTrack = () => {
    setCurrent((prev) => (prev + 1) % tracks.length);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 20 }}>
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
