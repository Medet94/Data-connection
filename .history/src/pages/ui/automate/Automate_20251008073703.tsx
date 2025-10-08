import { useUnit } from 'effector-react';
import { $products, $loading } from '../../../shared/state/stores';
import { getProductsListFx } from '../../../shared/state/effects';

export default function Counter() {
  const [product, loading] = useUnit([$products, $loading]);

  const loadCount = async () => {
    try {
      await getProductsListFx();
    } finally {
    }
  };

  console.log(product);

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h2>Effector Counter with Effect</h2>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        <button onClick={loadCount} disabled={loading}>
          {loading ? 'Loading...' : 'Load'}
        </button>
        {product.map((image) => (
          <img src={image.url} />
        ))}
      </div>
    </div>
  );
}
