import React from 'react';
import { useStore } from 'effector-react';
import { $count } from '../../model';
import { increment, decrement, reset } from '../model/events';

export default function Counter() {
  const count = useStore($count);

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
