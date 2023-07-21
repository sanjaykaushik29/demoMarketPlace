const { expect } = require("chai");
const { ethers, network, web3 } = require("hardhat");

let owner = "0x2736e3A9db02ff29Eb328f31f8437dea325336F4";

let  owner1, seller,
  buyer,
  add1,
  add2,
  add3,
  add4,
  add5,
  add6,
  hawks,
  erc721Token,
  marketPlace;


describe("NFTCollection", async () => {
  before(async () => {
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [owner],
    });
    owner1 = await ethers.getSigner(owner);
    let accounts = await ethers.getSigners();
    [
      seller,
      buyer,
      add1,
      add2,
      add3,
      add4,
      add5,
      add6,
      hawks,
      erc721Token,
      marketplace,
      _,
    ] = accounts;


    ERC721Token = await hre.ethers.getContractFactory("ERC721Token");
    erc721Token = await ERC721Token.attach(
      "0x10E457129b4F5F35EdaC901AC669333a887C1513"
    );

    MarketPlace = await hre.ethers.getContractFactory("MarketPlace");
    marketPlace = await MarketPlace.attach(
      "0x473F94773f52E8F4967EE7F91650a90cc85f03b7"
    );

    Hawks = await hre.ethers.getContractFactory("Hawks");
    hawks = Hawks.attach("0x12A98122E956Bbf3535523Ac9A2C178E3E2af325");

    BlackList = await hre.ethers.getContractFactory("BlackList");
    blacklist = await BlackList.attach(
      "0x85C6C022F8007A8392E83C0a00eC41B66e8e4B8d"
    );

    console.log("hawks Address", hawks.address);
    console.log("ERC721 Address", erc721Token.address);
    console.log("BlackList Address", blacklist.address);
    console.log("MarketPlace Address", marketPlace.address);
  });


  
  describe("Testing MarketPlace Functions",() => {

  //   it("Should LazyBuy Minted NFT", async () => {
  //     let BlockNumber = await ethers.provider.getBlockNumber();
  //     let Block = await ethers.provider.getBlock(BlockNumber);
  //     let NFTPrice = 200;
  //     let Nonce = 24;
  //     let Royality = 250;

  //     // await marketPlace.connect(seller).setMerkleRoot("0xbe2d7e9a8069ecb94e1eeac31455299467f5a257ccba4a83950046a3066c9465");
      
  //     let message = ethers.utils.solidityPack(
  //       ["address", "uint256", "string", "address", "uint256", "uint256"],
  //       [erc721Token.address, 0, "DemoTest", hawks.address, NFTPrice, Nonce]
  //     );

  //     let messageHash = ethers.utils.keccak256(message);
  //     let sign = await web3.eth.sign(messageHash, seller.address);
  //     // let sign = await web3.eth.accounts.sign(messageHash, "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");
  //     await hawks.transfer(buyer.address, NFTPrice);
  //     await erc721Token.connect(seller).setApprovalForAll(marketPlace.address, true);
  //     await hawks.connect(buyer).approve(marketPlace.address,NFTPrice);  
      
  //     let _proof = [
  //       "0x04a10bfd00977f54cc3450c9b25c9b3a502a089eba0097ba35fc33c4ea5fcb54",
  //       "0x8d4e49f4168518216881f7f4662ce5827947f58ecacfc7168fe5a9c9471ffffb",
  //       "0xf6d82c545c22b72034803633d3dda2b28e89fb704f3c111355ac43e10612aedc"
  //     ]
  //    lazyBuy = await marketPlace.connect(buyer).LazyBuy([
  //       Nonce,
  //       seller.address,
  //       erc721Token.address,
  //       hawks.address,
  //       0,
  //       Royality,
  //       NFTPrice,
  //       sign.signature,
  //       "DemoTest",
  //       Block.timestamp,
  //       Block.timestamp + 100,
  //     ], _proof);
  //     expect(await erc721Token.ownerOf(1)).to.be.equal(buyer.address);
  // })

  it("set merkleroot", async () => {
  await marketPlace.connect(owner1).setMerkleRoot("0xbe2d7e9a8069ecb94e1eeac31455299467f5a257ccba4a83950046a3066c9465");

  })
})
})

// [24,"0x2736e3A9db02ff29Eb328f31f8437dea325336F4","0x8C5198983cF2A943547cc83752787bB059bA670A","0x602d54400e53C2BBC28845CF657d77E7Ffb37286",0,250,200,"0xb1578ffa2aec401ccd20b468244ef63af83c4df8ff440acb1cc829ff3fa1150c68c201f2c29414e94bf0ab7f12e7ab571466e6fb22901cbc1af5eb8f982196a41c","DemoTest",1668423332,1668423432]