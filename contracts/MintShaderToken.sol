// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintShaderToken is ERC1155, Ownable {
    constructor() public ERC1155("metaURI/") {}

    mapping (uint => uint) public tokenExist;
    // tokenId => 1:Exist, 0:notExist
    mapping (uint => string) private uris;
    // tokenId => token uri
    mapping (uint => address) public tokenAddress;
    // tokenId => token owner address

    function mintShaderToken(uint _tokenId) public {
        require (tokenExist[_tokenId] == 0, "Already Exist");
        // no token, mint possible

        _mint(msg.sender, _tokenId, 1, "");

        tokenExist[_tokenId] = 1;
        // update tokenExist = 1
        // Remove duplication

        tokenAddress[_tokenId] = msg.sender;
    }

    function ownerOf(uint _tokenId) public view returns (address) {
        return tokenAddress[_tokenId];
    }
    // return token owner address

    function uri(uint _tokenId) public override view returns (string memory) {
        return uris[_tokenId];
    }
    // get uri of token

    function exist(uint _tokenId) public view returns (uint) {
        return tokenExist[_tokenId];
    }
    // return token owner address
    // for test

    function setTokenUri(uint _tokenId, string memory uri) public {
        require (msg.sender == ownerOf(_tokenId), "Not Owner");
        require (bytes(uris[_tokenId]).length == 0, "Only set uri 1 time possible for each token");
        uris[_tokenId] = uri;
    }
    // set uri of token

    function modifyOwner(uint _tokenId) public {
        tokenAddress[_tokenId] = msg.sender;
    }

}