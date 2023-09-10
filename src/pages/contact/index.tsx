import Layout from '@/components/Layouts/Layout';
import SeoTags from '@/components/SeoTags';
import { Heading } from '@chakra-ui/react';
import Footer from '@/components/Elements/Footer';

export default function Contact({ siteMeta }) {
  return (
    <>
      <SeoTags title={siteMeta.title} description={siteMeta.description} />
      <Layout>
        <div className="container mx-auto flex flex-col space-y-6 px-6 py-10">
          <div>
            <Heading as="h1" fontWeight="bold" textAlign="center" size="xl">
              Contact
            </Heading>
            <p className="mt-2 text-center text-sm">
              Have a question or feedback? Feel free to reach out to us!
            </p>
          </div>
          <hr />
          <div className="mx-auto w-full max-w-sm"></div>
        </div>
        <Footer />
      </Layout>
    </>
  );
}

export const getServerSideProps = async () => {
  const meta = {
    title: 'Contact - TabTime',
    description: 'Have a question or feedback? Feel free to reach out to us!',
  };

  return {
    props: {
      siteMeta: meta,
    },
  };
};
