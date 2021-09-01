import { BigNumber, ethers } from "ethers";
import ERC20CallOption from "../artifacts/contracts/ERC20CallOption.sol/ERC20CallOption.json";
import ERC20PutOption from "../artifacts/contracts/ERC20PutOption.sol/ERC20PutOption.json";
import OTCOptions from "../artifacts/contracts/OTCOptions.sol/OTCOptions.json";
import { Box, Text, useToast } from "@chakra-ui/react";

const OTCOptionsAddr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ERC20CallOptionAddr = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const ERC20PutOptionAddr = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

//in real life scenario, we would expect to store (optionAddress => user) to fetch all addresses a user owns but here are hardcoding it for scope of assignment

const ERC20OptionAbi = [
  // Some details about the token
  "function name() view returns (string)",
  "function symbol() view returns (string)",

  // Get the account balance
  "function balanceOf(address) view returns (uint)",

  // Send some of your tokens to someone else
  "function transfer(address to, uint amount)",

  // An event triggered whenever anyone transfers to someone else
  "event Transfer(address indexed from, address indexed to, uint amount)",

  //approve spender to spend
  "function approve(address spender, uint256 amount) external returns (bool)",
];

const useEthers = () => {
  const toast = useToast();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const OTCOptionsContract = {
    readContract: new ethers.Contract(OTCOptionsAddr, OTCOptions.abi, provider),
    useContract: new ethers.Contract(OTCOptionsAddr, OTCOptions.abi, signer),
    getOptions: async () => {
      const num = await OTCOptionsContract.readContract.numOfOptions();
      let optionsArray = [];
      if (num !== 0) {
        for (var i = 0; i < num; i++) {
          const option = await OTCOptionsContract.readContract.options(i);
          if (option.active !== false && parseInt(option.amount) !== 0) {
            const erc20Option = new ethers.Contract(
              option.optionAddress,
              ERC20OptionAbi,
              provider
            );
            const optionName = await erc20Option.name();

            optionsArray = [
              ...optionsArray,
              {
                key: i,
                active: option.active,
                name: optionName,
                seller: option.seller,
                amount: parseInt(option.amount),
                address: option.optionAddress,
                price: parseInt(option.price),
              },
            ];
          }
        }
        return optionsArray;
      }
    },
    createOTC: async (address, price, amount) => {
      const erc20Option = new ethers.Contract(address, ERC20OptionAbi, signer);
      await erc20Option.approve(OTCOptionsAddr, amount);

      try {
        const tx = await OTCOptionsContract.useContract.create(
          address,
          price,
          amount
        );
        const reciept = await provider.getTransactionReceipt(tx.hash);
        if (reciept) {
          OTCOptionsContract.readContract.once(
            "OTCOptionCreated",
            (address, _, price, amount) => {
              toast({
                position: "bottom",
                duration: 4000,

                render: () => (
                  <Box color="white" p={3} bg="teal">
                    <Text>{`Success: OTC created ${address} ${price} wei ${amount}`}</Text>
                  </Box>
                ),
              });
            }
          );
        }
      } catch (err) {
        toast({
          position: "bottom",
          duration: 4000,
          render: () => (
            <Box color="white" p={3} bg="teal">
              <Text>{`Tx Fail: ${err.data.message}`}</Text>
            </Box>
          ),
        });
      }
    },
    //error.data.message
    buyOption: async (pointer, total) => {
      const overrides = {
        value: BigNumber.from(total.toString()),
      };
      try {
        const tx = await OTCOptionsContract.useContract.buy(pointer, overrides);
        const reciept = await provider.getTransactionReceipt(tx.hash);
        if (reciept) {
          OTCOptionsContract.readContract.once(
            "OTCOptionBought",
            (buyer, address, pointer, amount) => {
              toast({
                position: "bottom",
                duration: 4000,
                render: () => (
                  <Box color="white" p={3} bg="teal">
                    <Text>{`Success: OTC bought ${address} x ${amount}`}</Text>
                  </Box>
                ),
              });
            }
          );
        }
      } catch (err) {
        toast({
          position: "bottom",
          duration: 4000,
          render: () => (
            <Box color="white" p={3} bg="teal">
              <Text>{`Tx Fail: ${err.data.message}`}</Text>
            </Box>
          ),
        });
      }
    },
  };
  const ERC20CallContract = {
    readContract: new ethers.Contract(
      ERC20CallOptionAddr,
      ERC20CallOption.abi,
      provider
    ),
    useContract: new ethers.Contract(
      ERC20CallOptionAddr,
      ERC20CallOption.abi,
      signer
    ),
    mintUser: async () => {
      try {
        const tx = await ERC20CallContract.useContract.faucet();
        console.log(tx);
        const reciept = await provider.getTransactionReceipt(tx.hash);
        if (reciept) {
          ERC20CallContract.readContract.once("Minted", (address, amount) => {
            toast({
              position: "bottom",
              duration: 4000,
              render: () => (
                <Box color="white" p={3} bg="teal">
                  <Text>{`Minted: ${address} Amount: ${amount}`}</Text>
                </Box>
              ),
            });
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    getUserOptions: async () => {
      const userAddress = await signer.getAddress();
      const balance = await ERC20CallContract.readContract.balanceOf(
        userAddress
      );
      const name = await ERC20CallContract.readContract.name();
      if (parseInt(balance) > 0) {
        return { name, balance, address: ERC20CallOptionAddr };
      } else return;
    },
  };

  const ERC20PutContract = {
    readContract: new ethers.Contract(
      ERC20PutOptionAddr,
      ERC20PutOption.abi,
      provider
    ),
    useContract: new ethers.Contract(
      ERC20PutOptionAddr,
      ERC20PutOption.abi,
      signer
    ),
    mintUser: async () => {
      try {
        const tx = await ERC20PutContract.useContract.faucet();
        const reciept = await provider.getTransactionReceipt(tx.hash);
        if (reciept) {
          ERC20PutContract.readContract.once("Minted", (address, amount) => {
            toast({
              position: "bottom",
              duration: 4000,
              render: () => (
                <Box color="white" p={3} bg="teal">
                  <Text>{`Minted: ${address} Amount: ${amount}`}</Text>
                </Box>
              ),
            });
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    getUserOptions: async () => {
      const userAddress = await signer.getAddress();
      const balance = await ERC20PutContract.readContract.balanceOf(
        userAddress
      );
      const name = await ERC20PutContract.readContract.name();
      if (parseInt(balance) > 0) {
        return { name, balance, address: ERC20PutOptionAddr };
      } else return;
    },
  };

  const getAllUserOptions = async () => {
    const putOptions = await ERC20PutContract.getUserOptions();
    const callOptions = await ERC20CallContract.getUserOptions();
    const filtered = [putOptions, callOptions].filter(
      (option) => option !== undefined
    );
    return filtered;
  };

  const getBuyOptions = async () => {
    const options = await OTCOptionsContract.getOptions();
    return options;
  };

  return {
    OTCOptionsContract,
    ERC20CallContract,
    ERC20PutContract,
    getAllUserOptions,
    getBuyOptions,
  };
};

export default useEthers;
