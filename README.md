# OTC ERC20 Options trading (Work in progress)

A simple P2P ERC20 options trading Dapp where users can mint themselves ERC20 options and then sell it such that others can buy it.

Notice: The app does not support any other ERC20 options apart from its own hardcoded ones for **now**.

** Deployed version ** 
Testnet : Rinkeby
URL: https://xenodochial-dubinsky-b910ec.netlify.app/
** Load project in local in environment**
1.Install dependancies
```
yarn 

or

npm install
```

2.Start hardhat node - (ensure you have hardhat installed)

```
npx hardhat node

```

4.Deploy contract

```
npx hardhat run scripts/script.js --network localhost

```


5.hardcode addresses from console to hook at src/hooks/useEther - starting from line:7 to line:9

```
$ npx hardhat run scripts/script.js --network localhost
OTC Options trading deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
ERC20 Call Option deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
ERC20 Put Option deployed to: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0 

src/hooks/useEthers.jsx Line: 7 to Line: 9

var OTCOptionsAddr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
var ERC20CallOptionAddr = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
var ERC20PutOptionAddr = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

```
