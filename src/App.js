import "./App.css";
import { Center, ChakraProvider, Text } from "@chakra-ui/react";
import Navbar from "./components/navbar/Navbar";
import { NavContext } from "./Contexts/NavContext";
import MainApp from "./components/MainApp";
import { useEffect, useState } from "react";
import WindowLayout from "./components/windowLayout/WindowLayout";
import { ContractProvider } from "./hooks/useContract";

function App() {
  const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    const requestAccount = async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      accounts.length !== 0 && setLoggedin(true);
    };
    requestAccount();
  }, []);

  return (
    <div className="App">
      <ChakraProvider>
        <ContractProvider>
          <NavContext>
            <Center display="flex" flexDirection="column">
              {loggedin ? (
                <>
                  <Navbar />
                  <MainApp />
                </>
              ) : (
                <WindowLayout>
                  <Center>
                    <Text
                      fontWeight="bolder"
                      fontSize="1.5rem"
                      color="blue.500"
                    >
                      Please connect metamask
                    </Text>
                  </Center>
                </WindowLayout>
              )}
            </Center>{" "}
          </NavContext>
          {/* <Test /> */}
        </ContractProvider>
      </ChakraProvider>
    </div>
  );
}

export default App;
