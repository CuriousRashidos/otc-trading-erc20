import { Center, Text } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import WindowLayout from "../windowLayout/WindowLayout";

import { useEffect } from "react";
import useEthers from "../../hooks/useEthers";
import SellOption from "./SellOption";

const SellWindow = () => {
  const { getAllUserOptions, OTCOptionsContract } = useEthers();
  const [options, setOptions] = useState([]);

  const [update, setUpdate] = useState(false);

  const handleConfirm = async (_address, _price, _amount) => {
    setUpdate((prev) => !prev);
    await OTCOptionsContract.createOTC(_address, _price, _amount);
  };
  const fetchOptions = useCallback(async () => {
    const newOptions = await getAllUserOptions();
    setOptions(newOptions);
  }, [getAllUserOptions]);
  useEffect(fetchOptions, [update]); // eslint-disable-line react-hooks/exhaustive-deps

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
          Sell Options
        </Text>
      </Center>
      {options.length === 0 ? (
        <Text m="1rem" align="center" mr="1rem">
          You do not own any options, mint yourself some and try selling them
        </Text>
      ) : (
        options.map(
          (option, index) =>
            option !== undefined && (
              <SellOption
                key={index}
                address={option.address}
                balance={option.balance}
                name={option.name}
                handleConfirm={handleConfirm}
              />
            )
        )
      )}
    </WindowLayout>
  );
};

export default SellWindow;
