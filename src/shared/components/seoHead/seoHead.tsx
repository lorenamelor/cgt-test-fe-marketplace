import { Helmet } from 'react-helmet-async';

const DEFAULT_OG_IMAGE_PATH = '/logo512.png';
const SITE_NAME = '90s Shop';

type SeoHeadProps = {
  title: string;
  description: string;
  noIndex?: boolean;
  /** Site-root path + optional query for og:url (must start with `/`, e.g. `/products/x`) */
  canonicalPath: string;
  /** Site-root path for og:image (must start with `/`); default `/logo512.png` */
  imageUrl?: string;
};

export function SeoHead({
  title,
  description,
  noIndex = false,
  canonicalPath,
  imageUrl,
}: SeoHeadProps) {
  const origin = window.location.origin;
  const absoluteImage = `${origin}${imageUrl ?? DEFAULT_OG_IMAGE_PATH}`;
  const canonicalUrl = `${origin}${canonicalPath}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex ? <meta name="robots" content="noindex, nofollow" /> : null}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={absoluteImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
    </Helmet>
  );
}

export default SeoHead;
