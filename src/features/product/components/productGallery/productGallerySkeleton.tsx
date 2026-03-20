import { Skeleton } from '../../../../shared/components/skeleton';

const THUMBNAIL_COUNT = 5;

export function ProductGallerySkeleton() {
  return (
    <section aria-label="Product gallery loading" className="w-full">
      <div className="mb-4 aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-[0_22px_45px_rgba(15,23,42,0.08)]">
        <Skeleton className="h-full w-full rounded-3xl" />
      </div>

      <div className="mt-4 grid grid-cols-5 gap-4">
        {Array.from({ length: THUMBNAIL_COUNT }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            className="aspect-square overflow-hidden rounded-2xl border-2 border-transparent bg-white"
            aria-hidden="true"
          >
            <Skeleton className="h-full w-full rounded-2xl" />
          </button>
        ))}
      </div>
    </section>
  );
}
