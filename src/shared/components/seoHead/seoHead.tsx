import { Helmet } from 'react-helmet-async';

type SeoHeadProps = {
  title: string;
  description: string;
  noIndex?: boolean;
};

export function SeoHead({ title, description, noIndex = false }: SeoHeadProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noIndex ? <meta name="robots" content="noindex, nofollow" /> : null}
    </Helmet>
  );
}

export default SeoHead;
