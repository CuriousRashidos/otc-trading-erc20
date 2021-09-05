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
import React, { useContext, useState } from "react";
import { ContractContext } from "../../hooks/useContract";

const SellOption = ({ address, balance, name, handleConfirm }) => {
  const [price, setPrice] = useState(1);
  const [amount, setAmount] = useState(1);
  const {
    otcContract: { createSale, approveOptions },
  } = useContext(ContractContext);
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
        <Button px="2rem" colorScheme="blue" onClick={onOpen}>
          Sell
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Text fontSize="1rem" fontWeight="bolder">
              Selling option:
            </Text>
            <Text fontWeight="bolder" color="blue.500" fontSize="1rem">
              Address: {address.substring(0, 5)}
              ...
              {address.substring(35, 40)}
            </Text>
            <Text fontSize="1rem">
              {`Amount (you have ${balance} tokens):`}
            </Text>
            <Text
              mb="0.4rem"
              color="tomato"
              fontWeight="bolder"
              fontSize="0.8rem"
            >
              NOTICE: set amount and then approve first
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
              onClick={async () => await approveOptions(address, amount)}
              colorScheme="green"
              mr={3}
              px="2rem"
              py="0.3rem"
            >
              Approve
            </Button>
            <Button
              onClick={async () => await createSale(address, price, amount)}
              colorScheme="blue"
              px="2rem"
              py="0.3rem"
              mr={3}
            >
              Sell
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SellOption;
