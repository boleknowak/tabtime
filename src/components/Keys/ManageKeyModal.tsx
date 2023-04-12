import { TokenInterface } from '@/interfaces/TokenInterface';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';
import { HiRefresh } from 'react-icons/hi';

type ManageKeyModalProps = {
  token: TokenInterface;
  isOpen: boolean;
  onClose: () => void;
  deleteKeyDialog: (token: TokenInterface) => void;
  isDeletingKey: boolean;
  isRefreshingToken: boolean;
  refreshTokenDialog: (token: TokenInterface) => void;
};

export const ManageKeyModal = ({
  token,
  isOpen,
  onClose,
  deleteKeyDialog,
  isDeletingKey,
  isRefreshingToken,
  refreshTokenDialog,
}: ManageKeyModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} size="lg">
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Manage key "{token.name || 'Untitled'}"</ModalHeader>
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
              To ensure the security of your access key and prevent any potential leaks, you have
              the option to regenerate it. Regenerating the key will also invalidate the old one,
              but it won't impact the time you've already tracked. After you regenerate the key, you
              will need to update it in your browser extension.
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
              If you wish to permanently remove the access key, you have the option to delete it.
              However, please note that this action will also remove all the tracked time associated
              with that key.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </ModalBody>
      <ModalFooter>
        <HStack spacing={2}>
          <Button
            colorScheme="red"
            isLoading={isDeletingKey}
            leftIcon={<FaTrash />}
            loadingText="Delete key"
            onClick={() => deleteKeyDialog(token)}
          >
            Delete key
          </Button>
          <Button
            colorScheme="blue"
            isLoading={isRefreshingToken}
            leftIcon={<HiRefresh />}
            loadingText="Regenerate key"
            onClick={() => refreshTokenDialog(token)}
          >
            Regenerate key
          </Button>
        </HStack>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
