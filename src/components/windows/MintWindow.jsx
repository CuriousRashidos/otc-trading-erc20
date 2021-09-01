import { Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import WindowLayout from "../windowLayout/WindowLayout";
import { Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react";
import useEthers from "../../hooks/useEthers";

const MintWindow = () => {
  const { ERC20CallContract, ERC20PutContract } = useEthers();

  return (
    <WindowLayout>
      <Flex direction="column" alignItems="center" justify="center">
        <Text
          bg="teal.600"
          borderRadius="md"
          px="3rem"
          py="0.5rem"
          fontWeight="bolder"
          mb="1.3rem"
        >
          MINT OPTIONS
        </Text>
        <Flex
          mt="1.5rem"
          w={{ base: "90%", sm: "80%", md: "70%", lg: "60%", xl: "60%" }}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg="gray.900"
            boxShadow="lg"
            height="13rem"
            w="11rem"
            borderRadius="1.2rem"
            border="1px"
            borderColor="teal.900"
            mr={{
              base: "1rem",
              sm: "0.5rem",
              md: "0.5rem",
            }}
          >
            <Stat textAlign="center">
              <StatLabel>
                <Text fontSize="0.8rem">ETH-USDT</Text>
              </StatLabel>
              <StatNumber>
                <Text fontSize="1.2rem">$2500 PUT</Text>
              </StatNumber>
              <StatHelpText>
                <Text fontSize="0.7rem">Expires: DEC, SEP 2021</Text>
              </StatHelpText>
              <Button
                onClick={async () => await ERC20PutContract.mintUser()}
                mt="1.3rem"
                colorScheme="teal"
              >
                Mint
              </Button>
            </Stat>
          </Box>
          <Spacer />
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg="gray.900"
            boxShadow="lg"
            height="13rem"
            w="11rem"
            borderRadius="1.2rem"
            border="1px"
            borderColor="teal.900"
          >
            <Stat textAlign="center">
              <StatLabel>
                <Text fontSize="0.8rem">ETH-USDT</Text>
              </StatLabel>
              <StatNumber>
                <Text fontSize="1.2rem">$3500 CALL</Text>
              </StatNumber>
              <StatHelpText>
                <Text fontSize="0.7rem">Expires: DEC, SEP 2021</Text>
              </StatHelpText>
              <Button
                onClick={async () => await ERC20CallContract.mintUser()}
                mt="1.3rem"
                colorScheme="teal"
              >
                Mint
              </Button>
            </Stat>
          </Box>
        </Flex>
      </Flex>
    </WindowLayout>
  );
};

export default MintWindow;
