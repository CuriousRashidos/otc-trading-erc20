import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import React, { useContext } from "react";

import { NavCtx } from "../../../Contexts/NavContext";

const Navbar = () => {
  const { page, setPage } = useContext(NavCtx);
  return (
    <Box
      align="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
      h={{ base: "10vh", sm: "8vh", md: "6vh", lg: "6vh" }}
      w={{ base: "80vw", sm: "60vw", md: "50vw", lg: "33vw" }}
      boxShadow="lg"
      border="1px"
      borderColor="black"
      mt="2rem"
      borderRadius="3rem"
      py="0.3em"
      bg="gray.800"
    >
      <Flex justifyContent="center" alignItems="center" px="5rem" color="white">
        <Box>
          <Text
            cursor="pointer"
            onClick={() => setPage("buy")}
            fontSize="1.5rem"
            fontWeight="bolder"
            color={page === "buy" ? "white" : "teal"}
            px={{ base: "1rem", sm: "1.5rem", md: "2rem", lg: "3rem" }}
          >
            BUY
          </Text>
        </Box>
        <Spacer />
        <Box>
          <Text
            cursor="pointer"
            onClick={() => setPage("sell")}
            py="0.1rem"
            px={{ base: "1rem", sm: "1.5rem", md: "2rem", lg: "3rem" }}
            fontSize="1.5rem"
            fontWeight="bolder"
            color={page === "sell" ? "white" : "teal"}
          >
            SELL
          </Text>
        </Box>
        <Spacer />
        <Box>
          <Text
            cursor="pointer"
            onClick={() => setPage("mint")}
            py="0.1rem"
            px={{ base: "1rem", sm: "1.5rem", md: "2rem", lg: "3rem" }}
            fontSize="1.5rem"
            fontWeight="bolder"
            color={page === "mint" ? "white" : "teal"}
          >
            MINT
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
