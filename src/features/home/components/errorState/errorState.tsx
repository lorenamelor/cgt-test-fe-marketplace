import { Button } from '../../../../shared/components/button';

type ErrorStateProps = {
  isRetrying: boolean;
  onRetry: () => void;
};

export function ErrorState({ isRetrying, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-600">
      <p>We couldn&apos;t load trending products. Please try again later.</p>
      <Button
        type="button"
        variant="secondary"
        disabled={isRetrying}
        className="mt-5 h-11 min-w-[140px] text-sm"
        onClick={onRetry}
      >
        {isRetrying ? 'Loading…' : 'Try again'}
      </Button>
    </div>
  );
}
