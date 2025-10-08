import { useUnit } from 'effector-react';
import { $audios, $currentTrackIndex } from '../../../shared/state/stores';
import { nextTrackClicked } from '../../../shared/state/events';

export default function Counter() {
  const [audios, currentIndex] = useUnit([$audios, $currentTrackIndex]);
  const track = audios[currentIndex];

  return (
    <Center h="100vh">
      {track ? (
        <TrackCard track={track} onNext={() => nextTrackClicked()} />
      ) : (
        <Text>Loading...</Text>
      )}
    </Center>
  );
}
