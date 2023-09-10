import Layout from '@/components/Layouts/Layout';
import SeoTags from '@/components/SeoTags';
import {
  Box,
  Card,
  CardBody,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from '@chakra-ui/react';
import Footer from '@/components/Elements/Footer';

export default function Roadmap({ siteMeta }) {
  const steps = [
    {
      title: 'Foundation',
      description:
        '• Develop and release the core TabTime extension for major browsers.<br />• Implement basic time tracking functionality.<br />• Create a user-friendly interface.<br />• Launch the website with essential information.',
    },
    {
      title: 'Enhanced Functionality',
      description:
        '• Add the option to set goals and limits for tab usage.<br />• Implement data storage for personalized insights.<br />• Start collecting user feedback for further improvements.',
    },
    {
      title: 'Advanced Analytics and Reports',
      description: '• Add advanced analytics and reporting features.',
    },
    {
      title: 'To Be Announced',
      description: '• Add more features and functionality based on user feedback.',
    },
  ];

  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  return (
    <>
      <SeoTags title={siteMeta.title} description={siteMeta.description} />
      <Layout>
        <div className="container mx-auto flex flex-col space-y-6 px-6 py-10">
          <Card color="white" bgColor="brand.950">
            <CardBody>
              <h1 className="text-xl font-bold">Roadmap</h1>
              <p className="text-base">
                Check out the roadmap for TabTime. We're always working on new features and
                improvements, so stay tuned!
              </p>
            </CardBody>
          </Card>
          <Stepper gap="0" colorScheme="brandColor" index={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    active={<StepNumber />}
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                  />
                </StepIndicator>
                <Box flexShrink="0" ml={4}>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription
                    className="mb-6"
                    dangerouslySetInnerHTML={{ __html: step.description }}
                  ></StepDescription>
                </Box>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </div>
        <Footer />
      </Layout>
    </>
  );
}

export const getServerSideProps = async () => {
  const meta = {
    title: 'Roadmap - TabTime',
    description: 'Check out the roadmap for TabTime.',
  };

  return {
    props: {
      siteMeta: meta,
    },
  };
};
