const { expect } = require("chai");
const { ethers, web3 } = require("hardhat");
const hre = require("hardhat");
require("@nomiclabs/hardhat-web3");

let seller,
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

describe("MarketPlace Deployed", () => {
  before(async () => {
    accounts = await hre.ethers.getSigners();
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

    //Hawks TOKEN DEPLOYED
    let Hawks = await hre.ethers.getContractFactory("Hawks");
    hawks = await Hawks.deploy();

    
    //BLACKLIST DEPLOYED
    let BlackList = await hre.ethers.getContractFactory("BlackList");
    blacklist = await BlackList.deploy();

    // ERC721 DEPLOYED
    let ERC721Token = await hre.ethers.getContractFactory("ERC721Token");
    erc721Token = await upgrades.deployProxy(
      ERC721Token,
      [500, blacklist.address],
      {
        intializer: "initialize",
      }
    );
    await erc721Token.deployed();

    // MARKETPLACE DEPLOYED
    MarketPlace = await hre.ethers.getContractFactory("MarketPlace");
    marketPlace = await upgrades.deployProxy(MarketPlace, [blacklist.address], {
      intializer: "initialize",
    });
    await marketPlace.deployed();

    console.log("hawks Address", hawks.address);
    console.log("ERC721 Address", erc721Token.address);
    console.log("BlackList Address", blacklist.address);
    console.log("MarketPlace Address", marketPlace.address);
  });

  describe("LazyAuction Function success cases", () => {
    it("LazyAuction Function mint", async () => {
      let blockNumber = await ethers.provider.getBlockNumber();
      let block = await ethers.provider.getBlock(blockNumber);
      let NFTPrice = ethers.utils.parseEther("1");
      let Nonce = 1;
      let Royality = 250;
      let message = ethers.utils.solidityPack(
        ["address", "uint256", "string", "address", "uint256", "uint256"],
        [erc721Token.address, 0, "Testing", hawks.address, NFTPrice, Nonce]
      );
      let messageHash = ethers.utils.keccak256(message);
      let SellerSign = await web3.eth.sign(messageHash, seller.address);
      // console.log("SellerSignature",SellerSign);

      let SellerSigner = await marketPlace.getSigner(messageHash, SellerSign);
      // console.log("SellerSigner",SellerSigner);

      let message1 = ethers.utils.solidityPack(
        ["address","uint256","uint256","uint256"],
        [buyer.address,NFTPrice,block.timestamp + 50,Nonce]
      );
      let messageHash1 = ethers.utils.keccak256(message1);
      let BuyerSign = await web3.eth.sign(messageHash1,buyer.address);
      // console.log("BuyerSignature", BuyerSign);

      let BuyerSigner = await marketPlace.getSigner(messageHash1,BuyerSign);
      // console.log("BuyerSigner", BuyerSigner);

      // console.log("Seller", seller.address);
      // console.log("buyer", buyer.address);

let sellerStruct = [
      Nonce,
      seller.address,
      erc721Token.address,
      hawks.address,
      0,
      Royality,
      NFTPrice,
      SellerSign,
      "Testing",
      block.timestamp,
      block.timestamp + 100,
    ];
    let buyerStruct =[
          buyer.address,
          NFTPrice,
          BuyerSign,
          block.timestamp + 50,
          Nonce
        ]

      let Lazyauction = await marketPlace.connect(buyer).lazyAuction(sellerStruct, buyerStruct);

      expect(await erc721Token.ownerOf(1)).to.be.equal(buyer.address);
      // console.log("ankskkas", await erc721Token.balanceOf(buyer.address));
    });

    // it("LazyAuction Function", async () => {
    //     let blockNumber = await ethers.provider.getBlockNumber();
    //     let block = await ethers.provider.getBlock(blockNumber);
    //     let NFTPrice = ethers.utils.parseEther("1");
    //   let Nonce = 2;
    //   let Royality = 250;
    //   let message = ethers.utils.solidityPack(
    //     ["address", "uint256", "string", "address", "uint256", "uint256"],
    //     [erc721Token.address, 1, "Testing", hawks.address, NFTPrice, Nonce]
    //   );
    //   let messageHash = ethers.utils.keccak256(message);
    //   let SellerSign = await web3.eth.sign(messageHash, buyer.address);
    //   // console.log("SellerSignature",SellerSign);

    //   let SellerSigner = await marketPlace.getSigner(messageHash, SellerSign);
    //   // console.log("SellerSigner",SellerSigner);
    //   // console.log("Seller",buyer.address);


    //   let message1 = ethers.utils.solidityPack(
    //     ["address","uint256","uint256","uint256"],
    //     [seller.address,NFTPrice,block.timestamp + 50,Nonce]
    //   );
    //   let messageHash1 = ethers.utils.keccak256(message1);
    //   let BuyerSign = await web3.eth.sign(messageHash1,seller.address);
    //   let BuyerSigner = await marketPlace.getSigner(messageHash1,BuyerSign);

    //   // console.log("BuyerSigner", BuyerSigner);
    //   // console.log("buyer", seller.address);

    //   await erc721Token
    //     .connect(buyer)
    //     .setApprovalForAll(marketPlace.address, true);

    //   await hawks.connect(seller).approve(marketPlace.address, NFTPrice);

    //   let sellerStruct = [
    //           Nonce,
    //           buyer.address,
    //           erc721Token.address,
    //           hawks.address,
    //           1,
    //           Royality,
    //           NFTPrice,
    //           SellerSign,
    //           "Testing",
    //           block.timestamp,
    //           block.timestamp + 100,
    //         ];
    //         let buyerStruct =[
    //                 seller.address,
    //                 NFTPrice,
    //                 BuyerSign,
    //                 block.timestamp + 50,
    //                 Nonce
    //               ];
    //   let Lazyauction = await marketPlace.connect(seller).lazyAuction(sellerStruct,buyerStruct);
    //     // console.log("iasojopajsojos", await erc721Token.balanceOf(seller.address));
    //   //  expect(await erc721Token.ownerOf(1)).to.be.equal(seller.address)
    // });

    // it("Should check the calculate Royality and Platform fee", async () => {
    //   let blockNumber = await ethers.provider.getBlockNumber();
    //   let block = await ethers.provider.getBlock(blockNumber);

    //   let nonce = 9;
    //   let nftPrice = ethers.utils.parseEther("1");
    //   let royality = 350;
    //   let plat = 250;

    //   let message = ethers.utils.solidityPack(
    //     ["address", "uint256", "string", "address", "uint256", "uint256"],
    //     [erc721Token.address, 1, "Testing", hawks.address, nftPrice, nonce]
    //   );
    //   let messageHash = ethers.utils.keccak256(message);
    //   let ssign = web3.eth.sign(messageHash, seller.address);


    //   let message1 = ethers.utils.solidityPack(
    //     ["address","uint256","uint256","uint256"],
    //     [add1.address,nftPrice,block.timestamp + 50,nonce]
    //   );
    //   let messageHash1 = ethers.utils.keccak256(message1);
    //   let BuyerSign = await web3.eth.sign(messageHash1,add1.address);
    //   // console.log("oldBuyBal",await hawks.balanceOf(add3.address));
    //   await hawks.transfer(add1.address, nftPrice);
    //   // console.log("oldBuyBal",await hawks.balanceOf(add3.address));

    //   await erc721Token
    //     .connect(seller)
    //     .setApprovalForAll(marketPlace.address, true);

    //  await hawks.connect(add1).approve(marketPlace.address, nftPrice);


    //   let OldPlatFormBal = await hawks.balanceOf(marketPlace.address);
    //   console.log("OLd PlatFormBal", OldPlatFormBal);
    //     // console.log(await hawks.balanceOf(add1.address));

    //   let sellerStruct = [
    //     nonce,
    //     seller.address,
    //     erc721Token.address,
    //     hawks.address,
    //     1,
    //     royality,
    //     nftPrice,
    //     ssign,
    //     "Testing",
    //     block.timestamp,
    //     block.timestamp + 100,
    //   ];
    //   let buyerStruct =[
    //           add1.address,
    //           nftPrice,
    //           BuyerSign,
    //           block.timestamp + 50,
    //           nonce
    //         ];
    //   let Lazyauction = await marketPlace.connect(add1).lazyAuction(sellerStruct, buyerStruct);
    //   expect(await erc721Token.ownerOf(1)).to.be.equal(add1.address);

    //   let newPlatFormBal = await hawks.balanceOf(marketPlace.address);
    //   console.log("OLd PlatFormBal", newPlatFormBal);
      

    //   // expect(await erc721Token.balanceOf(add3.address)).to.be.equal(1);

    //   // let calculatedRoyality = (nftPrice * royality) / 10000;
    //   let calculatedRoyality =  await (erc721Token.royaltyInfo(1,nftPrice))
    //   console.log("CalculatedRoyality", calculatedRoyality);

    //   // let newPlatFormBal = (nftPrice * plat) / 10000;
    //   // console.log("New PlatFormBal", newPlatFormBal);

    //   // let OlatFormBal = await my.balanceOf(marketPlace.address);
    //   // console.log("OLd PlatFormBal", OllatFormBal);




    //   // let remainingAmount = nftPrice - newPlatFormBal;
    //   // console.log("Remaining Amount", remainingAmount);

    //   // let ActualAmount = remainingAmount - calculatedRoyality;

    //   // let newSellerBal = await hawks.balanceOf(add1.address);
    //   // let newBuyerBal = await hawks.balanceOf(add3.address);
    //   // console.log("newSellBal", newSellerBal);
    //   // console.log("newBuyBal", newBuyerBal);

    //   // expect(newSellerBal).to.equals(
    //   //   oldSellerBal.add(ethers.BigNumber.from(remainingAmount.toString()))
    //   // );
    // });
  });
});
