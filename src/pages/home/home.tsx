import { ProductCard } from '../../shared/components/productCard';
import { useCartStore } from '../../shared/stores/cart';
import { products } from '../../shared/types/product';
import { SearchBar } from '../../features/home/components/searchBar';
import { TrendingTags } from '../../features/home/components/tags';

export function Home() {
  const addItem = useCartStore((s) => s.addItem);
  const totalProducts = products.length;

  return (
    <div className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <main className="flex flex-col">
          <section className="flex flex-col">
            <div className="mx-auto w-full text-center">
              <h1 className="text-balance text-4xl font-semibold leading-[1.1] text-slate-900 md:text-5xl lg:text-[56px]">
                Discover Retro 90s Products
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500 md:mt-5">
                Explore nostalgic products inspired by the 1990s.
              </p>
            </div>

            <div className="mx-auto mt-10 w-full max-w-[672px] md:mt-12">
              <SearchBar />
            </div>

            <div className="mx-auto mt-8 w-full max-w-4xl md:mt-10">
              <TrendingTags />
            </div>
          </section>

          <section className="mt-16 md:mt-20">
            <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
                Trending Products
              </h2>
              <p className="text-sm text-slate-500">
                Showing <span className="font-semibold text-slate-700">{totalProducts}</span> of{' '}
                <span className="font-semibold text-slate-700">{totalProducts}</span> results
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addItem}
                  rating={4}
                  reviewCount={124}
                  seller="RetroGameVault"
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Home;
