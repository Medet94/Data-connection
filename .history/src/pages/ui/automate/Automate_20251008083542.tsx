import { useUnit } from 'effector-react';
import { Button } from '@mantine/core';
import { $users, $loading } from '../../../shared/state/stores';
import { getUsersClicked } from '../../../shared/state/events';

export default function Counter() {
  const [users, loading] = useUnit([$users, $loading]);

  console.log(loading);
  console.log(users);

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
        <Button onClick={() => getUsersClicked()}>
          {' '}
          {loading ? 'Loading...' : 'Load'}
        </Button>
      </div>
      <ul>
        {users.map((p: any) => (
          <li key={p.name}>{p.email}</li>
        ))}
      </ul>
    </div>
  );
}
