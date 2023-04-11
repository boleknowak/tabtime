import { getServerSession } from 'next-auth/next';
import { useEffect, useRef, useState } from 'react';
import { IoMdRefresh } from 'react-icons/io';
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
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Image from 'next/image';
import { TokenBox } from '@/components/Elements/TokenBox';

type Props = {
  siteMeta: {
    title: string;
  };
  authedUser: UserInterface;
};

type SelectedToken = {
  id: string;
  name: string;
  token: string;
  createdAt: string;
};

export default function DashboardTokens({ siteMeta, authedUser }: Props) {
  const [tokens, setTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingToken, setIsCreatingToken] = useState(false);
  const [isDeletingToken, setIsDeletingToken] = useState(false);
  const [selectedToken, setSelectedToken] = useState({} as SelectedToken);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

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
    setIsCreatingToken(true);

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
      onClose();
      getTokens();
      setIsCreatingToken(false);
      toast({
        title: 'Token created',
        description: data.message,
        status: 'success',
        duration: 3500,
        position: 'top',
        isClosable: true,
      });
    }
  };

  const deleteTokenModal = (token) => {
    onOpenDelete();
    setSelectedToken(token);
  };

  const deleteToken = async (token) => {
    setIsDeletingToken(true);
    try {
      const response = await fetch('/api/tokens', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
        }),
      });

      const data = await response.json();

      if (data.success) {
        onCloseDelete();
        getTokens();
        setIsDeletingToken(false);
        toast({
          title: 'Token deleted',
          description: data.message,
          status: 'info',
          duration: 3500,
          position: 'top',
          isClosable: true,
        });
      } else {
        setIsDeletingToken(false);
        toast({
          title: 'Something went wrong',
          description: data.message,
          status: 'error',
          duration: 3500,
          position: 'top',
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Something went wrong!',
        status: 'error',
        duration: 3500,
        position: 'top',
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getTokens();
  }, []);

  return (
    <>
      <SeoTags title={siteMeta.title} />
      <DashboardLayout authedUser={authedUser}>
        <Box w="full" mb={4} p={4} bgColor="gray.200" rounded="lg">
          <Flex align="center" justify="space-between">
            <Box>
              <Heading as="h1" mb={2} size="lg">
                Tokens
              </Heading>
              <Text>
                Tokens are used to authenticate your requests to the TabTime API. You can create up
                to {authedUser.maxTokens} tokens.
              </Text>
            </Box>
            <Box>
              <HStack spacing={4}>
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
                  label="You have reached your maximum number of tokens."
                  placement="top"
                >
                  <Button
                    colorScheme="blue"
                    isDisabled={authedUser.maxTokens <= tokens.length}
                    onClick={onOpen}
                  >
                    Create token
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
                    <Text color="gray.800" fontSize="lg">
                      You have <span className="font-bold">{tokens.length}</span> tokens.
                    </Text>
                    <Button mt={6} colorScheme="blue" onClick={onOpen}>
                      Create first token
                    </Button>
                  </Box>
                </Flex>
              )}
              {!isLoading && tokens.length !== 0 && (
                <Grid gap={4} templateColumns="repeat(4, 1fr)">
                  {tokens.map((token) => (
                    <GridItem key={token.id}>
                      <TokenBox token={token} deleteTokenModal={deleteTokenModal} />
                    </GridItem>
                  ))}
                </Grid>
              )}
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <form onSubmit={createToken}>
                    <ModalHeader>Create a new token</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <FormControl>
                        <FormLabel>Name your token</FormLabel>
                        <Input
                          id="tokenName"
                          name="tokenName"
                          placeholder="e.g. My personal token"
                          type="text"
                        />
                        <FormHelperText>if you want :P</FormHelperText>
                      </FormControl>
                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme="blue" isLoading={isCreatingToken} type="submit">
                        Create
                      </Button>
                    </ModalFooter>
                  </form>
                </ModalContent>
              </Modal>
              <AlertDialog
                isOpen={isOpenDelete}
                leastDestructiveRef={cancelRef}
                onClose={onCloseDelete}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Delete token {selectedToken.name || 'Untitled'}
                    </AlertDialogHeader>
                    <AlertDialogBody>
                      Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onCloseDelete}>
                        Cancel
                      </Button>
                      <Button
                        ml={3}
                        colorScheme="red"
                        isLoading={isDeletingToken}
                        onClick={() => deleteToken(selectedToken)}
                      >
                        Yes, delete
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
        title: 'Tokens - TabTime',
      },
      authedUser: session.user as UserInterface,
    },
  };
}
