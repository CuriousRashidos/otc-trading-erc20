import { Box, useDisclosure, Button, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ContractContext } from "../../hooks/useContract";
const BuyOption = ({ address, name, amount, price, seller, pointer }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    otcContract: { buyOption },
  } = useContext(ContractContext);
  return (
    <Box>
      <Box
        display="flex"
        p="1rem"
        w="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Button px="2rem" colorScheme="blue" onClick={onOpen}>
          Buy
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm purchase</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Text fontSize="0.9rem">Do you wish to buy </Text>
            <Text fontWeight="bolder" color="blue.500">
              {amount} of {name} for {price} (WEI)
            </Text>

            <Text fontSize="0.9rem">Address: </Text>
            <Text fontWeight="bolder" color="blue.500">
              {address}
            </Text>
            <Text fontSize="0.9rem">Seller: </Text>
            <Text fontWeight="bolder" color="blue.500">
              {seller}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={async () => {
                await buyOption(pointer);
                onClose();
              }}
              colorScheme="blue"
              mr={3}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BuyOption;
