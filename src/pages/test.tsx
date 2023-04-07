import SeoTags from '@/components/SeoTags';
import { UserInterface } from '@/interfaces/UserInterface';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Test({ siteMeta }) {
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const { data: session } = useSession();

  const user = session?.user as UserInterface;

  useEffect(() => {
    setIsLoadingPage(false);
  }, []);

  return (
    <>
      <SeoTags title={siteMeta.title} />
      <main className="mx-auto max-w-xl">
        <div className="mb-10 mt-10 w-full px-4">
          {isLoadingPage && <div>Loading page...</div>}
          {!isLoadingPage && <div>hello {user.name}!</div>}
        </div>
      </main>
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
        title: 'TabTime',
      },
    },
  };
}
