import { TokenInterface } from '@/interfaces/TokenInterface';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

type DeleteKeyDialogProps = {
  token: TokenInterface;
  cancelRef: React.RefObject<HTMLButtonElement>;
  isOpen: boolean;
  onClose: () => void;
  getTokens: () => void;
  closeManageKeyModal: () => void;
};

export const DeleteKeyDialog = ({
  token,
  cancelRef,
  isOpen,
  onClose,
  getTokens,
  closeManageKeyModal,
}: DeleteKeyDialogProps) => {
  const [isDeletingToken, setIsDeletingToken] = useState(false);
  const toast = useToast();

  const deleteToken = async () => {
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
        onClose();
        setIsDeletingToken(false);
        getTokens();
        closeManageKeyModal();
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

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete key "{token.name || 'Untitled'}"
          </AlertDialogHeader>
          <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              ml={3}
              colorScheme="red"
              isLoading={isDeletingToken}
              onClick={() => deleteToken()}
            >
              Yes, delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
