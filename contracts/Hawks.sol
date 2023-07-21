// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Hawks is ERC20, Ownable {

    constructor()ERC20("Hawks", "Hks"){
        uint totalSupply = 1000000000 * (10 ** decimals());
        _mint(msg.sender, totalSupply);
    }
    
    function decimals() public pure override returns(uint8){
        return 18;
    }
    
    function mint(address to, uint amount) public onlyOwner(){
        _mint(to, amount);
    }
    
    function burn(uint amount) public {
        _burn(_msgSender(), amount);
    }
}