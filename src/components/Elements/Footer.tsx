import Image from 'next/image';
import Link from 'next/link';
import { Pacifico } from 'next/font/google';
import { RiGithubFill, RiTwitterXLine } from 'react-icons/ri';
import { Button, Input } from '@chakra-ui/react';

const PacificoFont = Pacifico({ weight: ['400'], subsets: ['latin'] });

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800 dark:text-white xl:text-2xl">
              Stay updated.
            </h1>
            <div className="mx-auto mt-6 flex flex-col space-y-3 md:flex-row md:space-x-4 md:space-y-0">
              <div>
                <Input placeholder="Email Address" />
              </div>
              <div>
                <Button
                  color="white"
                  _hover={{ bgColor: 'brand.900' }}
                  _focus={{ bgColor: 'brand.900' }}
                  bgColor="brand.950"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <div>
            <p className="font-semibold text-gray-800 dark:text-white">Links</p>
            <div className="mt-5 flex flex-col items-start space-y-2">
              <Link href="/" className="text-gray-600 hover:text-brand-950 hover:underline">
                Home
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-brand-950 hover:underline">
                About
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-brand-950 hover:underline">
                Pricing
              </Link>
            </div>
          </div>
          <div>
            <p className="font-semibold text-gray-800 dark:text-white">&nbsp;</p>
            <div className="mt-5 flex flex-col items-start space-y-2">
              <Link href="/roadmap" className="text-gray-600 hover:text-brand-950 hover:underline">
                Roadmap
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-brand-950 hover:underline">
                Contact
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-brand-950 hover:underline"
              >
                Account
              </Link>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-700 md:my-8" />
        <div className="flex items-center justify-between">
          <Link href="/" className="cursor-pointer">
            <h3 className="flex flex-row items-center space-x-2 text-2xl font-medium text-brand-950">
              <Image src="/images/logo.svg" alt="TabTime" width={40} height={40} />
              <div className={PacificoFont.className}>TabTime</div>
            </h3>
          </Link>
          <div>
            <div className="-mx-2 flex items-center space-x-6">
              <div className="flex flex-row items-center space-x-4">
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-brand-950 hover:underline"
                >
                  Privacy
                </Link>
                <Link href="/terms" className="text-gray-600 hover:text-brand-950 hover:underline">
                  Terms
                </Link>
              </div>
              <div className="h-6 w-[1px] bg-gray-300"></div>
              <div className="flex flex-row items-center space-x-4">
                <a
                  href="#"
                  className="text-gray-600 transition-colors duration-300 hover:text-brand-950"
                  aria-label="Twitter"
                >
                  <RiTwitterXLine className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 transition-colors duration-300 hover:text-brand-950"
                  aria-label="GitHub"
                >
                  <RiGithubFill className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
