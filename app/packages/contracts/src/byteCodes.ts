import MintShaderTokenABI from "./contracts/MintShaderToken.sol/MintShaderToken.json"
import TradeShaderTokenABI from "./contracts/TradeShaderToken.sol/TradeShaderToken.json"

const byteCodes = {
  mintShaderTokenByteCode: MintShaderTokenABI.bytecode,
  tradeShaderTokenByteCode: TradeShaderTokenABI.bytecode,
};

export default byteCodes;
