const { ethers } = require("hardhat");


/**
 * @brief meta id로 MintShaderToken contract address를 반환받음
 * @param {string} metaId 메타id 
 * @return {string} 메타id에 대응되는 MintShaderToken contract address 
 */
async function getMstbyId(metaId) {
  const fs = require("fs")
  data = fs.readFileSync('mst_id.json')
  arr = JSON.parse(data)
  for (idx in arr)
  {
    if (arr[idx].metaId == metaId)
    // console.log(arr[idx])
    return arr[idx].mst
  }
}

/**
 * @brief 해당 주소의 컨트랙트의 deployer 주소 반환받음
 * @param {string} mstaddr MintShaderToken contract address 
 * @return {string} mstaddr의 deployer의 주소 
 */
async function getDepbyMst(mstaddr) {
  const fs = require("fs")
  data = fs.readFileSync('mst_deployer.json')
  arr = JSON.parse(data)
  for (idx in arr)
  {
    if (arr[idx].mst == mstaddr)
    // console.log(arr[idx])
    return arr[idx].deployer
  }
}

/**
 * @brief 해당 MintShaderToken Contract로 발행한 TradeShaderToken 주소를 반환 받음
 * @param {string} mstaddr MintShaderToken contract address 
 * @return {string} mstaddr을 사용하여 발행한 TradeShaderToken contract address 
 */
async function getTstbyMst(mstaddr) {
  const fs = require("fs")
  data = fs.readFileSync('mst_tst.json')
  arr = JSON.parse(data)
  for (idx in arr)
  {
    if (arr[idx].mst == mstaddr)
    // console.log(arr[idx])
    return arr[idx].tst
  }
}

/**
 * @brief MintShaderToken 컨트랙트를 wallet계정으로 배포한다.
 *        배포후 토큰을 발행하고 uri를 수정함
 *        마지막으로 json파일 작성
 * @param {string} wallet 지갑 주소 
 * @param {string} metaId meta id 
 * @param {int} tokenId tokenId 
 */
async function Minting(wallet, metaId, tokenId) {
    // We get the contract to deploy
    const MintShaderToken = await ethers.getContractFactory("MintShaderToken");
    const mst = await MintShaderToken.connect(wallet).deploy();

    await mst.deployed();

    await mst.connect(wallet).mintShaderToken(tokenId)
    const fiberaddr = "localhost/getmetabyid/"
    // Remark : fiberaddr은 RESTAPI 주소와 맞춰서 연동해야함

    await mst.connect(wallet).setTokenUri(tokenId, fiberaddr + metaId);
    const ad = await mst.connect(wallet).uri(tokenId)
  
    const fs = require("fs")
    var objs = []
    
    var obj = 
      {
        mst : mst.address,
        metaId : metaId
      }
   
    data = fs.readFileSync("mst_id.json")
    if(data.toString().length == 0)
    {
      objs.push(obj)
      fs.writeFileSync("mst_id.json", JSON.stringify(objs))
    }
    else
    {
      objs = JSON.parse(data)
      objs.push(obj)
      fs.writeFileSync("mst_id.json", JSON.stringify(objs))
    }
    // we write mst & id pair json file

    var objs2 = []
    
    var obj2 = 
      {
        mst : mst.address,
        deployer : wallet.address
      }
   
    data2 = fs.readFileSync("mst_deployer.json")
    if(data2.toString().length == 0)
    {
      objs2.push(obj2)
      fs.writeFileSync("mst_deployer.json", JSON.stringify(objs2))
    }
    else
    {
      objs2 = JSON.parse(data2)
      objs2.push(obj2)
      fs.writeFileSync("mst_deployer.json", JSON.stringify(objs2))
    }
    // we write mst & deployer pair json file
    
}

/**
 * @brief 위에서 민팅을 한 지갑을 그대로 사용한다
 *        민팅할때 발행한 컨트랙트의 주소를 mstaddr로 사용한다. (getMstbyId를 사용하여 구할 수 있음)
 *        가격을 설정하고 해당 토큰을 판매 상태로 만든다.
 * @param {string} wallet 지갑 주소
 * @param {string} mstaddr MintShaderToke contract의 address
 * @param {int} price 토큰 가격
 */
async function onSale1(wallet, mstaddr, price, tokenId) {
  const TradeShaderToken = await ethers.getContractFactory("TradeShaderToken");
  const tst = await TradeShaderToken.connect(wallet).deploy(mstaddr);
  const mst = await ethers.getContractAt("MintShaderToken", mstaddr);

  await tst.connect(wallet).deployed();

  await mst.connect(wallet).setApprovalForAll(tst.address, true);
  await tst.connect(wallet).saleToken(tokenId, price);

  const fs = require("fs")
    var objs = []
    
    var obj = 
      {
        mst : mst.address,
        tst : tst.address
      }
   
    data = fs.readFileSync("mst_tst.json")
    if(data.toString().length == 0)
    {
      objs.push(obj)
      fs.writeFileSync("mst_tst.json", JSON.stringify(objs))
    }
    else
    {
      objs = JSON.parse(data)
      objs.push(obj)
      fs.writeFileSync("mst_tst.json", JSON.stringify(objs))
    }
    // we write mst & tst pair json file
}

// 이 함수는 일단 무시
async function onSale2(wallet, mstaddr, price) {
  const mst = await ethers.getContractAt("MintShaderToken", mstaddr);
  const tst = await ethers.getContractAt("TradeShaderToken", getTstbyMst(mstaddr))

  
}

/**
 * @brief 토큰을 구매하는 함수이다.
 *        wallet의 경우 앞서 토큰을 발행한 지갑과 다른 지갑이어야 한다.
 *        mstaddr은 Minting 할때 발행한 컨트랙트 주소를 써야함
 *        mstaddr을 가지고 onSale1에서 TradeShaderToken contract를 발행하는데 이때 mst_tst 파일에 해당 페어들이 기록됨
 *        이때의 TradeShaderToken contract를 tstaddr에 써야함
 *        
 * @param {string} wallet 지갑 주소
 * @param {string} tstaddr TradeShaderToken Contract 주소 (getTstbyMst 함수를 사용하여 구할 수 있음)
 * @param {string} mstaddr MintShaderToken Contract 주소  (getMstbyId 함수를 사용하여 구할 수 있음)
 * @param {int} price 토큰 가격
 */
async function onPurchase(wallet, tstaddr, mstaddr, tokenId, price) {
  const mst = await ethers.getContractAt("MintShaderToken", mstaddr);
  const tst = await ethers.getContractAt("TradeShaderToken", tstaddr);
  
  await tst.connect(wallet).purchaseToken(tokenId, {value: price});
  await mst.connect(wallet).modifyOwner(tokenId);

}

// 이 부분은 그냥 테스트 해본 부분입니다.
async function main() {
  wallet = await ethers.getSigner("0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199");
  // 지갑 계정은 프론트에서 받아오는걸로 대체해야함

  metaId = "abcd"
  // restapi를 통해서 db에서 받아온 아이디로 대체해야함

  price = 1
  tokenId = 1
  await Minting(wallet, metaId, tokenId);
  // 가운데 인자인 token의 ID는 1로 고정함

  mstaddr = await getMstbyId(metaId)
  // get mst from json

  // seller = await getDepbyMst(mst)
  // seller = await (await ethers.getContractAt("MintShaderToken", mstaddr)).connect(wallet).ownerOf(tokenId)
  //two ways to get seller
  // 위 방법으로 mst에 해당하는 MintshaderToken contract 주소를 가져온다.

  await onSale1(wallet, mstaddr, 10, tokenId);

  tstaddr = await getTstbyMst(mstaddr)
  wallet2 = await ethers.getSigner("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266");

  await onPurchase(wallet2, tstaddr, mstaddr, tokenId, 10);
  //이 부분부터 ㅎ야합니다
  console.log("end");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });