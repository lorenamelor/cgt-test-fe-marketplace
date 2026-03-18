import { Button } from '../../shared/components/button';
import { Card } from '../../shared/components/card';
import { Input } from '../../shared/components/input';
import { ProductCard } from '../../shared/components/productCard';
import { useCartStore } from '../../shared/stores/cart';
import { products } from '../../shared/types/product';

export function Home() {
  const addItem = useCartStore((s) => s.addItem);
  const product = products[0];

  return (
    <div className="px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <main className="flex flex-col gap-10">
          <section className="flex flex-col gap-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
                Discover Retro 90s Products
              </h1>
              <p className="max-w-xl text-slate-600">
                Explore nostalgic products inspired by the 1990s.
              </p>
            </div>

            <Card className="rounded-[999px] bg-white/90 p-2 shadow-sm">
              <div className="flex items-stretch gap-0">
                <div className="flex flex-1 items-center gap-3 rounded-full bg-white px-5">
                  <span className="text-lg text-slate-300">🔍</span>
                  <Input placeholder="Search for retro products..." wrapperClassName="flex-1" />
                </div>
                <Button className="ml-2 h-14 w-auto rounded-full px-8">Search</Button>
              </div>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900">Trending Products</h2>
            <div className="mt-4 max-w-sm">
              <ProductCard
                product={product}
                onAddToCart={addItem}
                rating={4}
                reviewCount={124}
                seller="RetroGameVault"
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Home;
