import type { ReactNode } from 'react';
import { Row } from './row';

type PriceSummaryProps = {
  children: ReactNode;
};

function PriceSummary({ children }: PriceSummaryProps) {
  return <dl className="mt-6 space-y-2 border-t border-slate-100 pt-5 text-sm">{children}</dl>;
}

PriceSummary.Row = Row;

export { PriceSummary };
