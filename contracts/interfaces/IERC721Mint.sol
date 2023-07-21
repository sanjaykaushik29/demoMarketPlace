// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";


interface IERC721Mint is IERC721Upgradeable{
    function mint(
        address to,
        uint96 _royality,
         string memory tokenURI
    ) external returns (uint256);
}
