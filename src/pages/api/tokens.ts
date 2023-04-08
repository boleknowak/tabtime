import { UserInterface } from '@/interfaces/UserInterface';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

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

  if (request.method === 'POST') {
    if (tokens.length >= user.maxTokens) {
      return response.status(403).json({ error: 'You have reached your token limit.' });
    }

    const { name } = request.body;

    const token = await prisma.token.create({
      data: {
        name: name || null,
        token: uuidv4(),
        userId: user.id,
      },
    });

    return response.status(200).json({
      success: true,
      message: 'Token created successfully.',
      token,
    });
  }

  return response.status(200).json({
    tokens,
  });
}
