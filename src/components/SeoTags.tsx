import Head from 'next/head';

interface SeoTagsProps {
  title?: string;
  og_title?: string;
  description?: string;
  og_description?: string;
  keywords?: string;
  url?: string;
  canonicalUrl?: string;
  type?: string;
  image?: string;
}

export default function SeoTags({ ...props }: SeoTagsProps) {
  const defaultTitle = 'TabTime';
  const defaultDescription = 'TabTime is a simple and easy to use time tracking app.';
  const defaultKeywords = 'time tracking, time tracker, time tracking app, time tracker app';
  const defaultUrl = 'http://localhost:3000';
  const defaultType = 'website';
  const defaultImage = 'https://localhost:3000/images/brand/logo.png';

  const title = props.title ?? defaultTitle;
  const ogTitle = props.og_title ?? props.title ?? defaultTitle;
  const description = props.description ?? defaultDescription;
  const ogDescription = props.og_description ?? props.description ?? defaultDescription;
  const keywords = props.keywords ? `${props.keywords}, ${defaultKeywords}` : defaultKeywords;
  const url = props.url ?? defaultUrl;
  const canonicalUrl = props.canonicalUrl ?? url ?? defaultUrl;
  const type = props.type ?? defaultType;
  const image = props.image ?? defaultImage;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="tabtime" />
      <meta property="og:locale" content="pl_PL" />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@tabtime" />
      <meta name="twitter:creator" content="@tabtime" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
}
