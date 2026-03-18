export type QuantityStepperProps = {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
};

export function QuantityStepper({ quantity, onDecrement, onIncrement }: QuantityStepperProps) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full bg-slate-50 px-3 py-2">
      <button
        type="button"
        aria-label="Decrease quantity"
        className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50"
        onClick={onDecrement}
      >
        −
      </button>
      <span className="w-6 text-center text-sm font-medium text-slate-900">{quantity}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50"
        onClick={onIncrement}
      >
        +
      </button>
    </div>
  );
}
