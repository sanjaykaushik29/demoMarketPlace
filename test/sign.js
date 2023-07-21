const { expect } = require("chai");
const { ethers, network, web3 } = require("hardhat");

let  seller,
  buyer,
  add1,
  add2,
  add3,
  add4,
  add5,
  add6;
  let royality = 100;
  let tokenUri = "sanjay";
  let NFTPrice = 200
  describe("NFTCollection", async () => {
    before(async () => {
        let accounts = await ethers.getSigners();
        [user,
          seller,
          buyer,
          add1,
          add2,
          add3,
          add4,
          add5,
          add6,
        ] = accounts;

        const Hawks = await hre.ethers.getContractFactory("Hawks");
         hawks = await Hawks.deploy();
        await hawks.deployed();
        console.log("Hawks deployed to:", hawks.address);
      
        const BlackList = await hre.ethers.getContractFactory("BlackList");
        blacklist = await BlackList.deploy();
        await blacklist.deployed();
        
        const ERC721Token = await hre.ethers.getContractFactory("ERC721Token");
        erc721Token = await upgrades.deployProxy(ERC721Token, [500, blacklist.address], {
            initializer: "initialize",
        });
        await erc721Token.deployed();
        
        const MarketPlace = await hre.ethers.getContractFactory("MarketPlace");
        marketPlace = await upgrades.deployProxy(MarketPlace, [blacklist.address], {
            initializer: "initialize",
        });
        await marketPlace.deployed();
        
        console.log("BlackList deployed to:", blacklist.address);
        console.log("ERC721 Address", erc721Token.address);
        console.log("MarketPlace Address", marketPlace.address);
    })

    describe("generate sign :",() => {
        it("sign with address",async () =>{
        Nonce = 1;
        await erc721Token.mint(seller.address, royality, tokenUri)
        await marketPlace.connect(user).setMerkleRoot("0x8bfbcaa3f06db2512a8ba3e580bc58e14d8441577856012ccb476179b3814ff2");

        let message = ethers.utils.solidityPack(
        ["address", "uint256", "string", "address", "uint256", "uint256"],
        [erc721Token.address, 1, tokenUri, hawks.address, NFTPrice, Nonce]
      );

    let messageHash = ethers.utils.keccak256(message);
    let sign = await web3.eth.sign(messageHash, seller.address);
    let sellerdetails = [Nonce,seller.address,erc721Token.address,hawks.address,"1",royality,NFTPrice,sign,tokenUri,0,0];
    // veifyAddress = await marketPlace.verifySellerSign(sellerdetails)
    let _proof = [
        "0x8a3552d60a98e0ade765adddad0a2e420ca9b1eef5f326ba7ab860bb4ea72c94",
        "0xb1a5bda84b83f7f014abcf0cf69cab5a4de1c3ececa8123a5e4aaacb01f63f83"
      ]
    expect(await marketPlace.verifySellerSign(sellerdetails)).to.be.equal(seller.address)
    // await marketPlace.
//    console.log(add1.address);
    await erc721Token.connect(seller).approve(marketPlace.address,1)
    await hawks.connect(user).transfer(add1.address,110000000000)
    await hawks.connect(add1).approve(marketPlace.address,100000)
   console.log(">>>>", await hawks.allowance(add1.address,marketPlace.address))
    lazybuytx = await marketPlace.connect(add1).lazyBuy(sellerdetails,_proof,true)
    expect(await erc721Token.ownerOf(1)).to.be.equal(add1.address)
})
})


})