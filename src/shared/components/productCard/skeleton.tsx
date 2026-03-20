import { Skeleton } from '../skeleton';

export function ProductCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-[0_22px_45px_rgba(15,23,42,0.08)]">
      <div className="p-4">
        <Skeleton className="aspect-square w-full overflow-hidden rounded-2xl" />
      </div>

      <div className="p-4">
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="mt-3 h-5 w-32 rounded" />
        <Skeleton className="mt-2 h-3 w-28 rounded" />

        <div className="mt-4 flex items-end justify-between gap-3">
          <Skeleton className="h-5 w-20 rounded" />
          <Skeleton className="h-10 w-28 rounded-xl" />
        </div>
      </div>
    </article>
  );
}
