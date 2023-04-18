import { Button, useColorMode } from '@chakra-ui/react';
import WithSubnavigation from '@/components/Elements/Navbar';

export default function Layout({ children }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div>
      <WithSubnavigation />
      <Button onClick={toggleColorMode}>Toggle {colorMode === 'light' ? 'Dark' : 'Light'}</Button>
      <main>{children}</main>
    </div>
  );
}
