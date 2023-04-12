import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Divider,
  ListItem,
  OrderedList,
  Text,
} from '@chakra-ui/react';

type AboutKeyDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  cancelRef: React.RefObject<HTMLButtonElement>;
};

export const AboutKeyDialog = ({ isOpen, onClose, cancelRef }: AboutKeyDialogProps) => (
  <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
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
            <ListItem>Access keys are used to identify your browser extension.</ListItem>
            <ListItem>You can use the access keys you've generated in multiple browsers.</ListItem>
            <ListItem>
              You can filter your time entries by access key and operating system.
            </ListItem>
            <ListItem>For now, Access keys are only used for time tracking.</ListItem>
            <ListItem>In the future we will add more features to access keys.</ListItem>
          </OrderedList>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            OK
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>
);
