pragma solidity ^0.5.0;

contract Item {


	string public good;
	

	constructor(string memory x) public {
		good = x;
		
	}


	function setGood(string memory x) public {

  		good = x;

 	}
  
}