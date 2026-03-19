export async function initMocks() {
  if (process.env.NODE_ENV !== 'development') {
    return Promise.resolve();
  }

  const { worker } = await import('./browser');

  return worker.start({
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
    onUnhandledRequest: 'bypass',
  });
}
