import {
  Flex,
  Text,
  StatHelpText,
  StatLabel,
  Box,
  Stat,
  StatNumber,
  Spinner,
  Center,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import WindowLayout from "../windowLayout/WindowLayout";
import BuyOption from "./BuyOption";
import { ContractContext } from "../../hooks/useContract";

const BuyWindow = () => {
  const { saleOptions, optionNames } = useContext(ContractContext);
  console.log(saleOptions);
  saleOptions.forEach((option, index) => console.log(optionNames[1]));
  console.log(optionNames);

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
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          mt="1.5rem"
          w={{ base: "80vw", sm: "55vw", md: "38vw", lg: "30vw", xl: "25vw" }}
        >
          {saleOptions.length === 0 ? (
            <Center>
              <Spinner
                thickness="10px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
              <Text ml="0.5rem" color="black" fontSize="0.8rem">
                If it takes too long, there are probably no options selling
              </Text>
            </Center>
          ) : (
            saleOptions.map(
              (option, index) =>
                option.active === true && (
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
                    <Stat textAlign="center">
                      <StatLabel>
                        {optionNames.length === 0 ? (
                          <Spinner
                            thickness="2px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="sm"
                          />
                        ) : (
                          <Text fontSize="1rem" mt="0.9rem">
                            {optionNames[index]}
                          </Text>
                        )}
                      </StatLabel>
                      <StatNumber>
                        <Text mt="0.3rem" fontSize="0.9rem">
                          Price: {parseInt(option.price)} (WEI)
                        </Text>
                      </StatNumber>
                      <StatHelpText>
                        <Text p="0.5rem" fontSize="1rem">
                          Amount: {parseInt(option.amount)}
                        </Text>

                        <Text mt="0.3rem" fontSize="0.9rem"></Text>
                      </StatHelpText>
                      <BuyOption
                        name={optionNames[index]}
                        price={parseInt(option.price)}
                        amount={parseInt(option.amount)}
                        seller={option.seller}
                        address={option.optionAddress}
                        pointer={parseInt(option.pointer)}
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

export default BuyWindow;
