import { useUnit } from 'effector-react';
import { Button } from '@mantine/core';
import { $users, $loading, $todos } from '../../../shared/state/stores';
import { getUsersClicked } from '../../../shared/state/events';
import '../../../shared/state/connections';

export default function Counter() {
  const [users, loading, todo] = useUnit([$users, $todos, $loading]);

  console.log(users);
  console.log(todo);

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
