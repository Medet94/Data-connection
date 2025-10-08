import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { audioRequest } from '../../../shared/state/events';
import { $audios } from '../../../shared/state/stores';
import '../../../shared/state/connections';
import { $currentTrackIndex } from '../../../shared/state/stores';
import { nextTrackClicked } from '../../../shared/state/events';

import { Center } from '@mantine/core';
import { TrackCard } from './TrackCard';
import { MusicPlayer } from './MultiPlayer';

export default function App() {
  const [audios, currentIndex] = useUnit([$audios, $currentTrackIndex]);
  const track = audios[currentIndex];

  useEffect(() => {
    audioRequest();
  }, []);

  return (
    <Center h="100vh" bg="var(--mantine-color-body)">
      <MusicPlayer />
      <TrackCard track={track} onNext={() => nextTrackClicked()} />
    </Center>
  );
}
