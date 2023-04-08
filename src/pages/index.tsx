import { useEffect } from 'react';
import Layout from '@/components/Layouts/Layout';
import SeoTags from '@/components/SeoTags';
import * as gtag from '@/lib/gtag';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { signIn } from 'next-auth/react';

export default function Home({ siteMeta }) {
  const [useGoogleAnalytics /* , setUseGoogleAnalytics */] = useLocalStorage(
    'useGoogleAnalytics',
    'accepted'
  );

  useEffect(() => {
    gtag.manageConsent(useGoogleAnalytics);
  }, [useGoogleAnalytics]);

  // if (error) return <div>An error occured.</div>;

  // const toggleUseGoogleAnalytics = (event) => {
  //   if (event.target.checked) {
  //     setUseGoogleAnalytics('accepted');
  //   } else {
  //     setUseGoogleAnalytics('rejected');
  //   }
  // };

  // const getGoogleAnalyticsStatus = () => useGoogleAnalytics;

  return (
    <>
      <SeoTags title={siteMeta.title} description={siteMeta.description} />
      <Layout>
        <div className="m-4 font-bold">Hello World!</div>
        <button onClick={() => signIn('google')}>Google</button>
      </Layout>
    </>
  );
}

export const getServerSideProps = async () => {
  const meta = {
    title: 'TabTime',
    description: 'TabTime is a simple and easy to use time tracking app.',
  };

  return {
    props: {
      siteMeta: meta,
    },
  };
};
