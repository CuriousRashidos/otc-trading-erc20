import { Box } from "@chakra-ui/react";
import React from "react";

const WindowLayout = ({ children }) => {
  return (
    <Box
      h="auto"
      w={{ base: "90vw", sm: "80vw", md: "40vw", lg: "35vw" }}
      borderRadius="2rem"
      boxShadow="lg"
      padding="1.3rem"
      bg="gray.800"
      color="white"
      mt="2rem"
    >
      {children}
    </Box>
  );
};

export default WindowLayout;
