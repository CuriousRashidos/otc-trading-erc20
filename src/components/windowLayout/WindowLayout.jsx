import { Box } from "@chakra-ui/react";
import React from "react";

const WindowLayout = ({ children }) => {
  return (
    <Box
      minHeight="20rem"
      w={{ base: "90vw", sm: "60vw", md: "50vw", lg: "35vw" }}
      borderRadius="2rem"
      boxShadow="lg"
      padding="1.3rem"
      bg="#FFFFFF"
      color="white"
      mt="2rem"
    >
      {children}
    </Box>
  );
};

export default WindowLayout;
