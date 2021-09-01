import { Box, Center, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import WindowLayout from "../windowLayout/WindowLayout";
import useEthers from "../../hooks/useEthers";
import BuyOption from "./BuyOption";

const BuyWindow = () => {
  const { OTCOptionsContract } = useEthers();
  const [options, setOptions] = useState([]);
  const [update, setUpdate] = useState(false);
  const handleConfirm = async (pointer, total) => {
    setUpdate((prev) => !prev);
    await OTCOptionsContract.buyOption(pointer, total);
  };

  useEffect(() => {
    const fetchOptions = async () => {
      const newOptions = await OTCOptionsContract.getOptions();
      setOptions(newOptions);
    };
    fetchOptions();
  }, [update]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WindowLayout>
      <Center>
        <Text
          w="18rem"
          align="center"
          bg="teal"
          borderRadius="md"
          px="3rem"
          py="0.5rem"
          fontWeight="bolder"
          mb="1.3rem"
        >
          BUY OPTIONS
        </Text>
      </Center>
      {options.length === 0 ? (
        <Box
          display="flex"
          p="1rem"
          w="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Text align="center" mr="1rem">
            No options to buy, try minting yourself some options and sell it and
            then come back here to buy it
          </Text>
        </Box>
      ) : (
        options.map(
          (option, index) =>
            option.amount !== 0 && (
              <BuyOption
                key={index}
                pointer={option.key}
                address={option.address}
                name={option.name}
                amount={option.amount}
                price={option.price}
                seller={option.seller}
                handleConfirm={handleConfirm}
              />
            )
        )
      )}
    </WindowLayout>
  );
};

export default BuyWindow;
