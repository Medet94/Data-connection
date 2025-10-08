import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { Button } from '@mantine/core';

import { $users, $loading, $todos } from '../../../shared/state/stores';
import { getUsersClicked, audioRequest } from '../../../shared/state/events';
import { $audios } from '../../../shared/state/stores';
import '../../../shared/state/connections';

import { TrackCard } from './Audio';

export default function Counter() {
  const [users, loading] = useUnit([$users, $todos, $loading]);
  const audios = useUnit($audios);

  useEffect(() => {
    audioRequest();
  }, []);

  console.log(audios);

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <TrackCard track={audios} />
      <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
        <Button onClick={() => getUsersClicked()}>
          {' '}
          {loading ? 'Loading...' : 'Load'}
        </Button>
      </div>
      <ul>
        {users.map((user: any) => (
          <li key={user.name}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
}
