pragma solidity ^0.5.0;
import './Item.sol';


contract Factory {
  

  address[] public addrs;
 

  function createItem(string memory value) public{

  	Item newItem = new Item(value);
  	addrs.push(address(newItem));

  }

  function setItem(string memory value, address addr) public{

  	Item itemInstance = Item(addr);
  	itemInstance.setGood(value);
  }

  function getItem( address addr) view public returns (string memory){


  	Item itemInstance = Item(addr);
  	return itemInstance.good();
  }

  function getLength() view public returns (uint){

  	return addrs.length;
  }
  



}


