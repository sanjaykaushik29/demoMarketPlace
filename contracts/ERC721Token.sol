// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721RoyaltyUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "contracts/interfaces/Iblacklist.sol";


contract ERC721Token is
    OwnableUpgradeable,
    ERC721URIStorageUpgradeable,
    ERC721BurnableUpgradeable,
    ERC721RoyaltyUpgradeable{
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _tokenIds;
    IblackList blacklist;

    uint96 public maximumRoyality;

    function initialize(uint96 _maxRoyality, IblackList _blacklistAddress)
        public
        initializer
    {
        __ERC721_init("MarketPlace", "MKP");
        __ERC721Burnable_init();
        __ERC721Royalty_init();
        __ERC721URIStorage_init();
        __Ownable_init();
        _tokenIds.increment();
        maximumRoyality = _maxRoyality;
        blacklist = _blacklistAddress;
    }

    function mint(
        address to,
        uint96 _royality,
        string memory tokenUri
    ) external returns (uint256) {
        require(blacklist._isPermitted(msg.sender), "user is blacklisted");
        require(
            _royality <= maximumRoyality,
            "ERC721Token: Royality should be less"
        );
        require(
            address(to) != address(0),
            "ERC721Token: to address can't be 0x0"
        );
        uint256 newItemId = _tokenIds.current();

        _mint(to, newItemId);
        _setTokenURI(newItemId, tokenUri);
        _setTokenRoyalty(newItemId, to, _royality);
        _tokenIds.increment();

        return newItemId;
    }

    function setMaximumRoyality(uint96 _value) external onlyOwner {
        maximumRoyality = _value;
    }

    function _burn(uint256 tokenId)
        internal
        virtual
        override(
            ERC721RoyaltyUpgradeable,
            ERC721URIStorageUpgradeable,
            ERC721Upgradeable
        )
    {
        return super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(
            ERC721RoyaltyUpgradeable,
            ERC721Upgradeable
        )
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(ERC721URIStorageUpgradeable, ERC721Upgradeable)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
