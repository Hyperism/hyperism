// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MintAnimalToken is ERC721Enumerable {
    constructor() ERC721("h622Animals", "HAS") {}

    mapping (uint256 => uint256) public animalTypes;

    function mintAnimalToken() public {
        // totalSupply() 는 현재까지 발행된 토큰 개수
        uint256 animalTokenId = totalSupply() + 1;

        // Solidity에서 랜덤 값을 뽑아내는 방법
        uint256 animalType = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, animalTokenId))) % 5 + 1;

        animalTypes[animalTokenId] = animalType;

        _mint(msg.sender, animalTokenId);
    }
}