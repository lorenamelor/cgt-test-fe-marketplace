import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

type BaseProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  to?: string;
};

export type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>;

const baseStyles =
  'inline-flex h-14 items-center justify-center gap-2 rounded-xl px-6 text-[0.9375rem] font-semibold tracking-tight transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2';

const variantStyles = {
  primary: 'bg-primary text-white hover:opacity-90 active:scale-[0.97]',
  secondary:
    'border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 active:bg-slate-100',
};

export function Button({
  variant = 'primary',
  children,
  className,
  to,
  type = 'button',
  disabled,
  ...rest
}: ButtonProps) {
  const classes = cn(baseStyles, variantStyles[variant], className);

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(classes, 'disabled:cursor-not-allowed disabled:opacity-70')}
      {...rest}
    >
      {children}
    </button>
  );
}
