import { copyToClipboard } from '@/lib/copyToClipboard';
import { Box, Divider, Flex, HStack, IconButton, Text, Tooltip } from '@chakra-ui/react';
import Date from '@/components/Date';
import { FiCheck } from 'react-icons/fi';
import { IoMdTrash } from 'react-icons/io';
import { RxCopy } from 'react-icons/rx';
import { TbClockHour3 } from 'react-icons/tb';
import { useState } from 'react';

export const TokenBox = ({ token, deleteTokenModal }) => {
  const [isCopied, setIsCopied] = useState('');

  return (
    <Box w="full" p={2} bgColor="white" rounded="md">
      <Box>
        <Flex align="center" justify="space-between">
          <Box>
            {token.name && <div className="font-bold">{token.name}</div>}
            {!token.name && <div className="font-medium italic">Untitled</div>}
          </Box>
          <HStack spacing={1}>
            <Tooltip aria-label="Copy token" hasArrow label="Copy to clipboard" placement="top">
              <IconButton
                aria-label="Copy token"
                colorScheme="blue"
                icon={isCopied === token.token ? <FiCheck /> : <RxCopy />}
                onClick={() => {
                  copyToClipboard(token.token);
                  setIsCopied(token.token);
                  setTimeout(() => {
                    setIsCopied('');
                  }, 1500);
                }}
                size="sm"
                variant="outline"
              />
            </Tooltip>
            <Tooltip aria-label="Delete token" hasArrow label="Delete token" placement="top">
              <IconButton
                aria-label="Delete token"
                colorScheme="red"
                icon={<IoMdTrash />}
                onClick={() => deleteTokenModal(token)}
                size="sm"
                variant="outline"
              />
            </Tooltip>
          </HStack>
        </Flex>
        <Divider my={2} />
        <Flex align="center" direction="row" color="gray.500">
          <TbClockHour3 />
          <Text ml={1} fontSize="xs">
            <Date dateString={token.createdAt} withTime />
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};
