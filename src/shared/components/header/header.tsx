import { CartButton } from './cartButton';
import { HeaderLogo } from './logo';
import { UserButton } from './userButton';

export type HeaderProps = {
  cartCount?: number;
};

export function Header({ cartCount = 0 }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur-sm flex h-16 items-center justify-between px-6">
      <HeaderLogo />

      <div className="flex items-center gap-4">
        <CartButton count={cartCount} />
        <UserButton />
      </div>
    </header>
  );
}
