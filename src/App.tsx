import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import CartPage from './pages/cart';
import CheckoutPage from './pages/checkout';
import CompletePage from './pages/complete';
import HomePage from './pages/home';
import ProductPage from './pages/product';

export function App() {
  return (
    <BrowserRouter>
      <main>
        <header className="border-b border-slate-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold">90s shop</span>
            <nav>
              <ul className="flex list-none gap-4 text-sm">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/cart">Cart</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/complete" element={<CompletePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
