import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { audioRequest } from '../../../shared/state/events';
import { $audios } from '../../../shared/state/stores';
import '../../../shared/state/connections';
import styles from './style.module.css';
import { Center } from '@mantine/core';

import { TrackCard } from './Audio';

export default function Counter() {
  const audios = useUnit($audios);

  useEffect(() => {
    audioRequest();
  }, []);

  console.log(audios);

  const track = audios?.[1];

  return (
    <Center h="100vh" bg="var(--mantine-color-body)">
      <TrackCard track={track} />
    </Center>
  );
}
