import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { BiListUl, BiCaretDown, BiCaretRight } from 'react-icons/bi';
import { RiCloseFill } from 'react-icons/ri';
import Logo from './Logo';

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Features',
    children: [
      {
        label: 'Explore Design Work',
        subLabel: 'Trending Design to inspire you',
        href: '#',
      },
      {
        label: 'New & Noteworthy',
        subLabel: 'Up-and-coming Designers',
        href: '#',
      },
    ],
  },
  {
    label: 'About',
    href: '#',
  },
];

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => (
  <Link
    display={'block'}
    p={2}
    color="black"
    _hover={{ bg: useColorModeValue('blue.50', 'gray.900') }}
    href={href}
    role={'group'}
    rounded={'md'}
  >
    <Stack align={'center'} direction={'row'}>
      <Box>
        <Text fontWeight={500} _groupHover={{ color: 'blue.400' }} transition={'all .3s ease'}>
          {label}
        </Text>
        <Text fontSize={'sm'}>{subLabel}</Text>
      </Box>
      <Flex
        align={'center'}
        justify={'flex-end'}
        flex={1}
        opacity={0}
        _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
        transform={'translateX(-10px)'}
        transition={'all .3s ease'}
      >
        <Icon as={BiCaretRight} w={5} h={5} color={'blue.400'} />
      </Flex>
    </Stack>
  </Link>
);

const DesktopNav = () => {
  const linkColor = 'white';
  const linkHoverColor = 'gray.400';
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover placement={'bottom-start'} trigger={'hover'}>
            <PopoverTrigger>
              <Link
                p={2}
                color={linkColor}
                fontSize={'sm'}
                fontWeight={500}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
                href={navItem.href ?? '#'}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                minW={'sm'}
                p={4}
                bg={popoverContentBgColor}
                border={0}
                shadow={'xl'}
                rounded={'xl'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack onClick={children && onToggle} spacing={4}>
      <Flex
        as={Link}
        align={'center'}
        justify={'space-between'}
        py={2}
        _hover={{
          textDecoration: 'none',
        }}
        href={href ?? '#'}
      >
        <Text color={useColorModeValue('gray.600', 'gray.200')} fontWeight={600}>
          {label}
        </Text>
        {children && (
          <Icon
            as={BiCaretDown}
            w={6}
            h={6}
            transform={isOpen ? 'rotate(180deg)' : ''}
            transition={'all .25s ease-in-out'}
          />
        )}
      </Flex>

      <Collapse animateOpacity in={isOpen} style={{ marginTop: '0!important' }}>
        <Stack
          align={'start'}
          mt={2}
          pl={4}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          borderLeft={1}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const MobileNav = () => (
  <Stack display={{ md: 'none' }} p={4} bg={useColorModeValue('white', 'gray.800')}>
    {NAV_ITEMS.map((navItem) => (
      <MobileNavItem key={navItem.label} {...navItem} />
    ))}
  </Stack>
);

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        align={'center'}
        minH={'60px'}
        px={{ base: 4 }}
        py={{ base: 2 }}
        color="white"
        bg="blue.900"
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        borderBottom={1}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          display={{ base: 'flex', md: 'none' }}
          ml={{ base: -2 }}
        >
          <IconButton
            aria-label={'Toggle Navigation'}
            icon={isOpen ? <RiCloseFill /> : <BiListUl />}
            onClick={onToggle}
            variant={'ghost'}
          />
        </Flex>
        <Flex justify={{ base: 'center', md: 'start' }} flex={{ base: 1 }}>
          <Logo />
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack justify={'flex-end'} direction={'row'} flex={{ base: 1, md: 0 }} spacing={6}>
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            color={'white'}
            fontSize={'sm'}
            fontWeight={600}
            bg={'blue.400'}
            _hover={{
              bg: 'blue.300',
            }}
            href={'#'}
          >
            Dashboard
          </Button>
        </Stack>
      </Flex>

      <Collapse animateOpacity in={isOpen}>
        <MobileNav />
      </Collapse>
    </Box>
  );
}
