// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MintShaderToken is ERC721Enumerable {
    constructor() ERC721("hyperismShaders", "HYPER") {}
    //name, symbol

    function mintAnimalToken() public {
        uint256 shaderTokenId = totalSupply() + 1;

        _mint(msg.sender, shaderTokenId);
        
    }
}