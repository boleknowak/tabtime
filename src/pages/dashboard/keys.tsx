import { getServerSession } from 'next-auth/next';
import { useEffect, useRef, useState } from 'react';
import { IoMdRefresh } from 'react-icons/io';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import DashboardLayout from '@/components/Layouts/DashboardLayout';
import SeoTags from '@/components/SeoTags';
import { UserInterface } from '@/interfaces/UserInterface';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  ListItem,
  OrderedList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import { TokenBox } from '@/components/Elements/TokenBox';
import { TokenInterface } from '@/interfaces/TokenInterface';
import { CreateKeyModal } from '@/components/Keys/CreateKeyModal';
import { ManageKeyModal } from '@/components/Keys/ManageKeyModal';
import { DeleteKeyDialog } from '@/components/Keys/DeleteKeyDialog';
import { RefreshKeyDialog } from '@/components/Keys/RefreshKeyDialog';

type Props = {
  siteMeta: {
    title: string;
  };
  authedUser: UserInterface;
};

export default function DashboardTokens({ siteMeta, authedUser }: Props) {
  const [tokens, setTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletingToken] = useState(false);
  const [isRefreshingToken] = useState(false);
  const [selectedToken, setSelectedToken] = useState({} as TokenInterface);
  const {
    isOpen: isCreateKeyModalOpened,
    onOpen: openCreateKeyModal,
    onClose: closeCreateKeyModalEvent,
  } = useDisclosure();
  const {
    isOpen: isDeleteKeyDialogOpened,
    onOpen: openDeleteKeyDialog,
    onClose: closeDeleteKeyDialogEvent,
  } = useDisclosure();
  const {
    isOpen: isRefreshKeyDialogOpened,
    onOpen: openRefreshKeyDialog,
    onClose: closeRefreshKeyDialogEvent,
  } = useDisclosure();
  const {
    isOpen: isManageKeyModalOpened,
    onOpen: openManageKeyModal,
    onClose: closeManageKeyModalEvent,
  } = useDisclosure();
  const { isOpen: isOpenInfo, onOpen: onOpenInfo, onClose: onCloseInfo } = useDisclosure();
  const cancelDeleteRef = useRef();
  const cancelRefreshRef = useRef();
  const cancelInfoRef = useRef();

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

  const refreshTokenDialog = (token: TokenInterface) => {
    openRefreshKeyDialog();
    setSelectedToken(token);
  };

  const manageTokenModal = (token: TokenInterface) => {
    openManageKeyModal();
    setSelectedToken(token);
  };

  useEffect(() => {
    getTokens();
  }, []);

  return (
    <>
      <SeoTags title={siteMeta.title} />
      <DashboardLayout authedUser={authedUser}>
        <Box w="full" mb={4} p={4} bgColor={useColorModeValue('gray.200', 'gray.800')} rounded="lg">
          <Flex align="center" justify="space-between">
            <Box>
              <Heading as="h1" mb={2} size="lg">
                Access keys
              </Heading>
              <Text>
                Generate up to {authedUser.maxTokens} access keys to use with your browser extension
                for time tracking.
              </Text>
            </Box>
            <Box ml={4}>
              <HStack spacing={2}>
                <IconButton aria-label="Info" icon={<AiOutlineInfoCircle />} onClick={onOpenInfo} />
                <IconButton
                  aria-label="Refresh"
                  icon={<IoMdRefresh />}
                  isLoading={isLoading}
                  onClick={getTokens}
                />
                <Tooltip
                  aria-label="A tooltip"
                  hasArrow
                  isDisabled={authedUser.maxTokens > tokens.length}
                  label="You have reached your maximum number of access keys."
                  placement="top"
                >
                  <Button
                    colorScheme="blue"
                    isDisabled={authedUser.maxTokens <= tokens.length}
                    onClick={openCreateKeyModal}
                  >
                    Create key
                  </Button>
                </Tooltip>
              </HStack>
            </Box>
          </Flex>
        </Box>
        <Box>
          {isLoading && (
            <Flex align="center" justify="center" w="full" mt={10} mb={4}>
              <Spinner color="blue.500" size="xl" />
            </Flex>
          )}
          {!isLoading && (
            <Box>
              {tokens.length === 0 && (
                <Flex align="center" justify="center" w="full" mt={10} mb={4}>
                  <Box textAlign="center">
                    <Image src="/images/opened-box.png" width={200} height={200} alt="Opened box" />
                    <Text color={useColorModeValue('gray.800', 'gray.200')} fontSize="lg">
                      You have <span className="font-bold">{tokens.length}</span> access keys.
                    </Text>
                    <Button mt={6} colorScheme="blue" onClick={openCreateKeyModal}>
                      Create first key
                    </Button>
                  </Box>
                </Flex>
              )}
              {!isLoading && tokens.length !== 0 && (
                <Grid gap={4} templateColumns="repeat(4, 1fr)">
                  {tokens.map((token) => (
                    <GridItem key={token.id}>
                      <TokenBox token={token} manageTokenModal={manageTokenModal} />
                    </GridItem>
                  ))}
                </Grid>
              )}
              <CreateKeyModal
                isOpen={isCreateKeyModalOpened}
                onClose={closeCreateKeyModalEvent}
                tokens={tokens}
                authedUser={authedUser}
                getTokens={getTokens}
              />
              <ManageKeyModal
                isOpen={isManageKeyModalOpened}
                onClose={closeManageKeyModalEvent}
                token={selectedToken}
                deleteKeyDialog={openDeleteKeyDialog}
                isDeletingKey={isDeletingToken}
                refreshTokenDialog={refreshTokenDialog}
                isRefreshingToken={isRefreshingToken}
              />
              <DeleteKeyDialog
                isOpen={isDeleteKeyDialogOpened}
                onClose={closeDeleteKeyDialogEvent}
                cancelRef={cancelDeleteRef}
                token={selectedToken}
                getTokens={getTokens}
                closeManageKeyModal={closeManageKeyModalEvent}
              />
              <RefreshKeyDialog
                isOpen={isRefreshKeyDialogOpened}
                onClose={closeRefreshKeyDialogEvent}
                cancelRef={cancelRefreshRef}
                token={selectedToken}
                getTokens={getTokens}
                closeManageKeyModal={closeManageKeyModalEvent}
              />
              <AlertDialog
                isOpen={isOpenInfo}
                leastDestructiveRef={cancelInfoRef}
                onClose={onCloseInfo}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      About access keys
                    </AlertDialogHeader>
                    <Divider mb={3} />
                    <AlertDialogBody>
                      <Text mb={2} fontWeight="medium">
                        Here are a few important facts about access keys:
                      </Text>
                      <OrderedList>
                        <ListItem>
                          Access keys are used to identify your browser extension.
                        </ListItem>
                        <ListItem>
                          You can use the access keys you've generated in multiple browsers.
                        </ListItem>
                        <ListItem>
                          You can filter your time entries by access key and operating system.
                        </ListItem>
                        <ListItem>For now, Access keys are only used for time tracking.</ListItem>
                        <ListItem>In the future we will add more features to access keys.</ListItem>
                      </OrderedList>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                      <Button ref={cancelInfoRef} onClick={onCloseInfo}>
                        OK
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </Box>
          )}
        </Box>
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
        title: 'Access keys - TabTime',
      },
      authedUser: session.user as UserInterface,
    },
  };
}
