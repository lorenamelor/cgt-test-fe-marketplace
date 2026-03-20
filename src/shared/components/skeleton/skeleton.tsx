import type { HTMLAttributes } from 'react';

import { cn } from '../../utils/cn';

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...rest }: SkeletonProps) {
  return <div className={cn('bg-slate-100 animate-pulse', className)} {...rest} />;
}
