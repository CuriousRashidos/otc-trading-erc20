// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20CallOption is ERC20{
    
    event Minted(address to, uint amount);
    constructor() ERC20("ETH-USDT C3500 SEP2021", "OPX") {
        
    }
    
    function faucet() external {
        _mint(msg.sender, 10);
        emit Minted(msg.sender, 10);
    }
    
     function decimals() public pure override returns (uint8) {
        return 0;
    }

}
