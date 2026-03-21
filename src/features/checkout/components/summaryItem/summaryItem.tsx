import { formatCurrency } from '../../../../shared/utils/formatCurrency';

type SummaryItemProps = {
  name: string;
  imageUrl: string;
  quantity: number;
  totalCents: number;
};

export function SummaryItem({ name, imageUrl, quantity, totalCents }: SummaryItemProps) {
  return (
    <li className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-slate-50">
          <img src={imageUrl} alt={name} loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-900">{name}</p>
          <p className="text-xs text-slate-400">Qty: {quantity}</p>
        </div>
      </div>
      <span className="text-sm font-medium text-slate-900">{formatCurrency(totalCents)}</span>
    </li>
  );
}
