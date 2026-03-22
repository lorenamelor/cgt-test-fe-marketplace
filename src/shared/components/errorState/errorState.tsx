import { Button } from '../button';

export type ErrorStateProps = {
  message: string;
  isRetrying: boolean;
  onRetry: () => void;
};

export function ErrorState({ message, isRetrying, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-600">
      <p>{message}</p>
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
