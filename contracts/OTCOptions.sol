// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/*
    @title 
        ERC20 Options trading over the counter
    @author 
        CuriousRashidos
    @notice
        create a "counter" to trade ERC20 options to trade over, where seller defines the price
        and the amount they wish to sell.
*/


//@dev ERC20 option interface
import './IERC20Option.sol'; 

contract OTCOptions  {
    //@notice emits when a option trading counter is created
    event OTCOptionCreated(address optionAddress, uint id, uint price, uint amount);
    
    //@notice emits when a option is bought
    event OTCOptionBought(address indexed by, address optionAddress, uint id, uint amount );
    
    //@dev ERC20 Option Interface instance
    IERC20Option ERC20Option;
    
    //@dev data structure that option trading counter details
    struct OTCOption {
        bool active;
        address optionAddress;
        address seller;
        uint price;
        uint amount;
    }
    
    //@dev storing counters mapping a unique id to datastructure
    mapping (uint => OTCOption) public options;
    
    //@dev variable to help in iterating in the front end
    uint public numOfOptions;

    /*
    @notice create a option trading counter
    @param _address => address of ERC20 option
    @param _price => ask price for the erc20 option
    @param _amount => amount ERC20 tokens to put for trading
    */
    function create(address _address, uint _price, uint _amount) public {
        ERC20Option = IERC20Option(_address);
        
        //check if user has adequate options
        
        uint[5] memory intArgs = [uint256(uint160(_address)), uint256(uint160(msg.sender)), _price, _amount, numOfOptions];
        numOfOptions++;
        bool success = _createTrade(intArgs);
        require(success, 'could not create OTC');
        
        emit OTCOptionCreated(_address, numOfOptions - 1, _price, _amount);
        
    } 
    
     /*
    @notice buy a OTC option
    @param _pointer => id of the OTC
    @param _amount => amount of tokens to buy
    */
    
    function buy(uint _pointer) external payable {
        
        OTCOption memory option = options[_pointer];
        
        //checking if OTC is active or not
        require(option.active, "OTC not active");
        
        //checking if enough payment is sent
        require(option.price * option.amount == msg.value, "Payment not enough");
        
        
        uint[3] memory intArgs = [_pointer, option.amount, uint256(uint160(msg.sender))];
        
        bool success = _fullfillTrade(option, intArgs);
        require(success, 'Purchase fail');
        
        emit OTCOptionBought(msg.sender, option.optionAddress, _pointer, option.amount );
        
    }
    
    function _createTrade(uint[5] memory _intArgs) private returns (bool){
        //instance of erc20 token
        ERC20Option = IERC20Option(address(uint160(_intArgs[0])));
        
        require(ERC20Option.balanceOf(msg.sender) >= _intArgs[4], "Exceeds ERC20 options balance");
        
        //user must first approve from UI
        ERC20Option.transferFrom(msg.sender, address(this), _intArgs[3]);
        
        options[_intArgs[4]] = OTCOption(true, address(uint160(_intArgs[0])), address(uint160(_intArgs[1])), _intArgs[2], _intArgs[3]);
        
        return true;
    }
    
    function _fullfillTrade(OTCOption memory _option, uint[3] memory _intArgs) private returns (bool) {
         //instance of erc20 token
        ERC20Option = IERC20Option(_option.optionAddress);
       
        //pay the seller
        payable(_option.seller).transfer( _option.price * _intArgs[1]);
        
        //deduct amount 
        options[_intArgs[0]].amount -= _intArgs[1];
        
        //transfer tokens to buyer
        ERC20Option.transfer(address(uint160(_intArgs[2])),_intArgs[1]);
        uint currentBalance = ERC20Option.balanceOf(address(this));
       
        //deleting mapping entry to conserve space
        if (currentBalance == 0) delete options[_intArgs[0]];
        
        return true;
     
    }
}