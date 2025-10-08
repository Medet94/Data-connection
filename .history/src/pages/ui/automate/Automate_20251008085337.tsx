import { useUnit } from 'effector-react';
import { Button } from '@mantine/core';
// import { } from '../../../shared/state/stores';
import {  $users, $loadingб getUsersClicked } from '../../../shared/state';

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
        {users.map((user: any) => (
          <li key={user.name}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
}
