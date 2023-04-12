import { getServerSession } from 'next-auth';
import { v4 as uuidv4 } from 'uuid';
import { UserInterface } from '@/interfaces/UserInterface';
import { prisma } from '@/lib/db';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import type { NextApiRequest, NextApiResponse } from 'next';

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
      return response.status(403).json({
        success: false,
        message: 'You have reached your access key limit.',
      });
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
      message: 'Access key successfully created!',
      token,
    });
  }

  if (request.method === 'DELETE') {
    const { token } = request.body;

    const tokenExists = tokens.find((t) => t.token === token.token);

    if (!tokenExists) {
      return response.status(404).json({
        success: false,
        message: 'Access key not found.',
      });
    }

    await prisma.token.delete({
      where: {
        token: token.token,
      },
    });

    return response.status(200).json({
      success: true,
      message: 'Access key deleted successfully.',
    });
  }

  return response.status(200).json({
    tokens,
  });
}
