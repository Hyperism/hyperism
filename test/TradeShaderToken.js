const { expect, Assertion } = require("chai");
const { ethers } = require("hardhat");

describe("TradeShaderToken Contract", function () {
  it("Start", async function () {

    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Token1 = await ethers.getContractFactory("MintShaderToken");
    Token2 = await ethers.getContractFactory("TradeShaderToken");
    
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens once its transaction has been
    // mined.
    hardhatToken1 = await Token1.deploy();
    hardhatToken2 = await Token2.deploy(hardhatToken1.address)
    });

    describe("Tests2", function() {
      // saleToken(uint _tokenId, uint _price)
      // purchaseToken(uint _tokenId)
      it("Sale and purchase", async function() {
        await hardhatToken1.connect(addr1).mintShaderToken(1);
        await hardhatToken1.connect(addr1).setApprovalForAll(hardhatToken2.address, true);
        await hardhatToken2.connect(addr1).saleToken(1, 5000000000000000);
        // token 1 on sale

        const moneyBefore = (await addr1.getBalance());
        await hardhatToken2.connect(addr2).purchaseToken(1, {value: 5000000000000000});
        const moneyAfter = (await addr1.getBalance());
        // moneyAfter = moneyBefore + value

        expect(moneyAfter).not.to.equal(moneyBefore);
      })

      //isOwner(uint256 tokenId)
      it("Check owner", async function() {
        await hardhatToken1.connect(addr1).mintShaderToken(1);
        await hardhatToken1.connect(addr1).setApprovalForAll(hardhatToken2.address, true);
        await hardhatToken2.connect(addr1).saleToken(1, 5000000000000000);
        // token1 on sale

        const a = await hardhatToken2.connect(addr1).isOwner(1);
        // addr1 is owner => true

        await hardhatToken2.connect(addr2).purchaseToken(1, {value: 5000000000000000});
        // addr2 buy token 1

        const b = await hardhatToken2.connect(addr2).isOwner(1);
        // addr2 is owner => true
        
        expect(a).to.equal(b);
      })
    })
    
    
  });
});