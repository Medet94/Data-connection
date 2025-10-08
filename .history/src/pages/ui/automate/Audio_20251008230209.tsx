import { useState, useRef, useEffect } from 'react';
import {
  Card,
  Group,
  Image,
  Text,
  Badge,
  Progress,
  Stack,
  ActionIcon,
} from '@mantine/core';

import { BluePrintIcon } from './BlueprintIcon';
import type { Track } from 'shared/types';

interface TrackCardProps {
  track: Track;
}

export const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / track.duration) * 100);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, [track.duration]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch((e) => console.error('Playback failed', e));
      setIsPlaying(true);
    }
  };

  return (
    <Card
      shadow="sm"
      radius="lg"
      padding="md"
      withBorder
      style={{
        maxWidth: 420,
        background: 'var(--mantine-color-body)',
      }}
    >
      <Group align="center" mb="sm">
        <Image
          src="https://cdn.example.com/covers/midnight-drive.jpg"
          alt={track?.title}
          width={90}
          height={90}
          radius="md"
          fit="cover"
        />
        <Stack gap={2} style={{ flex: 1 }}>
          <Text fw={600} size="lg">
            {track?.title}
          </Text>
          <Text c="dimmed" size="sm">
            {track?.tags} — {track?.title}
          </Text>

          <Group gap="xs" mt={6}>
            {track?.tags?.map((tag) => (
              <Badge key={tag} color="blue" variant="light">
                {tag}
              </Badge>
            ))}
            {track?.explicit && (
              <Badge color="red" variant="filled" size="xs">
                Explicit
              </Badge>
            )}
          </Group>
        </Stack>
      </Group>

      <Group justify="space-between" mt="xs" mb="xs">
        <Group gap={4}>
          <BluePrintIcon name="history" size={14} />
          <Text size="xs">{formatDuration(track?.duration)}</Text>
        </Group>
        <Group gap={4}>
          <BluePrintIcon name="flame" size={14} />
          <Text size="xs">{track?.popularity}</Text>
        </Group>
        <Group gap={4}>
          <BluePrintIcon name="headset" size={14} />
          <Text size="xs">Listen</Text>
        </Group>
      </Group>

      <Progress
        value={track?.popularity}
        color={track?.popularity > 80 ? 'red' : 'blue'}
        radius="xl"
        size="sm"
      />
    </Card>
  );
};
