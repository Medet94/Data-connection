import { useEffect, useState } from 'react';
import { useUnit } from 'effector-react';
import { audioRequest } from '../../../shared/state/events';
import { $audios } from '../../../shared/state/stores';
import '../../../shared/state/connections';
import { $currentTrackIndex } from '../../../shared/state/stores';
import { nextTrackClicked } from '../../../shared/state/events';
import { Center, Flex } from '@mantine/core';
import { TrackCard } from './TrackCard';
import { MusicPlayer } from './MultiPlayer';

export default function App() {
  const [audios, currentIndex] = useUnit([$audios, $currentTrackIndex]);
  const track = audios[currentIndex];
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

  useEffect(() => {
    audioRequest();
  }, []);

  return (
    <Center flex="center" h="100vh" bg="var(--mantine-color-body)">
      <input
        type="file"
        accept="audio/*"
        multiple
        onChange={handleFiles}
        style={{ marginBottom: 20 }}
      />
      <TrackCard track={track} onNext={() => nextTrackClicked()} />
    </Center>
  );
}
