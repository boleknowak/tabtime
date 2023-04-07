import { UserInterface } from '@/interfaces/UserInterface';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handle(request: NextApiRequest, response: NextApiResponse) {
  const session = await getServerSession(request, response, authOptions);

  if (!session) {
    return response.status(401).json({ error: 'unauthorized' });
  }

  const user = session?.user as UserInterface;

  return response.status(200).json({
    user: {
      name: user.name,
    },
  });
}
