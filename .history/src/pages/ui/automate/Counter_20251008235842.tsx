import { useUnit } from 'effector-react';

export default function Counter() {
  const [audios, currentIndex] = useUnit([$audios, $currentTrackIndex]);
  const track = audios[currentIndex];

  return (
    <Center h="100vh">
      {track ? (
        
      ) : (
        <Text>Loading...</Text>
      )}
    </Center>
  );
}
