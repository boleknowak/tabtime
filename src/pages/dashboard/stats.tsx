import { getServerSession } from 'next-auth/next';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/Layouts/DashboardLayout';
import SeoTags from '@/components/SeoTags';
import { UserInterface } from '@/interfaces/UserInterface';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import {
  Box,
  Divider,
  Flex,
  HStack,
  Heading,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Anton, Rubik } from 'next/font/google';

type Props = {
  siteMeta: {
    title: string;
  };
  authedUser: UserInterface;
};

type Stats = {
  totalSeconds: number;
  totalVisits: number;
  visits: {
    origin: string;
    seconds: number;
  }[];
};

const antonFont = Anton({ subsets: ['latin'], weight: '400' });
const rubikFont = Rubik({ subsets: ['latin'], weight: '400' });

export default function DashboardStats({ siteMeta, authedUser }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<Stats>({} as Stats);

  const getStats = async () => {
    setIsLoading(true);

    const res = await fetch('/api/stats', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    setStats(data);

    setIsLoading(false);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = seconds % 60;

    return `${hours}h ${minutes}m ${secondsLeft}s`;
  };

  const colorForIndex = (index: number) => {
    switch (index) {
      case 0:
        return useColorModeValue('yellow.500', 'yellow.500');
      case 1:
        return useColorModeValue('gray.500', 'gray.400');
      case 2:
        return useColorModeValue('yellow.800', 'yellow.800');
      default:
        return useColorModeValue('gray.400', 'gray.500');
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <>
      <SeoTags title={siteMeta.title} />
      <DashboardLayout authedUser={authedUser}>
        <Box w="full" mb={4} p={4} bgColor={useColorModeValue('gray.200', 'gray.800')} rounded="lg">
          <Flex align="center" justify="space-between">
            <Box>
              <Heading as="h1" mb={2} size="lg">
                Statistics
              </Heading>
              <Text>Your statistics are shown below.</Text>
            </Box>
          </Flex>
        </Box>
        <Box mt={6}>
          {isLoading && <Spinner />}
          {!isLoading && (
            <div>
              <Box>
                <Heading as="h2" mt={4} size="md">
                  Top 5 sites
                </Heading>
                <Box>
                  {stats.visits?.map((visit, key) => (
                    <Box
                      key={visit.origin}
                      mt={2}
                      p={4}
                      bgGradient={`linear(to-r, ${useColorModeValue(
                        'gray.200',
                        'gray.800'
                      )}, ${useColorModeValue('gray.300', 'gray.700')})`}
                      rounded="lg"
                    >
                      <Flex align="center" justify="space-between">
                        <HStack pos="relative" spacing={12}>
                          <Box
                            className="-rotate-12"
                            pos="absolute"
                            top={-3}
                            left={-2}
                            fontSize={32}
                            opacity={0.7}
                          >
                            <Text as="span" color={colorForIndex(key)}>
                              <span className={antonFont.className}>#{key + 1}</span>
                            </Text>
                          </Box>
                          <Text fontWeight="bold">{visit.origin}</Text>
                        </HStack>
                        <Text>
                          <span className={rubikFont.className}>{formatTime(visit.seconds)}</span>
                        </Text>
                      </Flex>
                    </Box>
                  ))}
                  <Flex justify="end">
                    <Box>
                      <Divider w={48} mt={4} />
                      <Text mt={2} fontSize="sm" textAlign="right">
                        <strong>Total:</strong> {formatTime(stats.totalSeconds)}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </div>
          )}
        </Box>
      </DashboardLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      siteMeta: {
        title: 'Statistics - TabTime',
      },
      authedUser: session.user as UserInterface,
    },
  };
}
