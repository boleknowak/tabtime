import { getServerSession } from 'next-auth';
import { UserInterface } from '@/interfaces/UserInterface';
import { prisma } from '@/lib/db';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import type { NextApiRequest, NextApiResponse } from 'next';

interface Visit {
  origin: string;
  seconds: number;
}

const calculateTotalSeconds = (visits: Visit[]): number =>
  visits.reduce((acc, visit) => acc + visit.seconds, 0);

const groupVisits = (visits: Visit[]): Visit[] => {
  const groupedVisits: Record<string, Visit> = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const visit of visits) {
    const { origin, seconds } = visit;
    if (!groupedVisits[origin]) {
      groupedVisits[origin] = { origin, seconds };
    } else {
      groupedVisits[origin].seconds += seconds;
    }
  }

  return Object.values(groupedVisits);
};

const sortVisitsBySecondsDesc = (visits: Visit[]): Visit[] =>
  visits.sort((a, b) => b.seconds - a.seconds);

const processVisits = (
  visits: Visit[]
): {
  totalSeconds: number;
  totalVisits: number;
  visits: Visit[];
} => {
  let totalSeconds = 0;
  let totalVisits = 0;
  let transformedVisits: Visit[] = [];
  if (visits.length > 0) {
    const groupedVisits = groupVisits(visits);
    const groupedVisitsArray = sortVisitsBySecondsDesc(groupedVisits);

    totalSeconds = calculateTotalSeconds(groupedVisitsArray);
    transformedVisits = groupedVisitsArray;
    totalVisits = visits.length;
  }

  return {
    totalSeconds,
    totalVisits,
    visits: transformedVisits,
  };
};

export default async function handle(request: NextApiRequest, response: NextApiResponse) {
  const session = await getServerSession(request, response, authOptions);

  if (!session) {
    return response.status(401).json({ error: 'You must be signed in to access this resource.' });
  }

  const user = session?.user as UserInterface;

  const tokens = await prisma.token.findMany({
    where: {
      userId: user.id,
    },
  });

  let visits = [];

  if (tokens.length !== 0) {
    // eslint-disable-next-line no-restricted-syntax
    for (const token of tokens) {
      // eslint-disable-next-line no-await-in-loop
      const visitForToken = await prisma.visit.groupBy({
        by: ['origin'],
        where: {
          tokenId: token.id,
        },
        _sum: {
          seconds: true,
        },
        orderBy: {
          _sum: {
            seconds: 'desc',
          },
        },
        take: 5,
      });

      visits.push(...visitForToken);
    }
  }

  visits = visits.map((visit) => {
    // eslint-disable-next-line no-param-reassign, no-underscore-dangle
    visit.seconds = visit._sum.seconds;
    // eslint-disable-next-line no-param-reassign, no-underscore-dangle
    delete visit._sum;
    return visit;
  });

  return response.status(200).json(processVisits(visits));
}
