import Layout from '@/components/Layouts/Layout';
import SeoTags from '@/components/SeoTags';
import { Heading } from '@chakra-ui/react';
import Footer from '@/components/Elements/Footer';
import Link from 'next/link';

export default function Privacy({ siteMeta }) {
  return (
    <>
      <SeoTags title={siteMeta.title} description={siteMeta.description} />
      <Layout>
        <div className="container mx-auto flex flex-col space-y-6 px-6 py-10">
          <div>
            <Heading as="h1" fontWeight="bold" textAlign="center" size="xl">
              Privacy Policy
            </Heading>
            <p className="mt-2 text-center text-sm">Check out the privacy policy for TabTime.</p>
          </div>
          <hr />
          <div>
            <div className="mb-4 text-sm text-gray-600">
              <p>Effective Date: 2023-09-10</p>
              <p>Last Updated: 2023-09-10</p>
            </div>
            <div className="mb-6">
              <Heading as="h2" fontWeight="bold" size="lg">
                1. Introduction
              </Heading>
              <p className="mt-2">
                Welcome to TabTime! This Privacy Policy is designed to help you understand how we
                collect, use, disclose, and safeguard your personal information. By using the
                TabTime extension and related services, you consent to the practices described in
                this policy.
              </p>
            </div>
            <div className="mb-6">
              <Heading as="h2" fontWeight="bold" size="lg">
                2. Information We Collect
              </Heading>
              <p className="mt-2">
                We may collect the following types of information from users of the TabTime
                extension:
              </p>
              <br />
              <p>
                Visited URLs: We collect the URLs of the web pages you visit while using our
                extension.
                <br />
                Operating System Name: We gather information about the name of your operating
                system.
                <br />
                Browser Name: We collect data regarding the name of your web browser.
              </p>
            </div>
            <div className="mb-6">
              <Heading as="h2" fontWeight="bold" size="lg">
                3. Purpose of Data Collection
              </Heading>
              <p className="mt-2">We collect this information for the following purposes:</p>
              <p>
                Time Calculation: To calculate and record the time spent on each tab and provide you
                with time tracking and reporting features.
                <br />
                System Analytics: To improve the functionality of our extension by analyzing user
                preferences based on operating system and browser data.
              </p>
            </div>
            <div className="mb-6">
              <Heading as="h2" fontWeight="bold" size="lg">
                4. Third-Party Disclosure
              </Heading>
              <p className="mt-2">
                We do not share the collected data with third parties. However, please note that our
                landing page uses Google Analytics (GA4) for website analytics. Google's privacy
                policy governs the data collected by GA4.
              </p>
            </div>
            <div className="mb-6">
              <Heading as="h2" fontWeight="bold" size="lg">
                5. Data Retention
              </Heading>
              <p className="mt-2">
                We retain your data until you request the deletion of your account or data. All data
                is anonymized and encrypted to ensure your privacy and security.
              </p>
            </div>
            <div className="mb-6">
              <Heading as="h2" fontWeight="bold" size="lg">
                6. User Rights
              </Heading>
              <p className="mt-2">As a user of TabTime, you have the following rights:</p>
              <p>
                Data Deletion: You can request the deletion of your data at any time.
                <br />
                Exclusion List: You can specify websites you do not want to track.
                <br />
                Data Export: You can request an export of your data.
              </p>
            </div>
            <div className="mb-6">
              <Heading as="h2" fontWeight="bold" size="lg">
                7. Cookies
              </Heading>
              <p className="mt-2">
                The only cookies used by TabTime are from Google services, including those for
                authentication and Google Analytics (GA4). You can manage your cookie preferences in
                your browser settings.
              </p>
            </div>
            <div className="mb-6">
              <Heading as="h2" fontWeight="bold" size="lg">
                8. Contact Us
              </Heading>
              <p className="mt-2">
                If you have any questions or concerns regarding your privacy or this policy, you can
                contact us at{' '}
                <Link href="/contact" className="underline">
                  contact page
                </Link>{' '}
                or via email at{' '}
                <a href="mailto:help@tabtime.app" className="underline">
                  help@tabtime.app
                </a>
                .
              </p>
            </div>
            <div className="mb-6">
              <Heading as="h2" fontWeight="bold" size="lg">
                9. Changes to Privacy Policy
              </Heading>
              <p className="mt-2">
                We reserve the right to make changes to this Privacy Policy. Users will be notified
                via email of any significant changes to the policy. By continuing to use TabTime,
                you consent to the updated policy.
              </p>
            </div>
            <div className="mb-6">
              <Heading as="h2" fontWeight="bold" size="lg">
                10. Legal Compliance
              </Heading>
              <p className="mt-2">
                This Privacy Policy is compliant with applicable data protection laws.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </Layout>
    </>
  );
}

export const getServerSideProps = async () => {
  const meta = {
    title: 'Privacy Policy - TabTime',
    description: 'Check out the privacy policy for TabTime.',
  };

  return {
    props: {
      siteMeta: meta,
    },
  };
};
