// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;


contract Test {

    mapping (uint => string) public store;

    constructor () {
        store[1] = "first message";
        store[2] = "second message";
        store[3] = "third message";
    }

    function readStore(uint _number) public view returns (string memory) {
        return store[_number];
    }
}