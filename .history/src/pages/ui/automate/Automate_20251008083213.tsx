import { useUnit } from 'effector-react';
import { Button } from '@mantine/core';
import { $products, $loading } from '../../../shared/state/stores';
import { getUsersClicked } from '../../../shared/state/events';

export default function Counter() {
  const [product, loading] = useUnit([$products, $loading]);

  console.log(loading);
  console.log(product);

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h2>Effector Counter with Effect</h2>
      <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
        <Button onClick={() => getUsersClicked()}>
          {' '}
          {loading ? 'Loading...' : 'Load'}
        </Button>
      </div>
      <ul>
        {product.map((p: any) => (
          <li key={p.name}>{p.email}</li>
        ))}
      </ul>
    </div>
  );
}
