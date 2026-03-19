import { Link } from 'react-router-dom';

type BackLinkProps = {
  to: string;
  children: string;
};

export function BackLink({ to, children }: BackLinkProps) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700"
    >
      <span aria-hidden="true">←</span>
      {children}
    </Link>
  );
}
