import { ethers } from "ethers";
import { abis, byteCodes } from "../index";

/**
 * @return {string} Returns the chainId of current network
 */
export async function getChainId() {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  // Prompt user for account connections
  await provider.send("eth_requestAccounts", []);
  const { chainId } = await provider.getNetwork();
  return chainId;
}

/**
 * @return {Promise<string>} Returns the address of wallet at the current web3 provider
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
 * @brief get MintShaderToken contract address with meta Id
 * @param {string} metaId meta id
 * @return {string} MintShaderToken contract address corresponded to meta id
 */
// export function getMstbyId(metaId) {
//   data = fs.readFileSync("mst_id.json");
//   arr = JSON.parse(data);
//   for (idx in arr) {
//     if (arr[idx].metaId == metaId)
//       // console.log(arr[idx])
//       return arr[idx].mst;
//   }
// }

/**
 * @brief get deployer wallet address with MintShaderToken smart contract address
 * @param {string} mstaddr MintShaderToken contract address
 * @return {string} deployer wallet address corresponded to MintShaderToken contract address
 */
// export async function getDepbyMst(mstaddr) {
//   data = fs.readFileSync("mst_deployer.json");
//   arr = JSON.parse(data);
//   for (idx in arr) {
//     if (arr[idx].mst == mstaddr)
//       // console.log(arr[idx])
//       return arr[idx].deployer;
//   }
// }

/**
 * @brief get TradeShaderToken contract address with MintShaderToken smart contract address
 * @param {string} mstaddr MintShaderToken contract address
 * @return {string} TradeShaderToken contract address corresponded to MintShaderToken contract address
 */
// export function getTstbyMst(mstaddr) {
//   data = fs.readFileSync("mst_tst.json");
//   arr = JSON.parse(data);
//   for (idx in arr) {
//     if (arr[idx].mst == mstaddr)
//       // console.log(arr[idx])
//       return arr[idx].tst;
//   }
// }

/**
 * @brief Deploy MintShaderToken contract to current wallet account
 * @param {string} metaId meta id
 * @param {int} tokenId tokenId
 * @param {int} price price
 */
export async function Minting(metaId, tokenId, price) {
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
  // Remark : We must sync fiber address and REST api address

  await mst.setTokenUri(tokenId, fiberaddr + metaId);

  // We get the contract to deploy
  const TradeShaderToken = await new ethers.ContractFactory(
    abis.tradeShaderTokenABI,
    byteCodes.tradeShaderTokenByteCode,
    signer
  );

  const tst = await TradeShaderToken.deploy(mst.address);

  await mst.setApprovalForAll(tst.address, true);

  console.log(`Price : ${price}`);
  await tst.saleToken(tokenId, price);

  return { mstAddress: mst.address, tstAddress: tst.address };
}

/**
 * @brief Buy ShaderNFT with ehter
 * wallet must be different with deployer wallet
 * MintShaderToken address must be same with the address which is used for deploying
 * When onSale1 is called with MintShaderToken contract, TradeShaderToken contract is deployed and
 * the pair of MST and TST contract addresses are recorded in mst_tst.json file.
 * tstaddr must be the one in mst_tst.json file.
 * @param {string} wallet metamask wallet address
 * @param {string} tstaddr TradeShaderToken Contract address (get by getTstByMst)
 * @param {string} mstaddr MintShaderToken Contract address (get by getMstbyId)
 * @param {int} price token price
 */
export async function onPurchase(wallet, tstaddr, mstaddr, tokenId, price) {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const signer = provider.getSigner();

  const mst = new ethers.Contract(mstaddr, abis.mintShaderTokenABI, signer);
  const tst = new ethers.Contract(mstaddr, abis.tradeShaderTokenABI, signer);

  await tst.purchaseToken(tokenId, { value: price });
  await mst.modifyOwner(tokenId);
}

// Code for test
async function main() {
  wallet = await ethers.getSigner("0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199");
  // Get wallet address should be replaced with metamask

  metaId = "abcd";
  // Should meta id from Rest api

  price = 1;
  tokenId = 1;
  await Minting(wallet, metaId, tokenId);
  // tokenId must be 1.

  mstaddr = await getMstbyId(metaId);
  // get mst from json

  // seller = await getDepbyMst(mst)
  // seller = await (await ethers.getContractAt("MintShaderToken", mstaddr)).ownerOf(tokenId)
  //two ways to get seller
  // Get MintShaderToken contract corresponded to MST address

  await onSale1(wallet, mstaddr, 10, tokenId);

  tstaddr = await getTstbyMst(mstaddr);
  wallet2 = await ethers.getSigner(
    "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
  );

  await onPurchase(wallet2, tstaddr, mstaddr, tokenId, 10);
  //
  console.log("end");
}
