import DashboardLayout from '@/components/Layouts/DashboardLayout';
import SeoTags from '@/components/SeoTags';
import { UserInterface } from '@/interfaces/UserInterface';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { Heading } from '@chakra-ui/react';
import { getServerSession } from 'next-auth/next';

type Props = {
  siteMeta: {
    title: string;
  };
  authedUser: UserInterface;
};

export default function DashboardIndex({ siteMeta, authedUser }: Props) {
  return (
    <>
      <SeoTags title={siteMeta.title} />
      <DashboardLayout authedUser={authedUser}>
        <Heading as="h1" mb={4} size="lg">
          Hello friend! 🌱
        </Heading>
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
        title: 'Account - TabTime',
      },
      authedUser: session.user as UserInterface,
    },
  };
}
