import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  Button,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";

const SellOption = ({ address, balance, name, handleConfirm }) => {
  const [price, setPrice] = useState(1);
  const [amount, setAmount] = useState(1);
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
        <Text mr="1rem">{name}</Text>
        <Button px="2rem" colorScheme="teal" onClick={onOpen}>
          Sell
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Text fontSize="1rem">Selling option:</Text>
            <Text fontWeight="bolder" color="teal" fontSize="1rem">
              {address}
            </Text>
            <Text fontSize="1rem">
              {`Amount (you have ${balance} tokens):`}
            </Text>
            <NumberInput
              onChange={(valueString) => setAmount(parseInt(valueString))}
              defaultValue={amount.toString()}
              min={1}
              max={balance}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text fontSize="1rem">Price (in Wei)</Text>
            <NumberInput
              onChange={(valueString) => setPrice(parseInt(valueString))}
              defaultValue={price.toString()}
              min={1}
              max={3}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                handleConfirm(address, price, amount);
                onClose();
                setAmount(1);
                setPrice(1);
              }}
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

export default SellOption;
