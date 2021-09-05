import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import React, { useContext } from "react";

import { NavCtx } from "../../Contexts/NavContext";

const Navbar = () => {
  const { page, setPage } = useContext(NavCtx);
  return (
    <Box
      align="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
      h={{ base: "6vh", sm: "8vh", md: "9vh", lg: "7vh" }}
      w={{ base: "80vw", sm: "60vw", md: "50vw", lg: "35vw" }}
      boxShadow="lg"
      border="1px"
      borderColor="black"
      mt="2rem"
      borderRadius="3rem"
      py="0.3em"
      bg="#FFFFFF"
    >
      <Flex justifyContent="center" alignItems="center" px="5rem" color="white">
        <Box>
          <Text
            cursor="pointer"
            onClick={() => setPage("buy")}
            fontSize="1.5rem"
            fontWeight="bolder"
            color={page === "buy" ? "#55ACEE" : " #292F33"}
            textDecoration={page === "selbuyl" ? "underline" : "none"}
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
            color={page === "sell" ? "#55ACEE" : " #292F33"}
            textDecoration={page === "sell" ? "underline" : "none"}
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
            color={page === "mint" ? "#55ACEE" : " #292F33"}
            textDecoration={page === "mint" ? "underline" : "none"}
          >
            MINT
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
