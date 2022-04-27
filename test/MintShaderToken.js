const { expect, Assertion } = require("chai");

describe("MintShaderToken Contract", function () {
  it("Start", async function () {

    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Token = await ethers.getContractFactory("MintShaderToken");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens once its transaction has been
    // mined.
    hardhatToken = await Token.deploy();
    });

    describe("Tests1", function() {
      // mintShaderToken(uint _tokenId)
      it("After minting, value tokenExist[_tokenId] changes", async function() {
        const a = await hardhatToken.connect(addr1).exist(1);
        await hardhatToken.connect(addr1).mintShaderToken(1);
        const b = await hardhatToken.connect(addr1).exist(1);

        expect(a).not.to.equal(b);
      })
      
      // ownerOf(uint _tokenId)
      it("After addr1 mint token1, ownerOf token1 is addr1", async function() {
        
        await hardhatToken.connect(addr1).mintShaderToken(1);
        const a = await hardhatToken.connect(addr1).ownerOf(1);
        expect(a).to.equal(addr1.address);
      })

      // setTokenUri(uint _tokenId, string memory uri)
      // uri(uint _tokenId)
      it("Only owner can set TokenUri", async function() {
        
        await hardhatToken.connect(addr1).mintShaderToken(1);
        const a = "example uri";
        await hardhatToken.connect(addr1).setTokenUri(1, "example uri");
        const b = await hardhatToken.connect(addr1).uri(1);
        expect(a).to.equal(b)
      })
    })
    
  });
});