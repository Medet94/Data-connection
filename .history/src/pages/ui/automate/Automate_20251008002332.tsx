import { useUnit } from 'effector-react';
import { $count } from '../../../shared/state/stores';
import { increment, decrement, reset } from '../../../shared/state/events';

export default function Counter() {
  const count = useUnit($count);

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h2>Effector Counter</h2>
      <h1>{count}</h1>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        <button onClick={() => decrement()}>-</button>
        <button onClick={() => reset()}>Reset</button>
        <button onClick={() => increment()}>+</button>
      </div>
    </div>
  );
}
