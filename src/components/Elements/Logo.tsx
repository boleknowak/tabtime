import { Link, Text, useBreakpointValue } from '@chakra-ui/react';
import { Pacifico } from 'next/font/google';
import NextLink from 'next/link';

const pacificoFont = Pacifico({ subsets: ['latin'], weight: '400' });

export default function Logo() {
  return (
    <Link
      as={NextLink}
      display="inline-block"
      textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
      href="/"
      style={{ textDecoration: 'none' }}
    >
      <Text fontWeight="bold">
        <span className={pacificoFont.className}>TabTime</span>
      </Text>
    </Link>
  );
}
