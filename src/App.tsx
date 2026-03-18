import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CartPage from './pages/cart';
import CheckoutPage from './pages/checkout';
import CompletePage from './pages/complete';
import HomePage from './pages/home';
import ProductPage from './pages/product';
import { RootLayout } from './shared/layouts/rootLayout';
import { useCartStore } from './shared/stores/cart';

export function App() {
  const cartCount = useCartStore((s) => s.items.reduce((total, item) => total + item.quantity, 0));

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout cartCount={cartCount} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/complete" element={<CompletePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
