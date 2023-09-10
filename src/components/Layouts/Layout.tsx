import { Button } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { Pacifico } from 'next/font/google';
import { useRouter } from 'next/router';

const PacificoFont = Pacifico({ weight: ['400'], subsets: ['latin'] });

export default function Layout({ children }) {
  // const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  const routes = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'About',
      path: '/about',
    },
    {
      name: 'Pricing',
      path: '/pricing',
    },
    {
      name: 'Roadmap',
      path: '/roadmap',
    },
  ];

  return (
    <div>
      <div className="mt-20 flex flex-col items-center justify-center">
        <div className="flex flex-col">
          <nav className="fixed left-0 right-0 top-0 z-10 flex w-full justify-around bg-white/80 py-4 shadow-md backdrop-blur-md">
            <div className="flex items-center">
              <Link href="/" className="cursor-pointer">
                <h3 className="flex flex-row items-center space-x-2 text-2xl font-medium text-brand-950">
                  <Image src="/images/logo.svg" alt="TabTime" width={40} height={40} />
                  <div className={PacificoFont.className}>TabTime</div>
                </h3>
              </Link>
            </div>
            <div className="hidden items-center space-x-2 lg:flex">
              {routes.map((route, routeId) => (
                <Button
                  key={routeId}
                  as={Link}
                  color={route.path === router.asPath ? 'brand.950' : 'brand.950'}
                  _hover={{ bgColor: 'brand.200', color: 'brand.950' }}
                  bgColor={route.path === router.asPath ? 'brand.200' : 'transparent'}
                  href={route.path}
                  variant="ghost"
                >
                  {route.name}
                </Button>
              ))}
            </div>
            <div className="flex items-center space-x-1">
              <Button
                as={Link}
                color={router.asPath === '/register' ? 'brand.950' : 'brand.950'}
                _hover={{ bgColor: 'brand.200', color: 'brand.950' }}
                bgColor={router.asPath === '/register' ? 'brand.200' : 'transparent'}
                href="/register"
                variant="ghost"
              >
                Register
              </Button>
              <Button
                as={Link}
                color={router.asPath === '/login' ? 'brand.950' : 'brand.950'}
                _hover={{ bgColor: 'brand.200', color: 'brand.950' }}
                bgColor={router.asPath === '/login' ? 'brand.200' : 'transparent'}
                href="/login"
                variant="ghost"
              >
                Login
              </Button>
            </div>
          </nav>
        </div>
      </div>
      {/* <Button onClick={toggleColorMode}>Toggle {colorMode === 'light' ? 'Dark' : 'Light'}</Button> */}
      <main>{children}</main>
    </div>
  );
}
