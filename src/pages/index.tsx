import { useEffect } from 'react';
import Layout from '@/components/Layouts/Layout';
import SeoTags from '@/components/SeoTags';
import * as gtag from '@/lib/gtag';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Image from 'next/image';
import { Button } from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';
import { BsCheck2Circle, BsWindowStack } from 'react-icons/bs';
import Footer from '@/components/Elements/Footer';
import { AiOutlineDollarCircle, AiOutlineInfoCircle } from 'react-icons/ai';
import { CgBrowser } from 'react-icons/cg';
import { HiOutlineCloudUpload } from 'react-icons/hi';
import { RiChatDeleteLine } from 'react-icons/ri';
import { BiEnvelope } from 'react-icons/bi';

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

  const faqs = [
    {
      question: 'What is TabTime?',
      answer:
        'TabTime is a browser extension that tracks the time you spend on each tab while browsing. It works by monitoring the active tab in your browser and recording the time you spend on it.      ',
      icon: <AiOutlineInfoCircle className="h-12 w-12 text-brand-800" />,
    },
    {
      question: 'Is TabTime compatible with my web browser?',
      answer:
        'TabTime is compatible only with Chrome for now. You can check our website for the full list of supported browsers.',
      icon: <CgBrowser className="h-12 w-12 text-brand-800" />,
    },
    {
      question: 'What information does TabTime collect?',
      answer:
        "TabTime collects information regarding the URLs of the pages you visit in your browser tabs to measure the time spent on them. Additionally, it gathers data about your browser's name and your operating system's name for analytical purposes. Please rest assured that we prioritize user privacy, and this data is securely stored.",
      icon: <HiOutlineCloudUpload className="h-12 w-12 text-brand-800" />,
    },
    {
      question: 'Can I use TabTime on multiple browser windows?',
      answer:
        'Yes, TabTime supports multiple browser windows. It accurately tracks your time spent on tabs across all open windows.',
      icon: <BsWindowStack className="h-12 w-12 text-brand-800" />,
    },
    {
      question: 'How can I view my tab time statistics?',
      answer:
        "You can access your tab time statistics by clicking on the TabTime icon in your browser's toolbar. Here, you'll find a summary of your tab usage for the last 24 hours, the past 7 days, and all-time data. For even more detailed and comprehensive statistics, you can log in to our website's user panel, where you'll find in-depth insights and analytics.",
      icon: <BsWindowStack className="h-12 w-12 text-brand-800" />,
    },
    {
      question: 'How can I uninstall TabTime?',
      answer:
        'To uninstall TabTime, right-click on the extension icon in your browser\'s toolbar and select "Remove from Chrome" (or the respective option for your browser). Follow the on-screen instructions to complete the removal.',
      icon: <RiChatDeleteLine className="h-12 w-12 text-brand-800" />,
    },
    {
      question: 'Is TabTime free to use?',
      answer:
        'Yes, TabTime is free to use. We offer both free and premium versions of the extension. The free version provides essential time-tracking features, while the premium version offers advanced analytics and additional customization options.',
      icon: <AiOutlineDollarCircle className="h-12 w-12 text-brand-800" />,
    },
    {
      question: 'Where can I get support if I encounter any issues?',
      answer:
        'If you encounter any issues or have questions, please visit our "Contact Us" page on our website. Our support team is ready to assist you and ensure you have a smooth experience with TabTime.',
      icon: <BiEnvelope className="h-12 w-12 text-brand-800" />,
    },
  ];

  return (
    <>
      <SeoTags title={siteMeta.title} description={siteMeta.description} />
      <Layout>
        <div className="container mx-auto flex flex-col space-y-6 px-6 py-10 lg:h-[32rem] lg:flex-row lg:items-center lg:py-16">
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-lg">
              <h1 className="text-3xl font-bold tracking-wide text-gray-800 lg:text-5xl">
                Track your time spent on each tab.
              </h1>
              <div className="mt-8 space-y-5">
                <p className="-mx-2 flex items-center text-gray-700">
                  <BsCheck2Circle className="mx-2 h-6 w-6 text-green-600" />
                  <span className="mx-2">Uncover Your Web Activity Patterns</span>
                </p>
                <p className="-mx-2 flex items-center text-gray-700 dark:text-gray-200">
                  <BsCheck2Circle className="mx-2 h-6 w-6 text-green-600" />
                  <span className="mx-2">Boost Your Productivity</span>
                </p>
                <p className="-mx-2 flex items-center text-gray-700 dark:text-gray-200">
                  <BsCheck2Circle className="mx-2 h-6 w-6 text-green-600" />
                  <span className="mx-2">Easy to Use</span>
                </p>
              </div>
            </div>
            <div className="mt-8 w-full lg:max-w-sm">
              <div className="space-x-2">
                <Button
                  className="space-x-2"
                  color="white"
                  _hover={{ bgColor: 'brand.900' }}
                  _focus={{ bgColor: 'brand.900' }}
                  bgColor="brand.950"
                  rightIcon={<FiExternalLink />}
                >
                  <Image src="/images/chrome.png" alt="Chrome" width={20} height={20} />
                  <div>Add to Chrome</div>
                </Button>
                <Button color="brand.950" colorScheme="brand" variant="ghost">
                  Login
                </Button>
              </div>
              <div className="mt-2 text-xs text-gray-500">It's free. No credit card required.</div>
            </div>
          </div>
          <div className="flex h-96 w-full items-center justify-center lg:w-1/2">
            <Image
              className="mx-auto h-full w-full rounded-md object-cover shadow lg:max-w-2xl"
              width={600}
              height={400}
              src="/images/hero-image.png"
              priority
              alt="Hero image"
            />
          </div>
        </div>
        <div className="p-8">
          <div className=" rounded-lg p-4 py-8">
            <h4 className="text-center text-4xl font-bold uppercase tracking-widest text-gray-800">
              FAQ
            </h4>
            <p className="mt-2 text-center text-sm text-gray-600">
              Here are some of the frequently asked questions
            </p>
            <div className="mt-4 grid grid-cols-1 gap-4 px-2 md:grid-cols-2 xl:gap-12 xl:px-12">
              {faqs.map((faq, faqId) => (
                <div key={faqId} className="mt-8 flex space-x-8">
                  <div>{faq.icon}</div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-700">{faq.question}</h4>
                    <p className="my-2 text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              ))}
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
    title: 'TabTime',
    description: 'TabTime is a simple and easy to use time tracking app.',
  };

  return {
    props: {
      siteMeta: meta,
    },
  };
};
