import { TokenInterface } from '@/interfaces/TokenInterface';
import { UserInterface } from '@/interfaces/UserInterface';
import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

type CreateKeyModalProps = {
  tokens: TokenInterface[];
  authedUser: UserInterface;
  isOpen: boolean;
  onClose: () => void;
  getTokens: () => void;
};

export const CreateKeyModal = ({
  tokens,
  authedUser,
  isOpen,
  onClose,
  getTokens,
}: CreateKeyModalProps) => {
  const [isCreatingToken, setIsCreatingToken] = useState(false);
  const toast = useToast();

  const createToken = async (event) => {
    event.preventDefault();
    setIsCreatingToken(true);

    const tokenName = event.target.tokenName.value;

    const response = await fetch('/api/keys', {
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
      setIsCreatingToken(false);
      getTokens();
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

  return (
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
  );
};
