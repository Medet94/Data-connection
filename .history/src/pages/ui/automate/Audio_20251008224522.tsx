import {
  Card,
  Group,
  Image,
  Text,
  Badge,
  Progress,
  Stack,
} from '@mantine/core';

import { BluePrintIcon } from './BlueprintIcon';

type Artist = {
  id: number;
  name: string;
};

type Album = {
  id: number;
  title: string;
};

type Track = {
  id: number;
  title: string;
  artistId: number;
  albumId: number;
  duration: number;
  mediaUrl: string;
  explicit: boolean;
  popularity: number;
  tags: string[];
  artist: Artist;
  album: Album;
};

interface TrackCardProps {
  track: Track;
}

export const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
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
          alt={track.title}
          width={90}
          height={90}
          radius="md"
          fit="cover"
        />
        <Stack gap={2} style={{ flex: 1 }}>
          <Text fw={600} size="lg">
            {track.title}
          </Text>
          <Text c="dimmed" size="sm">
            {track.artist?.name} — {track.album?.title}
          </Text>

          <Group gap="xs" mt={6}>
            {track?.tags.map((tag) => (
              <Badge key={tag} color="blue" variant="light">
                {tag}
              </Badge>
            ))}
            {track.explicit && (
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
          <Text size="xs">{formatDuration(track.duration)}</Text>
        </Group>
        <Group gap={4}>
          <BluePrintIcon name="flame" size={14} />
          <Text size="xs">{track.popularity}</Text>
        </Group>
        <Group gap={4}>
          <BluePrintIcon name="headset" size={14} />
          <Text size="xs">Listen</Text>
        </Group>
      </Group>

      <Progress
        value={track.popularity}
        color={track.popularity > 80 ? 'red' : 'blue'}
        radius="xl"
        size="sm"
      />
    </Card>
  );
};
