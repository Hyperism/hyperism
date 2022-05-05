// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./MintShaderToken.sol";

contract TradeShaderToken {
    MintShaderToken public mstAddress;

    constructor(address _mstAddress) public {
        mstAddress = MintShaderToken(_mstAddress);
    }
    // get address of mint shader token we deployed

    mapping (uint => uint) tokenPrice;
    // tokenID => token price

    function saleToken(uint _tokenId, uint _price) public {
        require (isOwner(_tokenId) == true, "Not owner of Token");
        // owner check

        require (tokenPrice[_tokenId] == 0, "Already on Sale");
        // sale status check
        // not on sale -> price == 0

        require (_price > 0, "Price should be over 0");
        // price > 0

        require (mstAddress.isApprovedForAll(mstAddress.ownerOf(_tokenId), address(this)), "Not approved!");
        // check whether contract is approved or not
        // use setApprovalForall(address(this), true)

        tokenPrice[_tokenId] = _price;
        // set price
    }

    function purchaseToken(uint _tokenId) public payable {

        require (isOwner(_tokenId) == false, "You already own it");
        require (msg.value == tokenPrice[_tokenId], "Not enough money or Over payed");


        payable(mstAddress.ownerOf(_tokenId)).transfer(msg.value);
        // send money

        mstAddress.safeTransferFrom(mstAddress.ownerOf(_tokenId), msg.sender, _tokenId, 1, "");
        // change token ownership

        tokenPrice[_tokenId] = 0;
        // set 0
        // not on sale
    }


    function isOwner(uint256 tokenId) public view returns (bool) {
        return mstAddress.balanceOf(msg.sender, tokenId) != 0;
    }
    // owner -> true,
    // else -> false
}