import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { queryClient } from './config/query/queryClient';
import { ErrorBoundary } from './shared/layouts/errorBoundary';
import { initMocks } from './mocks';
import reportWebVitals from './reportWebVitals';
import './index.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container missing in index.html');
}

const root = ReactDOM.createRoot(container as HTMLElement);

initMocks().then(() => {
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ErrorBoundary>
    </React.StrictMode>,
  );
});

reportWebVitals(
  process.env.NODE_ENV === 'development'
    ? (metric) => {
        // Core Web Vitals (LCP, INP, CLS, etc.) — em produção, ligar a um endpoint de analytics.
        // eslint-disable-next-line no-console -- intentional dev-only observability
        console.log(`[web-vitals] ${metric.name}:`, metric.value, metric);
      }
    : undefined,
);
