import { useUnit } from 'effector-react';
import { Button } from '@mantine/core';
import { $products, $loading } from '../../../shared/state/stores';
import { getProductsClicked } from '../../../shared/state/events';
import { getProductsListFx } from '../../../shared/state/effects';

export default function Counter() {
  const [product, loading] = useUnit([$products, $loading]);

  console.log(loading);
  console.log(product);

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h2>Effector Counter with Effect</h2>
      <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
        <Button onClick={() => getProductsClicked()}>
          {' '}
          {loading ? 'Loading...' : 'Load'}
        </Button>
      </div>
    </div>
  );
}
