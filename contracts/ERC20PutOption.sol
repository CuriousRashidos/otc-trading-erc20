// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20PutOption is ERC20 {
    event Minted(address to, uint amount);

    //@notice 0 == call, 1 == put
    uint optionType = 1;
    //@notice 1 = ETH-USDT in front end
    uint asset = 1;
    uint strike = 2500;
    uint expiry = block.timestamp + 30 days;
    constructor() ERC20("ETH-USDT P2500 SEP2021", "OPX") {
        
    }

    //@notice mints user 10 tokens
     function faucet() external {
        _mint(msg.sender, 10);
        emit Minted(msg.sender, 10);
    }
    
     function decimals() public pure override returns (uint8) {
        return 0;
    }

    function getDetails() external view returns (uint, uint, uint, uint) {
        return (optionType, asset, strike, expiry);
        
    }
    
}
   