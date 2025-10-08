import { useState } from 'react';
import { useUnit } from 'effector-react';
import { $count, $posts, $products } from '../../../shared/state/stores';
import { increment, decrement, reset } from '../../../shared/state/events';
import { getPostsFx } from '../../../shared/state/effects';

export default function Counter() {
  const [count, post, product] = useUnit([$count, $posts, $products]);
  const [loading, setLoading] = useState(false);

  const loadCount = async () => {
    setLoading(true);
    try {
      await getPostsFx(count);
    } finally {
      setLoading(false);
    }
  };

  console.log(post);

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h2>Effector Counter with Effect</h2>
      <h1>{count}</h1>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        <button onClick={() => decrement()}>-</button>
        <button onClick={() => reset()}>Reset</button>
        <button onClick={() => increment()}>+</button>
        <button onClick={loadCount} disabled={loading}>
          {loading ? 'Loading...' : 'Load Count'}
        </button>
      </div>
    </div>
  );
}
