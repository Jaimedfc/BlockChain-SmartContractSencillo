pragma solidity ^0.5.0;


contract Factory {
  string[] public items = ["Hola","Adios"];
  event Tic(string msg, uint);

  function set(string memory x) public{

  	items.push(x);
  	emit Tic("Actualizado",items.length);


  }

  function long() public view returns (uint){

  	return items.length;
  }

}
