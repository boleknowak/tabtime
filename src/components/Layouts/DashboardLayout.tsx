import { IconType } from 'react-icons';
import { FiBell, FiChevronDown, FiChevronUp, FiMenu, FiMoon, FiSun } from 'react-icons/fi';
import { RiKey2Line } from 'react-icons/ri';
import { BiHomeSmile, BiBarChartAlt2 } from 'react-icons/bi';
import { UserInterface } from '@/interfaces/UserInterface';
import {
  Avatar,
  Box,
  BoxProps,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import NextLink from 'next/link';
import { Pacifico } from 'next/font/google';

interface LinkItemProps {
  name: string;
  href?: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', href: '/dashboard', icon: BiHomeSmile },
  { name: 'Access keys', href: '/dashboard/keys', icon: RiKey2Line },
  { name: 'Statistics', href: '/dashboard/stats', icon: BiBarChartAlt2 },
];

interface NavItemProps extends FlexProps {
  icon: IconType;
  href: string;
  children: string;
}
const NavItem = ({ icon, href, children, ...rest }: NavItemProps) => (
  <Link as={NextLink} _focus={{ boxShadow: 'none' }} href={href} style={{ textDecoration: 'none' }}>
    <Flex
      align="center"
      mx={4}
      my={2}
      px={4}
      py={2}
      borderRadius="lg"
      _hover={{
        bg: 'blue.400',
        color: 'white',
      }}
      cursor="pointer"
      role="group"
      {...rest}
    >
      {icon && (
        <Icon
          as={icon}
          mr="4"
          fontSize="20"
          _groupHover={{
            color: 'white',
          }}
        />
      )}
      {children}
    </Flex>
  </Link>
);

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const pacificoFont = Pacifico({ subsets: ['latin'], weight: '400' });

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => (
  <Box
    pos="fixed"
    w={{ base: 'full', md: 60 }}
    h="full"
    bg={useColorModeValue('white', 'gray.900')}
    borderRight="1px"
    borderRightColor={useColorModeValue('gray.200', 'gray.700')}
    transition="250ms ease"
    {...rest}
  >
    <Flex align="center" justify="space-between" h="20" mx="8">
      <Link as={NextLink} href="/dashboard" style={{ textDecoration: 'none' }}>
        <Text fontSize="2xl" fontWeight="bold">
          <span className={pacificoFont.className}>TabTime</span>
        </Text>
      </Link>
      <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
    </Flex>
    {LinkItems.map((link) => (
      <NavItem key={link.name} icon={link.icon} href={link.href}>
        {link.name}
      </NavItem>
    ))}
  </Box>
);

interface MobileProps extends FlexProps {
  onOpen: () => void;
  toggleColorMode: () => void;
  colorMode: string;
  authedUser: UserInterface;
}
const MobileNav = ({ onOpen, authedUser, toggleColorMode, colorMode, ...rest }: MobileProps) => (
  <Flex
    align="center"
    justify={{ base: 'space-between', md: 'flex-end' }}
    h="20"
    ml={{ base: 0, md: 60 }}
    px={{ base: 4, md: 4 }}
    bg={useColorModeValue('white', 'gray.900')}
    borderBottomWidth="1px"
    borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
    {...rest}
  >
    <IconButton
      display={{ base: 'flex', md: 'none' }}
      aria-label="open menu"
      icon={<FiMenu />}
      onClick={onOpen}
      variant="outline"
    />

    <Text
      display={{ base: 'flex', md: 'none' }}
      fontFamily="monospace"
      fontSize="2xl"
      fontWeight="bold"
    >
      TabTime
    </Text>

    <HStack spacing={{ base: '0', md: '2' }}>
      <IconButton
        aria-label="toggle theme"
        icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
        onClick={toggleColorMode}
        size="lg"
        variant="ghost"
      />
      <IconButton aria-label="open menu" icon={<FiBell />} size="lg" variant="ghost" />
      <Flex align={'center'}>
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                p={2}
                _hover={{
                  bgColor: useColorModeValue('gray.100', 'gray.700'),
                }}
                _focus={{ boxShadow: 'none', bgColor: useColorModeValue('gray.200', 'gray.600') }}
                transition="all 0.1s"
                rounded="md"
              >
                <HStack spacing={4}>
                  <Avatar size={'sm'} src={authedUser.image} />
                  <VStack
                    alignItems="flex-start"
                    display={{ base: 'none', md: 'flex' }}
                    ml="2"
                    spacing="1px"
                  >
                    <Text fontSize="sm">{authedUser.name}</Text>
                    {/* <Text color="gray.600" fontSize="xs">Admin</Text> */}
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                p={2}
                bg={useColorModeValue('white', 'gray.900')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}
              >
                <MenuItem
                  as={NextLink}
                  bg={useColorModeValue('white', 'gray.900')}
                  _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
                  href="/dashboard/account"
                  rounded="md"
                >
                  Account
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  bg={useColorModeValue('white', 'gray.900')}
                  _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
                  onClick={() => signOut()}
                  rounded="md"
                >
                  Sign out
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      </Flex>
    </HStack>
  </Flex>
);

export default function DashboardLayout({ children, authedUser }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        onClose={onClose}
        onOverlayClick={onClose}
        placement="left"
        returnFocusOnClose={false}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav
        onOpen={onOpen}
        authedUser={authedUser}
        toggleColorMode={toggleColorMode}
        colorMode={colorMode}
      />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}
