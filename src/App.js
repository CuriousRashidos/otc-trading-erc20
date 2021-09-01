import "./App.css";
import { Center, ChakraProvider, Text } from "@chakra-ui/react";
import Navbar from "./components/Metamask/navbar/Navbar";
import { NavContext } from "./Contexts/NavContext";
import MainApp from "./components/MainApp";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import WindowLayout from "./components/windowLayout/WindowLayout";

function App() {
  const [loggedin, setLoggedin] = useState(false);
  useEffect(() => {
    const checkMetamask = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const [account] = await provider.listAccounts();
      if (account === undefined) {
        let [user] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        user && setLoggedin(true);
      } else {
        setLoggedin(true);
      }
    };
    checkMetamask();
  }, []);

  return (
    <div className="App">
      <ChakraProvider>
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
                  <Text>Please connect metamask</Text>
                </Center>
              </WindowLayout>
            )}
          </Center>
        </NavContext>
      </ChakraProvider>
    </div>
  );
}

export default App;
