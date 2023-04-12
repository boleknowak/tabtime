import { getServerSession } from 'next-auth/next';
import { useEffect, useRef, useState } from 'react';
import { IoMdRefresh } from 'react-icons/io';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';
import { HiRefresh } from 'react-icons/hi';
import DashboardLayout from '@/components/Layouts/DashboardLayout';
import SeoTags from '@/components/SeoTags';
import { UserInterface } from '@/interfaces/UserInterface';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Input,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  OrderedList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
  useColorModeValue,
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
  const [isRegeneratingToken, setIsRegeneratingToken] = useState(false);
  const [selectedToken, setSelectedToken] = useState({} as SelectedToken);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const {
    isOpen: isOpenRegenerate,
    onOpen: onOpenRegenerate,
    onClose: onCloseRegenerate,
  } = useDisclosure();
  const { isOpen: isOpenManage, onOpen: onOpenManage, onClose: onCloseManage } = useDisclosure();
  const { isOpen: isOpenInfo, onOpen: onOpenInfo, onClose: onCloseInfo } = useDisclosure();
  const cancelRef = useRef();
  const cancelInfoRef = useRef();
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
        action: 'create',
      }),
    });

    const data = await response.json();

    if (data.success) {
      onClose();
      getTokens();
      setIsCreatingToken(false);
      toast({
        title: data.message,
        status: 'success',
        duration: 3500,
        position: 'top',
        isClosable: true,
      });
    } else {
      setIsCreatingToken(false);
      toast({
        title: data.message,
        status: 'error',
        duration: 3500,
        position: 'top',
        isClosable: true,
      });
    }
  };

  const regenerateToken = async (token) => {
    setIsRegeneratingToken(true);

    const response = await fetch('/api/tokens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        action: 'regenerate',
      }),
    });

    const data = await response.json();

    if (data.success) {
      onCloseRegenerate();
      onCloseManage();
      getTokens();
      setIsRegeneratingToken(false);
      toast({
        title: data.message,
        status: 'success',
        duration: 3500,
        position: 'top',
        isClosable: true,
      });
    } else {
      setIsRegeneratingToken(false);
      toast({
        title: data.message,
        status: 'error',
        duration: 3500,
        position: 'top',
        isClosable: true,
      });
    }
  };

  const regenerateTokenModal = (token) => {
    onOpenRegenerate();
    setSelectedToken(token);
  };

  const deleteTokenModal = (token) => {
    onOpenDelete();
    setSelectedToken(token);
  };

  const manageTokenModal = (token) => {
    onOpenManage();
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
        onCloseManage();
        getTokens();
        setIsDeletingToken(false);
        toast({
          title: data.message,
          status: 'info',
          duration: 3500,
          position: 'top',
          isClosable: true,
        });
      } else {
        setIsDeletingToken(false);
        toast({
          title: data.message,
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
            <Box>
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
                    onClick={onOpen}
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
                    <Button mt={6} colorScheme="blue" onClick={onOpen}>
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
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <form onSubmit={createToken}>
                    <ModalHeader>Generate a new access key</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <FormControl>
                        <FormLabel>Name your key</FormLabel>
                        <Input
                          id="tokenName"
                          name="tokenName"
                          placeholder="e.g. My personal computer"
                          type="text"
                        />
                        <FormHelperText fontSize="xs" fontStyle="italic">
                          This is optional.
                        </FormHelperText>
                      </FormControl>
                    </ModalBody>
                    <Divider mt={4} />
                    <ModalFooter>
                      <HStack spacing={4}>
                        <Text color={useColorModeValue('gray.500', 'gray.400')} fontSize="sm">
                          You have {tokens.length} / {authedUser.maxTokens} access keys.
                        </Text>
                        <Button colorScheme="blue" isLoading={isCreatingToken} type="submit">
                          Create
                        </Button>
                      </HStack>
                    </ModalFooter>
                  </form>
                </ModalContent>
              </Modal>
              <Modal isOpen={isOpenManage} onClose={onCloseManage} size="lg">
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Manage key "{selectedToken.name || 'Untitled'}"</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Accordion allowToggle>
                      <AccordionItem>
                        <h2>
                          <AccordionButton>
                            <Box as="div" flex="1" textAlign="left">
                              <HStack spacing={2}>
                                <AiOutlineInfoCircle />
                                <div>Regenerating your key</div>
                              </HStack>
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          To ensure the security of your access key and prevent any potential leaks,
                          you have the option to regenerate it. Regenerating the key will also
                          invalidate the old one, but it won't impact the time you've already
                          tracked. After you regenerate the key, you will need to update it in your
                          browser extension.
                        </AccordionPanel>
                      </AccordionItem>
                      <AccordionItem>
                        <h2>
                          <AccordionButton>
                            <Box as="div" flex="1" textAlign="left">
                              <HStack spacing={2}>
                                <AiOutlineInfoCircle />
                                <div>Deleting your key</div>
                              </HStack>
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          If you wish to permanently remove the access key, you have the option to
                          delete it. However, please note that this action will also remove all the
                          tracked time associated with that key.
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </ModalBody>
                  <ModalFooter>
                    <HStack spacing={2}>
                      <Button
                        colorScheme="red"
                        isLoading={isDeletingToken}
                        leftIcon={<FaTrash />}
                        loadingText="Delete key"
                        onClick={() => deleteTokenModal(selectedToken)}
                      >
                        Delete key
                      </Button>
                      <Button
                        colorScheme="blue"
                        isLoading={isRegeneratingToken}
                        leftIcon={<HiRefresh />}
                        loadingText="Regenerate key"
                        onClick={() => regenerateTokenModal(selectedToken)}
                      >
                        Regenerate key
                      </Button>
                    </HStack>
                  </ModalFooter>
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
                      Delete key "{selectedToken.name || 'Untitled'}"
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
              <AlertDialog
                isOpen={isOpenRegenerate}
                leastDestructiveRef={cancelRef}
                onClose={onCloseRegenerate}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Regenerate key "{selectedToken.name || 'Untitled'}"
                    </AlertDialogHeader>
                    <AlertDialogBody>
                      Are you sure? You can't undo this action afterwards. You will need to update
                      the key in your browser extension.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onCloseRegenerate}>
                        Cancel
                      </Button>
                      <Button
                        ml={3}
                        colorScheme="blue"
                        isLoading={isRegeneratingToken}
                        onClick={() => regenerateToken(selectedToken)}
                      >
                        Yes, regenerate
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
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
