import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { $products, $loading } from '../../../shared/state/stores';
import { getProducts } from '../../../shared/state/events';

export default function Counter() {
  const [product, loading] = useUnit([$products, $loading]);

  const loadCount = async () => {
    try {
      getProducts();
    } finally {
    }
  };

  useEffect(() => {
    loadCount();
  }, []);

  console.log(product);

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h2>Effector Counter with Effect</h2>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        {loading ? 'Loading...' : 'Load'}
      </div>
    </div>
  );
}
