import { HelmetProvider } from 'react-helmet-async';
import { render, waitFor } from '../../../config/test/testUtils';
import { SeoHead } from './seoHead';

function renderSeoHead() {
  return render(
    <HelmetProvider>
      <SeoHead
        title="Test page"
        description="Test description"
        canonicalPath="/test"
        imageUrl="/custom.png"
      />
    </HelmetProvider>,
  );
}

describe('SeoHead', () => {
  it('should set document title and core meta tags', async () => {
    renderSeoHead();

    await waitFor(() => {
      expect(document.title).toBe('Test page');
    });

    await waitFor(() => {
      const metaDesc = document.querySelector('meta[name="description"]');
      expect(metaDesc).toHaveAttribute('content', 'Test description');
    });

    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute('href')).toMatch(/\/test$/);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle).toHaveAttribute('content', 'Test page');
  });

  it('should render noindex when requested', async () => {
    render(
      <HelmetProvider>
        <SeoHead title="Hidden" description="x" noIndex canonicalPath="/hidden" />
      </HelmetProvider>,
    );

    await waitFor(() => {
      const robots = document.querySelector('meta[name="robots"]');
      expect(robots).toHaveAttribute('content', 'noindex, nofollow');
    });
  });
});
