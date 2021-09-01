import { Box, useDisclosure, Button, Text } from "@chakra-ui/react";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const BuyOption = ({
  address,
  name,
  amount,
  price,
  seller,
  handleConfirm,
  pointer,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Box
        display="flex"
        p="1rem"
        w="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize="0.9rem" mr="1rem">
          {name} X {amount} for {price} ETH
        </Text>

        <Button px="2rem" colorScheme="teal" onClick={onOpen}>
          Buy
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm purchase</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Text fontSize="0.9rem">Do you wish to buy:</Text>
            <Text fontWeight="bolder" color="teal">
              {name} x {amount}
            </Text>

            <Text fontSize="0.9rem">Address: </Text>
            <Text fontWeight="bolder" color="teal">
              {address}
            </Text>
            <Text fontSize="0.9rem">Seller: </Text>
            <Text fontWeight="bolder" color="teal">
              {seller}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => handleConfirm(pointer, price * amount)}
              colorScheme="teal"
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
