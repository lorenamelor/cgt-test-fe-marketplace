import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CartPage from './pages/cart';
import CheckoutPage from './pages/checkout';
import CompletePage from './pages/complete';
import HomePage from './pages/home';
import ProductPage from './pages/product';
import { RootLayout } from './shared/layouts/rootLayout';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
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
