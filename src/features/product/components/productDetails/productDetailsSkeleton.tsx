import { Skeleton } from '../../../../shared/components/skeleton';

const SPEC_ROW_COUNT = 4;

export function ProductDetailsSkeleton() {
  return (
    <section aria-label="Product information loading" className="w-full">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-28 rounded" />
        <Skeleton className="h-8 w-80 rounded" />
        <Skeleton className="h-8 w-40 rounded" />
        <Skeleton className="h-4 w-96 rounded" />
      </div>

      <div className="mt-6 flex w-full flex-col gap-3">
        <Skeleton className="h-14 w-full rounded-xl" />
        <Skeleton className="h-14 w-full rounded-xl" />
      </div>

      <div className="mt-8 border-t border-slate-200 pt-8">
        <Skeleton className="mb-4 h-5 w-56 rounded" />
        <div className="space-y-3">
          {Array.from({ length: SPEC_ROW_COUNT }).map((_, idx) => (
            <div key={idx} className="flex justify-between gap-4">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-4 w-36 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
