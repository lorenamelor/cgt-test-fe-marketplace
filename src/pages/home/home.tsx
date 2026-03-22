import { SearchBar } from '../../features/home/components/searchBar';
import { TrendingTags } from '../../features/home/components/tags';
import { TrendingProducts } from '../../features/home/components/trendingProducts';
import SeoHead from '../../shared/components/seoHead';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export function Home() {
  const { pathname, search } = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  return (
    <>
      <SeoHead
        title="90s Shop | Home"
        description="Shop curated 90s-inspired 3D assets for games, renders, and nostalgic digital worlds."
        canonicalPath={`${pathname}${search}`}
      />

      <div className="px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <section className="flex flex-col">
            <section className="flex flex-col">
              <div className="mx-auto w-full text-center">
                <h1 className="text-balance text-4xl font-semibold leading-[1.1] text-slate-900 md:text-5xl lg:text-[56px]">
                  Discover Retro 90s 3D models
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500 md:mt-5">
                  Explore nostalgic 3D models inspired by the 1990s.
                </p>
              </div>

              <div className="mx-auto mt-10 w-full max-w-[672px] md:mt-12">
                <SearchBar value={searchTerm} onChange={setSearchTerm} />
              </div>

              <div className="mx-auto mt-8 w-full max-w-4xl md:mt-10">
                <TrendingTags selectedTag={selectedTag} onSelectTag={setSelectedTag} />
              </div>
            </section>
            <TrendingProducts searchTerm={searchTerm} selectedTag={selectedTag} />
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
