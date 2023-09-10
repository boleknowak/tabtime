import Layout from '@/components/Layouts/Layout';
import SeoTags from '@/components/SeoTags';
import { Button, Card, CardBody, Heading } from '@chakra-ui/react';
import Footer from '@/components/Elements/Footer';
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs';
import Link from 'next/link';

export default function Pricing({ siteMeta }) {
  const features = [
    {
      name: '1 Token',
      contains: true,
    },
    {
      name: 'Unlimited Tabs',
      contains: true,
    },
    {
      name: 'Unlimited Devices',
      contains: true,
    },
    {
      name: 'Unlimited Time Tracking',
      contains: true,
    },
    {
      name: 'Unlimited Goals',
      contains: false,
    },
  ];

  return (
    <>
      <SeoTags title={siteMeta.title} description={siteMeta.description} />
      <Layout>
        <div className="container mx-auto flex flex-col space-y-6 px-6 py-10">
          <div>
            <Heading as="h1" fontWeight="bold" textAlign="center" size="xl">
              Pricing
            </Heading>
            <p className="mt-2 text-center text-sm">
              Check out the pricing for TabTime.
              <br />
              We're always working on new features and improvements, so stay tuned!
            </p>
          </div>
          <hr />
          <div className="mx-auto w-full max-w-sm">
            <div>
              <Card color="white" bgColor="brand.950">
                <CardBody>
                  <h1 className="text-2xl font-bold">$0</h1>
                  <p className="text-sm">It's free! No credit card required.</p>
                  <hr className="mb-4 mt-4 border-brand-900" />
                  <div className="mt-4">
                    {features.map((feature, featureId) => (
                      <div className="flex flex-row items-center space-x-2" key={featureId}>
                        {feature.contains ? (
                          <BsFillCheckCircleFill className="text-green-500" />
                        ) : (
                          <BsFillXCircleFill className="text-red-400" />
                        )}
                        <div>{feature.name}</div>
                      </div>
                    ))}
                  </div>
                  <hr className="mb-4 mt-4 border-brand-900" />
                  <div>
                    <Button
                      as={Link}
                      w="full"
                      color="brand.100"
                      colorScheme="brand"
                      href="/register"
                    >
                      Get Started
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
          <hr />
          <div className="text-xs text-gray-500">
            Please note that our pricing structure is subject to change as we continue to enhance
            TabTime with new features and improvements. Any changes to pricing will be communicated
            to our users in advance, and our commitment to providing value for your investment
            remains our top priority. Thank you for choosing TabTime.
          </div>
        </div>
        <Footer />
      </Layout>
    </>
  );
}

export const getServerSideProps = async () => {
  const meta = {
    title: 'Pricing - TabTime',
    description: 'Check out the pricing for TabTime.',
  };

  return {
    props: {
      siteMeta: meta,
    },
  };
};
