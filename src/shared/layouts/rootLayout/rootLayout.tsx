import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/header';
import { RouteFallback } from '../../components/routeFallback';

export type RootLayoutProps = {
  cartCount?: number;
};

export function RootLayout({ cartCount }: RootLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header cartCount={cartCount} />
      <main>
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
