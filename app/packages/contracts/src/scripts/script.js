const { ethers } = require("hardhat");


/**
 * @brief meta id�� MintShaderToken contract address�� ��ȯ����
 * @param {string} metaId ��Ÿid 
 * @return {string} ��Ÿid�� �����Ǵ� MintShaderToken contract address 
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
 * @brief �ش� �ּ��� ��Ʈ��Ʈ�� deployer �ּ� ��ȯ����
 * @param {string} mstaddr MintShaderToken contract address 
 * @return {string} mstaddr�� deployer�� �ּ� 
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
 * @brief �ش� MintShaderToken Contract�� ������ TradeShaderToken �ּҸ� ��ȯ ����
 * @param {string} mstaddr MintShaderToken contract address 
 * @return {string} mstaddr�� ����Ͽ� ������ TradeShaderToken contract address 
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
 * @brief MintShaderToken ��Ʈ��Ʈ�� wallet�������� �����Ѵ�.
 *        ������ ��ū�� �����ϰ� uri�� ������
 *        ���������� json���� �ۼ�
 * @param {string} wallet ���� �ּ� 
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
    // Remark : fiberaddr�� RESTAPI �ּҿ� ���缭 �����ؾ���

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
 * @brief ������ ������ �� ������ �״�� ����Ѵ�
 *        �����Ҷ� ������ ��Ʈ��Ʈ�� �ּҸ� mstaddr�� ����Ѵ�. (getMstbyId�� ����Ͽ� ���� �� ����)
 *        ������ �����ϰ� �ش� ��ū�� �Ǹ� ���·� �����.
 * @param {string} wallet ���� �ּ�
 * @param {string} mstaddr MintShaderToke contract�� address
 * @param {int} price ��ū ����
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

// �� �Լ��� �ϴ� ����
async function onSale2(wallet, mstaddr, price) {
  const mst = await ethers.getContractAt("MintShaderToken", mstaddr);
  const tst = await ethers.getContractAt("TradeShaderToken", getTstbyMst(mstaddr))

  
}

/**
 * @brief ��ū�� �����ϴ� �Լ��̴�.
 *        wallet�� ��� �ռ� ��ū�� ������ ������ �ٸ� �����̾�� �Ѵ�.
 *        mstaddr�� Minting �Ҷ� ������ ��Ʈ��Ʈ �ּҸ� �����
 *        mstaddr�� ������ onSale1���� TradeShaderToken contract�� �����ϴµ� �̶� mst_tst ���Ͽ� �ش� ������ ��ϵ�
 *        �̶��� TradeShaderToken contract�� tstaddr�� �����
 *        
 * @param {string} wallet ���� �ּ�
 * @param {string} tstaddr TradeShaderToken Contract �ּ� (getTstbyMst �Լ��� ����Ͽ� ���� �� ����)
 * @param {string} mstaddr MintShaderToken Contract �ּ�  (getMstbyId �Լ��� ����Ͽ� ���� �� ����)
 * @param {int} price ��ū ����
 */
async function onPurchase(wallet, tstaddr, mstaddr, tokenId, price) {
  const mst = await ethers.getContractAt("MintShaderToken", mstaddr);
  const tst = await ethers.getContractAt("TradeShaderToken", tstaddr);
  
  await tst.connect(wallet).purchaseToken(tokenId, {value: price});
  await mst.connect(wallet).modifyOwner(tokenId);

}

// �� �κ��� �׳� �׽�Ʈ �غ� �κ��Դϴ�.
async function main() {
  wallet = await ethers.getSigner("0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199");
  // ���� ������ ����Ʈ���� �޾ƿ��°ɷ� ��ü�ؾ���

  metaId = "abcd"
  // restapi�� ���ؼ� db���� �޾ƿ� ���̵�� ��ü�ؾ���

  price = 1
  tokenId = 1
  await Minting(wallet, metaId, tokenId);
  // ��� ������ token�� ID�� 1�� ������

  mstaddr = await getMstbyId(metaId)
  // get mst from json

  // seller = await getDepbyMst(mst)
  // seller = await (await ethers.getContractAt("MintShaderToken", mstaddr)).connect(wallet).ownerOf(tokenId)
  //two ways to get seller
  // �� ������� mst�� �ش��ϴ� MintshaderToken contract �ּҸ� �����´�.

  await onSale1(wallet, mstaddr, 10, tokenId);

  tstaddr = await getTstbyMst(mstaddr)
  wallet2 = await ethers.getSigner("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266");

  await onPurchase(wallet2, tstaddr, mstaddr, tokenId, 10);
  //�� �κк��� �����մϴ�
  console.log("end");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });