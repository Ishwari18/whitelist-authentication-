//these constants muct match those in the smart contracts
const SIGNING_DOMAIN_NAME = "Web3club";
const SIGNING_DOMAIN_VERSION = "1";

class SignHelper {
  constructor(contractAddress, chainId, signer) {
    this.contractAddress = contractAddress;
    this.chainId = chainId;
    this.signer = signer;
  }

  async createSignature(id, name) {
    const obj = { id, name };
    const domain = this._signingDomain();
    const types = {
      Web3Struct: [
        { name: "id", type: "uint256" },
        { name: "name", type: "string" },
      ],
    };
    const signature = await this.signer._signedTypeData(domain, types, obj);
    return { ...obj, signature };
  }

  async _signingDomain() {
    if (this.domain != null) {
      return this._domain;
    }
    const chainId = await this._chainId;
    this._domain = {
      name: SIGNING_DOMAIN_NAME,
      version: SIGNING_DOMAIN_VERSION,
      verifyingContract: this.contractAddress,
      chainId,
    };
    return this._domain;
  }

  static async getSign(contractAddress, chainId, tokenId, name) {
    var provider = new ethers.provider.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);
    var signer = provider.getSigner();
    await signer.getAddress();

    let lm = new SignHelper(contractAddress, chainId, signer);
    var voucher = await lm.createSignature(tokenId, name);

    return voucher;
  }
}
