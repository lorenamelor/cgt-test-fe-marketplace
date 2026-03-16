import { useParams } from 'react-router-dom';

export function Product() {
  const { productId } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Product</h1>
      <p className="mt-2 text-slate-700">Placeholder da página de produto.</p>
      {productId ? <p className="mt-1 text-slate-500">Product id: {productId}</p> : null}
    </div>
  );
}

export default Product;
