import Layout from '@/components/Layouts/Layout';
import SeoTags from '@/components/SeoTags';
import { Heading } from '@chakra-ui/react';
import Footer from '@/components/Elements/Footer';
import Link from 'next/link';

export default function Terms({ siteMeta }) {
  return (
    <>
      <SeoTags title={siteMeta.title} description={siteMeta.description} />
      <Layout>
        <div className="container mx-auto flex flex-col space-y-6 px-6 py-10">
          <div>
            <Heading as="h1" fontWeight="bold" textAlign="center" size="xl">
              Terms of Service
            </Heading>
            <p className="mt-2 text-center text-sm">Check out the terms of service for TabTime.</p>
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
                Welcome to TabTime! These Terms of Service ("Terms") govern your use of the TabTime
                browser extension and web platform (collectively referred to as the "Service"). By
                accessing or using the Service, you agree to comply with and be bound by these
                Terms.
              </p>
            </div>
            <div className="mb-6">
              <Heading as="h2" fontWeight="bold" size="lg">
                2. Acceptance and Consent
              </Heading>
              <p className="mt-2">
                2.1 Administrator's Consent: You may use the Service with the consent of your
                computer administrator, such as in educational or office environments. If you are
                your own computer administrator, you are solely responsible for granting or revoking
                access to the Service.
              </p>
              <p>
                2.2 User Consent: By accepting these Terms and our Privacy Policy, you confirm your
                consent to use the Service in compliance with these terms and conditions.
              </p>
            </div>
            <div className="mb-6">
              <Heading as="h2" fontWeight="bold" size="lg">
                3. Data Handling
              </Heading>
              <p className="mt-2">
                3.1 Data Deletion and Export: We are committed to your privacy. You have the right
                to request the deletion of your account and data at any time. Additionally, you can
                request an export of your data.
              </p>
              <p>
                3.2 Changes to Data: You agree that TabTime may collect, store, and analyze data
                related to your web activity as described in our Privacy Policy.
              </p>
            </div>
            <div className="mb-6">
              <Heading as="h2" fontWeight="bold" size="lg">
                4. Pricing
              </Heading>
              <p className="mt-2">
                4.1 Pricing Changes: The Service is currently provided for free. However, TabTime
                reserves the right to change the pricing structure and features offered on the{' '}
                <Link href="/pricing" className="underline">
                  Pricing Page
                </Link>{' '}
                at any time. Any such changes will be communicated to users.
              </p>
            </div>
            <div className="mb-6">
              <Heading as="h2" fontWeight="bold" size="lg">
                5. Prohibited Activities
              </Heading>
              <p className="mt-2">You are prohibited from engaging in the following activities:</p>
              <ul className="list-inside list-disc">
                <li className="ml-3">
                  Hacking, tampering, or otherwise compromising the integrity and security of the
                  Service.
                </li>
                <li className="ml-3">
                  Distributing malicious software, engaging in denial-of-service attacks, or sending
                  false data.
                </li>
                <li className="ml-3">
                  Taking actions that may harm the functionality or reputation of the TabTime
                  extension or platform.
                </li>
                <li className="ml-3">
                  Any other activities that violate these Terms, our Privacy Policy, or applicable
                  laws.
                </li>
              </ul>
            </div>
            <div className="mb-6">
              <Heading as="h2" fontWeight="bold" size="lg">
                6. Ownership and Intellectual Property
              </Heading>
              <p className="mt-2">
                6.1 Service Ownership: TabTime and its associated intellectual property rights are
                owned by TabTime, the developer of the Service.
              </p>
              <p>
                6.2 User Data Ownership: While the Service is owned by TabTime, all data generated
                and collected by users belongs to the respective users. TabTime stores and analyzes
                this data solely for the purpose of providing reports and analytics to users.
              </p>
            </div>
            <div className="mb-6">
              <Heading as="h2" fontWeight="bold" size="lg">
                7. Security and Data Protection
              </Heading>
              <p className="mt-2">
                7.1 Data Encryption: We employ industry-standard security measures, including data
                encryption, to protect user data.
              </p>
              <p>
                7.2 Sensitive Information: TabTime does not collect sensitive user data, except for
                email addresses (if provided).
              </p>
            </div>
            <div className="mb-6">
              <Heading as="h2" fontWeight="bold" size="lg">
                8. Changes to Terms
              </Heading>
              <p className="mt-2">
                TabTime reserves the right to modify these Terms at any time. Users will be notified
                via email of significant changes. Your continued use of the Service after the
                modifications are effective constitutes your acceptance of the revised Terms.
              </p>
            </div>
            <div className="mb-6">
              <Heading as="h2" fontWeight="bold" size="lg">
                9. Contact Information
              </Heading>
              <p className="mt-2">
                If you have any questions or concerns regarding these Terms or the Service, please
                contact us via our{' '}
                <Link href="/contact" className="underline">
                  Contact Page
                </Link>{' '}
                or email us at{' '}
                <a href="mailto:contact@tabtime.app" className="underline">
                  contact@tabtime.app
                </a>
                .
              </p>
            </div>
            <div className="mb-6">
              <Heading as="h2" fontWeight="bold" size="lg">
                10. Governing Law and Jurisdiction
              </Heading>
              <p className="mt-2">
                These Terms are governed by and construed in accordance with the laws of Poland. You
                agree to submit to the exclusive jurisdiction of the courts located in Poland for
                the resolution of any disputes arising out of or related to these Terms.
              </p>
            </div>
            <div className="mb-6">
              <Heading as="h2" fontWeight="bold" size="lg">
                11. Legal Compliance
              </Heading>
              <p className="mt-2">
                These Terms are compliant with applicable data protection laws and regulations.
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
    title: 'Terms of Service - TabTime',
    description: 'Check out the terms of service for TabTime.',
  };

  return {
    props: {
      siteMeta: meta,
    },
  };
};
