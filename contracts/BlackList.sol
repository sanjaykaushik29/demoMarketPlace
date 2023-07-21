// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/access/Ownable.sol";


contract BlackList is Ownable  {
    mapping(address => bool) blacklisted;
    event Blacklisted(address _node, bool);

    function _isPermitted(address uesr) external view returns(bool) {
        return !blacklisted[uesr];
    
    }

    function AddRemoveBlacklist(address node) public  onlyOwner{

        if (!blacklisted[node]) {
            blacklisted[node] = true;
            emit Blacklisted(node, true);
        } else {
            blacklisted[node] = false;

            emit Blacklisted(node, false);
        }
    }
}
