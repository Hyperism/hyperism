import { ethers } from "ethers";
import { abis, byteCodes } from "../index";
import fs from "fs";

/**
 * @return {string} ??? ??? ??? ??
 */
export async function getWallet() {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  // Prompt user for account connections
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  console.log("Account:", await signer.getAddress());

  return signer.getAddress();
}

/**
 * @brief meta id? MintShaderToken contract address? ????
 * @param {string} metaId ??id
 * @return {string} ??id? ???? MintShaderToken contract address
 */
export async function getMstbyId(metaId) {
  data = fs.readFileSync("mst_id.json");
  arr = JSON.parse(data);
  for (idx in arr) {
    if (arr[idx].metaId == metaId)
      // console.log(arr[idx])
      return arr[idx].mst;
  }
}

/**
 * @brief ?? ??? ????? deployer ?? ????
 * @param {string} mstaddr MintShaderToken contract address
 * @return {string} mstaddr? deployer? ??
 */
export async function getDepbyMst(mstaddr) {
  data = fs.readFileSync("mst_deployer.json");
  arr = JSON.parse(data);
  for (idx in arr) {
    if (arr[idx].mst == mstaddr)
      // console.log(arr[idx])
      return arr[idx].deployer;
  }
}

/**
 * @brief ?? MintShaderToken Contract? ??? TradeShaderToken ??? ?? ??
 * @param {string} mstaddr MintShaderToken contract address
 * @return {string} mstaddr? ???? ??? TradeShaderToken contract address
 */
export async function getTstbyMst(mstaddr) {
  data = fs.readFileSync("mst_tst.json");
  arr = JSON.parse(data);
  for (idx in arr) {
    if (arr[idx].mst == mstaddr)
      // console.log(arr[idx])
      return arr[idx].tst;
  }
}

/**
 * @brief MintShaderToken ????? wallet???? ????.
 *        ??? ??? ???? uri? ???
 *        ????? json?? ??
 * @param {string} walletAddress ?? ??
 * @param {string} metaId meta id
 * @param {int} tokenId tokenId
 */
export async function Minting(walletAddress, metaId, tokenId) {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const signer = provider.getSigner();

  // We get the contract to deploy
  const MintShaderToken = await new ethers.ContractFactory(
    abis.mintShaderTokenABI,
    byteCodes.mintShaderTokenByteCode,
    signer
  );
  const mst = await MintShaderToken.deploy();

  await mst.mintShaderToken(tokenId);
  const fiberaddr = "localhost/getmetabyid/";
  // Remark : fiberaddr? RESTAPI ??? ??? ?????

  await mst.setTokenUri(tokenId, fiberaddr + metaId);
  const ad = await mst.uri(tokenId);

  var objs = [];

  var obj = {
    mst: mst.address,
    metaId: metaId,
  };

  console.log(
    "ShaderNFT Minted : owner({}), tokenId({})",
    await mst.ownerOf(tokenId)
  );
  data = await fs.readFileSync("mst_id.json");
  if (data.toString().length == 0) {
    objs.push(obj);
    await fs.writeFileSync("mst_id.json", JSON.stringify(objs));
  } else {
    objs = JSON.parse(data);
    objs.push(obj);
    await fs.writeFileSync("mst_id.json", JSON.stringify(objs));
  }
  // we write mst & id pair json file

  var objs2 = [];

  var obj2 = {
    mst: mst.address,
    deployer: wallet.address,
  };

  data2 = await fs.readFileSync("mst_deployer.json");
  if (data2.toString().length == 0) {
    objs2.push(obj2);
    await fs.writeFileSync("mst_deployer.json", JSON.stringify(objs2));
  } else {
    objs2 = JSON.parse(data2);
    objs2.push(obj2);
    await fs.writeFileSync("mst_deployer.json", JSON.stringify(objs2));
  }
  // we write mst & deployer pair json file
}

/**
 * @brief ??? ??? ? ??? ??? ????
 *        ???? ??? ????? ??? mstaddr? ????. (getMstbyId? ???? ?? ? ??)
 *        ??? ???? ?? ??? ?? ??? ???.
 * @param {string} wallet ?? ??
 * @param {string} mstaddr MintShaderToke contract? address
 * @param {int} price ?? ??
 */
export async function onSale1(wallet, mstaddr, price, tokenId) {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const signer = provider.getSigner();

  // We get the contract to deploy
  const TradeShaderToken = await new ethers.ContractFactory(
    abis.tradeShaderTokenABI,
    byteCodes.tradeShaderTokenByteCode,
    signer
  );

  const tst = await TradeShaderToken.deploy(mstaddr);
  const mst = await ethers.getContractAt("MintShaderToken", mstaddr);

  await tst.deployed();

  await mst.setApprovalForAll(tst.address, true);
  await tst.saleToken(tokenId, price);

  var objs = [];

  var obj = {
    mst: mst.address,
    tst: tst.address,
  };

  data = fs.readFileSync("mst_tst.json");
  if (data.toString().length == 0) {
    objs.push(obj);
    fs.writeFileSync("mst_tst.json", JSON.stringify(objs));
  } else {
    objs = JSON.parse(data);
    objs.push(obj);
    fs.writeFileSync("mst_tst.json", JSON.stringify(objs));
  }
  // we write mst & tst pair json file
}

// ? ??? ?? ??
async function onSale2(wallet, mstaddr, price) {
  const mst = await ethers.getContractAt("MintShaderToken", mstaddr);
  const tst = await ethers.getContractAt(
    "TradeShaderToken",
    getTstbyMst(mstaddr)
  );
}

/**
 * @brief ??? ???? ????.
 *        wallet? ?? ?? ??? ??? ??? ?? ????? ??.
 *        mstaddr? Minting ?? ??? ???? ??? ???
 *        mstaddr? ??? onSale1?? TradeShaderToken contract? ????? ?? mst_tst ??? ?? ???? ???
 *        ??? TradeShaderToken contract? tstaddr? ???
 *
 * @param {string} wallet ?? ??
 * @param {string} tstaddr TradeShaderToken Contract ?? (getTstbyMst ??? ???? ?? ? ??)
 * @param {string} mstaddr MintShaderToken Contract ??  (getMstbyId ??? ???? ?? ? ??)
 * @param {int} price ?? ??
 */
export async function onPurchase(wallet, tstaddr, mstaddr, tokenId, price) {
  const mst = await ethers.getContractAt("MintShaderToken", mstaddr);
  const tst = await ethers.getContractAt("TradeShaderToken", tstaddr);

  await tst.purchaseToken(tokenId, { value: price });
  await mst.modifyOwner(tokenId);
}

// ? ??? ?? ??? ?? ?????.
async function main() {
  wallet = await ethers.getSigner("0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199");
  // ?? ??? ????? ?????? ?????

  metaId = "abcd";
  // restapi? ??? db?? ??? ???? ?????

  price = 1;
  tokenId = 1;
  await Minting(wallet, metaId, tokenId);
  // ??? ??? token? ID? 1? ???

  mstaddr = await getMstbyId(metaId);
  // get mst from json

  // seller = await getDepbyMst(mst)
  // seller = await (await ethers.getContractAt("MintShaderToken", mstaddr)).ownerOf(tokenId)
  //two ways to get seller
  // ? ???? mst? ???? MintshaderToken contract ??? ????.

  await onSale1(wallet, mstaddr, 10, tokenId);

  tstaddr = await getTstbyMst(mstaddr);
  wallet2 = await ethers.getSigner(
    "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
  );

  await onPurchase(wallet2, tstaddr, mstaddr, tokenId, 10);
  //? ???? ?????
  console.log("end");
}
