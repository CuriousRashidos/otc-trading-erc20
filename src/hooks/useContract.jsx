import { createContext, useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { InfuraProvider } from "@ethersproject/providers";
import { Contract, Provider } from "ethcall";
import { abi as OTCabi } from "../artifacts/contracts/OTCOptions.sol/OTCOptions.json";
import { abi as optionAbi } from "../artifacts/contracts/IERC20Option.sol/IERC20Option.json";
import { Box, Text, useToast } from "@chakra-ui/react";

export const ContractContext = createContext(null);
export const ContractProvider = ({ children }) => {
  //@notice toast notifcation for showing updates to user
  const toast = useToast();

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  //@notice stores options that user owns
  const [userOptions, setUserOptions] = useState([]);
  //@notice stores options that are being sold
  const [saleOptions, setSaleOptions] = useState([]);
  //@notice option names sharing the same index as sale options
  const [optionNames, setOptionNames] = useState([]);
  //main contract address
  const OTCOptionsAddr = "0x4b57f8438562F1DA90522A554474fDe8109b462a";
  //   process.env.REACT_APP_OTC_ADDR.toString();

  // array[call, put]
  const optionsAddresses = [
    "0x696114B74B57711f87A97749b47CF9f5f7b74b4B",
    "0x50cc9e07363904F6B5da0bf05ee0684680568b23",
  ];
  const signer = provider.getSigner();

  /**
   * @param {string} transactionHash
   * @returns true if mined
   */
  const isTransactionMined = async (transactionHash) => {
    const txReceipt = await provider.getTransactionReceipt(transactionHash);
    if (txReceipt && txReceipt.blockNumber) {
      return true;
    }
  };

  const otcContract = {
    readContract: new ethers.Contract(OTCOptionsAddr, OTCabi, provider),
    useContract: new ethers.Contract(OTCOptionsAddr, OTCabi, signer),

    /*
        @notice creates OTC option
        @param address - address of the option to be put up for sale
        @param price - price defined by the user 
        @param amount - amount of options the user wishes to sell
        */

    createSale: async (address, price, amount) => {
      try {
        //contract instance for the option
        const erc20Option = new ethers.Contract(address, optionAbi, signer);

        //user address
        const signerAddr = await signer.getAddress();
        const allowance = await erc20Option.allowance(
          signerAddr,
          OTCOptionsAddr
        );
        if (parseInt(allowance) === amount) {
          const tx = await otcContract.useContract.create(
            address,
            price,
            amount
          );
          await tx.wait();
          //@notice check if tx mined
          const update = await isTransactionMined(tx.hash);
          if (update) {
            //@notice update options once tx is mined
            otcContract.getSellingOptions();

            toast({
              position: "bottom-left",
              duration: 4000,

              render: () => (
                <Box color="white" p={3} bg="blue.500">
                  <Text>{`Success: OTC created ${address} ${price} wei ${amount}`}</Text>
                </Box>
              ),
            });
            console.log("updated selling options");
          }
        } else {
          console.log(
            "amount is not equal to allowance",
            amount,
            parseInt(allowance)
          );
          toast({
            position: "bottom-left",
            duration: 4000,

            render: () => (
              <Box color="white" p={3} bg="blue.500">
                <Text>{`Fail: Please set allowance (${amount})`}</Text>
              </Box>
            ),
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    /*
        @notic approves erc20 options to put up for sale
        @param amount of erc20 options user wants to approve to sell
        */
    approveOptions: async (address, amount) => {
      //contract instance for the option
      const erc20Option = optionsContract.useContract(address);

      try {
        const tx = await erc20Option.approve(OTCOptionsAddr, amount);
        await tx.wait();
        //@notice check if tx mined
        const update = await isTransactionMined(tx.hash);
        if (update) {
          //@notice update options once tx is mined
          console.log("Approve success");
          toast({
            position: "bottom-left",
            duration: 4000,

            render: () => (
              <Box color="white" p={3} bg="blue.500">
                <Text>{`Success: Approved ${amount} for ${address}`}</Text>
              </Box>
            ),
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    //@notice fetching options are that being sold
    getSellingOptions: async () => {
      //@notice multicall configuration
      const infuraKey = process.env.REACT_APP_INFURA_KEY.toString();
      const _provider = new InfuraProvider("rinkeby", infuraKey);
      const ethcallProvider = new Provider();
      await ethcallProvider.init(_provider);

      const _otcContract = new Contract(OTCOptionsAddr, OTCabi);

      //@notice num of options, and generating same num of calls for multicall
      const numOfOptions = await otcContract.readContract.numOfOptions();

      //@notice calls for multicall to get selling options
      const otcCalls = Array.apply(null, { length: numOfOptions }).map(
        (_, index) => _otcContract.options(index)
      );
      const optionsData = await ethcallProvider.all(otcCalls);

      const filtered = optionsData.filter((option) => option.active !== false);

      //@notice calls for multicall to get option names
      const nameCalls = filtered.map(({ optionAddress }) => {
        const optionContract = new Contract(optionAddress, optionAbi);
        return optionContract.name();
      });
      const names = await ethcallProvider.all(nameCalls);

      //@notice setting state
      setOptionNames(names);
      setSaleOptions(filtered);
    },
    buyOption: async (_pointer) => {
      const currentOption = saleOptions.filter(
        ({ pointer }) => parseInt(pointer) === _pointer
      );
      //destructuring from array then from object
      const [{ price, amount, address }] = currentOption;
      const total = parseInt(amount) * parseInt(price);
      console.log(
        "amount: ",
        parseInt(amount),
        " price:",
        parseInt(price),
        "total : ",
        parseInt(price) * parseInt(amount)
      );
      const overrides = {
        value: BigNumber.from(total),
      };
      console.log(parseInt(overrides.value));

      try {
        const tx = await otcContract.useContract.buy(_pointer, overrides);
        await tx.wait();
        const update = await isTransactionMined(tx.hash);
        if (update) {
          //@notice update options once tx is mined
          otcContract.getSellingOptions();
          optionsContract.getOptions();
          toast({
            position: "bottom-left",
            duration: 4000,

            render: () => (
              <Box color="white" p={3} bg="blue.500">
                <Text>{`Success: Option bought ${address} for ${
                  price * amount
                }`}</Text>
              </Box>
            ),
          });
          console.log("option purchased and updated selling options");
        }
      } catch (err) {
        console.log(err);
      }
    },
  };

  //@notice methods for interacting with ERC20 Options contract given the address as parameter
  const optionsContract = {
    readContract: (address) =>
      new ethers.Contract(address, optionAbi, provider),
    useContract: (address) => new ethers.Contract(address, optionAbi, signer),

    /*
    @notice mints the user 10 option tokens given the address
    @param address of the option to be minted from
    */
    mint: async (address) => {
      try {
        const contract = optionsContract.useContract(address);
        const tx = await contract.faucet();
        await tx.wait();

        //@notice check if tx mined
        const update = await isTransactionMined(tx.hash);
        if (update) {
          //@notice update options once tx is mined
          optionsContract.getOptions();
          console.log("updated tokens");
          toast({
            position: "bottom-left",
            duration: 4000,

            render: () => (
              <Box color="white" p={3} bg="blue.500">
                <Text>{`Success: 10 Options minted ${address}
                }`}</Text>
              </Box>
            ),
          });
        }

        //@noticeupdate user options state
      } catch (err) {
        console.log(err);
      }
    },

    /*
    @notice fetches options details such has name and balance
    @returns options details
    */
    getOptions: async () => {
      //@notice multicall configuration
      const infuraKey = process.env.REACT_APP_INFURA_KEY.toString();
      const _provider = new InfuraProvider("rinkeby", infuraKey);
      const userAddress = await signer.getAddress();
      const ethcallProvider = new Provider();
      await ethcallProvider.init(_provider);

      //@notice functions to provide to multicall to get options
      let options = [];

      optionsAddresses.forEach((address) => {
        const contract = new Contract(address, optionAbi);
        options = [...options, contract.getDetails()];
      });

      //@notice multicall to get options details
      const optionsData = await ethcallProvider.all(options);

      //@notice functions to provide to multicall to get balances
      let balances = [];

      optionsAddresses.forEach((address) => {
        const contract = new Contract(address, optionAbi);
        balances = [...balances, contract.balanceOf(userAddress)];
      });

      //@notice multicall to get balances
      const balancesData = await ethcallProvider.all(balances);

      //@notice filter new state recieved from multicall
      const newState = optionsData.map(
        (_, index) =>
          parseInt(balancesData[index]) > 0 && {
            address: optionsAddresses[index],

            balance: parseInt(balancesData[index]),
            details: optionsData[index],
          }
      );
      newState !== userOptions
        ? setUserOptions(newState)
        : newState.length === 0 && setUserOptions([]);

      //@notice compare states to not replicate status
    },
    getName: async (address) => {
      const contract = optionsContract.readContract(address);
      const name = await contract.name();
      return name;
    },
  };

  useEffect(() => {
    const loadOptions = async () => {
      await optionsContract.getOptions();
      await otcContract.getSellingOptions();
    };
    loadOptions();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <ContractContext.Provider
      value={{
        otcContract,
        optionsContract,
        userOptions,
        saleOptions,
        optionNames,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
