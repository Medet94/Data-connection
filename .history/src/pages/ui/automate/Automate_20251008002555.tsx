import { useUnit } from 'effector-react';
import { $count } from '../../../shared/state/stores';
import { increment, decrement, reset } from '../../../shared/state/events';

export default function Counter() {
  const count = useUnit($count);

  const handleInc = () => {
    increment();
  };

  const handleDec = () => {
    decrement();
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h2>Effector Counter</h2>
      <h1>{count}</h1>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        <button onClick={handleDec}>-</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleInc}>+</button>
      </div>
    </div>
  );
}
