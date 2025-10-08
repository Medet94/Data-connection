import { useState } from 'react';
import { Button } from '@mantine/core';
import { TrackCard } from './Audio';

export default function MusicPlayer() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);

  // Обработчик выбора файлов
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newTracks = files.map((file) => ({
      title: file.name.replace(/\.[^/.]+$/, ''), // убираем ".mp3"
      artist: 'Local file',
      mediaUrl: URL.createObjectURL(file), // создаём ссылку на локальный blob
      duration: 0,
    }));
    setTracks(newTracks);
    setCurrent(0);
  };

  const nextTrack = () => {
    setCurrent((prev) => (prev + 1) % tracks.length);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
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
