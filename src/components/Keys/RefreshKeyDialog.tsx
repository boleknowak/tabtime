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

type RefreshKeyDialogProps = {
  token: TokenInterface;
  cancelRef: React.RefObject<HTMLButtonElement>;
  isOpen: boolean;
  onClose: () => void;
  getTokens: () => void;
  closeManageKeyModal: () => void;
};

export const RefreshKeyDialog = ({
  token,
  cancelRef,
  isOpen,
  onClose,
  getTokens,
  closeManageKeyModal,
}: RefreshKeyDialogProps) => {
  const [isRefreshingToken, setIsRefreshingToken] = useState(false);
  const toast = useToast();

  const refreshToken = async () => {
    setIsRefreshingToken(true);

    const response = await fetch('/api/tokens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        action: 'refresh',
      }),
    });

    const data = await response.json();

    if (data.success) {
      onClose();
      setIsRefreshingToken(false);
      getTokens();
      closeManageKeyModal();
      toast({
        title: data.message,
        status: 'success',
        duration: 3500,
        position: 'top',
        isClosable: true,
      });
    } else {
      setIsRefreshingToken(false);
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
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Regenerate key "{token.name || 'Untitled'}"
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards. You will need to update the key in
            your browser extension.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              ml={3}
              colorScheme="blue"
              isLoading={isRefreshingToken}
              onClick={() => refreshToken()}
            >
              Yes, regenerate
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
