// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IblackList {
    function _isPermitted(address user) external view returns (bool);

    function AddRemoveBlacklist(address node) external;
}
