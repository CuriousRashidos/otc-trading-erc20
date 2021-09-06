import {
  Flex,
  Text,
  StatHelpText,
  StatLabel,
  Box,
  Stat,
  Center,
  StatNumber,
  Spinner,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import WindowLayout from "../windowLayout/WindowLayout";

import SellOption from "./SellOption";
import { ContractContext } from "../../hooks/useContract";

const SellWindow = () => {
  const { userOptions } = useContext(ContractContext);

  const parseUnixToDate = (unix) => {
    const intUnix = parseInt(unix) * 1000;
    const date = new Date(intUnix);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getUTCFullYear();
    return `${month.substring(0, 3).toUpperCase()}${year}`;
  };

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
          SELL OPTIONS
        </Text>
        <Flex
          alignItems="center"
          justifyContent="center"
          mt="1.5rem"
          w={{ base: "80vw", sm: "55vw", md: "38vw", lg: "30vw", xl: "25vw" }}
        >
          {userOptions.length === 0 ? (
            <Center>
              <Spinner
                thickness="10px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Center>
          ) : (
            userOptions.map(
              (option, index) =>
                parseInt(option.balance) !== 0 && (
                  <Box
                    key={index}
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
                    {/* return (optionType, asset, strike, expiry); */}
                    <Stat textAlign="center">
                      <StatLabel>
                        <Text fontSize="1.1rem" mt="0.9rem">
                          ETH-USDT
                        </Text>
                      </StatLabel>
                      <StatNumber>
                        <Text fontSize="1rem">
                          ${parseInt(option.details[2])}
                        </Text>
                      </StatNumber>
                      <StatHelpText>
                        <Text p="0.5rem" fontSize="0.85rem">
                          Expires: {parseUnixToDate(option.details[3])}
                        </Text>
                        <Text mt="0.3rem" fontSize="0.9rem">
                          You have: {option.balance}
                        </Text>
                      </StatHelpText>
                      {/* <Button mb="0.3rem" colorScheme="blue" mt="0.2rem">
                  Sell
                </Button> */}
                      <SellOption
                        address={option.address}
                        balance={option.balance}
                        name={`${
                          parseInt(option.details[0]) === 1 ? "P" : "C"
                        }${option.details[2]} ${parseUnixToDate(
                          option.details[3]
                        )}`}
                      />
                    </Stat>
                  </Box>
                )
            )
          )}
        </Flex>
      </Flex>
    </WindowLayout>
  );
};

export default SellWindow;
