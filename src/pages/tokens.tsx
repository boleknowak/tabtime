import Layout from '@/components/Layouts/Layout';
import SeoTags from '@/components/SeoTags';
import { UserInterface } from '@/interfaces/UserInterface';
import { copyToClipboard } from '@/lib/copyToClipboard';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
import { useEffect, useState } from 'react';

type Props = {
  siteMeta: {
    title: string;
  };
  authedUser: UserInterface;
};

export default function Tokens({ siteMeta, authedUser }: Props) {
  const [tokens, setTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateTokenForm, setShowCreateTokenForm] = useState(false);

  const getTokens = async () => {
    setIsLoading(true);
    const response = await fetch('/api/tokens', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    setIsLoading(false);
    setTokens(data.tokens);
  };

  const createToken = async (event) => {
    event.preventDefault();

    const tokenName = event.target.tokenName.value;

    const response = await fetch('/api/tokens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: tokenName,
      }),
    });

    const data = await response.json();

    if (data.success) {
      setShowCreateTokenForm(false);
      getTokens();
    }
  };

  useEffect(() => {
    getTokens();
  }, []);

  return (
    <>
      <SeoTags title={siteMeta.title} />
      <Layout>
        <div className="mx-auto max-w-xl">
          <div className="mb-10 mt-10 w-full px-4">
            <div className="mb-4 flex flex-row items-center justify-between">
              <div className="font-bold">Your tokens, {authedUser.name}</div>
              <div>
                <div className="space-x-2">
                  <button
                    type="button"
                    className="rounded bg-blue-500 px-2 text-white"
                    onClick={getTokens}
                  >
                    Refresh
                  </button>
                  <button
                    type="button"
                    className="rounded bg-blue-500 px-2 text-white"
                    disabled={authedUser.maxTokens <= tokens.length}
                    onClick={() => setShowCreateTokenForm(!showCreateTokenForm)}
                  >
                    Create token
                  </button>
                </div>
              </div>
            </div>
            <div>
              {isLoading && (
                <div className="space-y-2">
                  {Array.from({ length: authedUser.maxTokens }, (_, i) => i).map((i) => (
                    <div key={i} className="h-10 w-full animate-pulse rounded bg-gray-100"></div>
                  ))}
                </div>
              )}
              {!isLoading && tokens.length === 0 && <div>You have no tokens.</div>}
              {!isLoading && tokens.length !== 0 && (
                <div className="space-y-2">
                  {tokens.map((token) => (
                    <div
                      key={token.id}
                      className="flex flex-row items-center justify-between rounded bg-gray-100 p-4"
                    >
                      <div>
                        {token.name && <div className="font-bold">{token.name}</div>}
                        {!token.name && <div className="font-medium italic">Untitled</div>}
                        <div className="text-xs text-gray-500">{token.createdAt}</div>
                      </div>
                      <div className="space-x-2">
                        <button onClick={() => copyToClipboard(token.token)}>Copy</button>
                        <button>Edit</button>
                        <button>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {showCreateTokenForm && (
                <div className="my-4">
                  <form className="space-y-2" onSubmit={createToken}>
                    <div>
                      <label className="block" htmlFor="tokenName">
                        Token name
                      </label>
                      <input
                        type="text"
                        id="tokenName"
                        name="tokenName"
                        placeholder="e.g. My personal token"
                        className="rounded border-2 border-gray-300 px-2"
                      />
                    </div>
                    <button type="submit" className="rounded bg-blue-500 px-2 text-white">
                      Create
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
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
        title: 'Tokens - TabTime',
      },
      authedUser: session.user as UserInterface,
    },
  };
}
