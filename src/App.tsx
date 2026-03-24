import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HomePage from './pages/home';
import NotFoundPage from './pages/notFound';
import { RootLayout } from './shared/layouts/rootLayout';
import { useCartStore } from './shared/stores/cart';

const ProductPage = lazy(() => import('./pages/product'));
const CartPage = lazy(() => import('./pages/cart'));
const CheckoutPage = lazy(() => import('./pages/checkout'));
const CompletePage = lazy(() => import('./pages/complete'));

export function App() {
  const cartCount = useCartStore((s) => s.items.reduce((total, item) => total + item.quantity, 0));

  return (
    <HelmetProvider>
      {/* RR v6 future flags → v7 defaults; see https://reactrouter.com/v6/upgrading/future */}
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route element={<RootLayout cartCount={cartCount} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:productId" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/complete" element={<CompletePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
