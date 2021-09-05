import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import WindowLayout from "../windowLayout/WindowLayout";
import { Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react";
import { ContractContext } from "../../hooks/useContract";

const MintWindow = () => {
  const {
    optionsContract: { mint },
  } = useContext(ContractContext);
  return (
    <WindowLayout>
      <Flex direction="column" alignItems="center" justifyContent="center">
        <Text
          bg="#292F33"
          borderRadius="md"
          px="3rem"
          py="0.5rem"
          fontWeight="bolder"
          fontSize={{
            base: "1.3rem",
            sm: "1.3rem",
            md: "1.3rem",
            lg: "1.6rem",
            xl: "1.8rem",
          }}
        >
          BUY OPTIONS
        </Text>
        <Flex
          alignItems="center"
          justifyContent="center"
          mt="1.5rem"
          w={{ base: "80vw", sm: "55vw", md: "38vw", lg: "30vw", xl: "25vw" }}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg="#292F33"
            boxShadow="lg"
            height="13rem"
            w="11rem"
            borderRadius="1.2rem"
            border="1px"
          >
            <Stat textAlign="center">
              <StatLabel>
                <Text fontSize="1.3rem">ETH-USDT</Text>
              </StatLabel>
              <StatNumber>
                <Text fontSize="1.2rem">$2500 PUT</Text>
              </StatNumber>
              <StatHelpText>
                <Text fontSize="0.9rem">Expires: SEP 2021</Text>
              </StatHelpText>
              <Button
                colorScheme="blue"
                onClick={async () => await mint(process.env.REACT_APP_PUT)}
                mt="1.3rem"
              >
                Mint
              </Button>
            </Stat>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg="#292F33"
            boxShadow="lg"
            height="13rem"
            w="11rem"
            borderRadius="1.2rem"
            border="1px"
          >
            <Stat textAlign="center">
              <StatLabel>
                <Text fontSize="1.3rem">ETH-USDT</Text>
              </StatLabel>
              <StatNumber>
                <Text fontSize="1.2rem">$3500 CALL</Text>
              </StatNumber>
              <StatHelpText>
                <Text fontSize="0.9rem">Expires: SEP 2021</Text>
              </StatHelpText>
              <Button
                onClick={async () => await mint(process.env.REACT_APP_CALL)}
                mt="1.3rem"
                colorScheme="blue"
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
