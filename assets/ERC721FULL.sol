// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.0;

import "github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";
import "github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; 
import "github.com/OpenZeppelin/openzeppelin-contracts/contracts/access/Ownable.sol";

contract NFTJS is ERC721URIStorage, Ownable {

  bool public publicMintable;

  uint public maxSupply;

  address public admin;

  uint public mintFee;

  uint public tranferCharge;

  event lazyMintedAndTransferred(address minter, address buyer, uint tokenId);

  constructor(string memory name, string memory symbol, bool mintable, uint mSupply, address _admin, uint _mintFee, uint _transferCharge) ERC721(name, symbol) { 
    publicMintable = mintable;
    maxSupply = mSupply;
    admin = _admin;
    mintFee = _mintFee;
    transferCharge = _transferCharge;
  }

  modifier onlyAllowed(address sender) {
  if(publicMintable == false) {
  require(sender == owner(), "only admin can mint");
  }
  _;
  }
  
  function mintNFT(address minter, string memory tokenURI) public payable onlyAllowed(msg.sender) returns (uint) { 
    require(msg.value == mintFee.mul(10**18), "send the exact mintFee");
    tokenIds.increment();
    uint256 newItemId = tokenIds.current();
    require(newItemId <= maxSupply, "maximum supply reached");
    _safeMint(minter, newItemId);
    _setTokenURI(newItemId, tokenURI);
  }

  function updateNFT(uint id, string memory url) external {
    require(msg.sender == ownerOf(id));
    _setTokenURI(id, url);
  }

  function burnNFT(uint id) external {
    require(msg.sender == ownerOf(id), "Not a owner to burn the token");
    _burn(id);
  }

  function lazyMintAndTransfer(address minter, address buyer, string memory tokenURI) external payable onlyAllowed(minter) {
    require(mintFee == 0, "lazyMint is not supported for this contract");
    require(msg.value > 0, "must send some ether");
    tokenIds.increment();
    uint256 newItemId = tokenIds.current();
    require(newItemId <= maxSupply, "maximum supply reached");
    _safeMint(buyer, newItemId);
    _setTokenURI(newItemId, tokenURI);
    emit lazyMintedAndTransferred(minter, buyer, tokenIds.current());
    uint value1 = (msg.value).mul(100-transferCharge).div(100);
    uint value2 = (msg.value).mul(transferCharge).div(100);
    payable(from).transfer(value1);
    payable(admin).transfer(value2);
 }

  function buyTransfer(address from, address to, uint id) external payable {
    require(getApproved(id) == address(this), "ERC721: caller is not owner or approved");
    require(msg.value > 0, "must send some ether");
    uint value1 = (msg.value).mul(100-transferCharge).div(100);
    uint value2 = (msg.value).mul(transferCharge).div(100);
    address(this).call(abi.encodeWithSignature("safeTransferFrom(address,address,uint256,bytes)", from, to, id,""));
    payable(from).transfer(value1);
    payable(admin).transfer(value2);
  }

  function totalSupply() public view returns (uint) {
    return tokenIds.current();
  }

  function balance() public view returns (uint) {
    return address(this).balance;
  }

  function withdraw(uint _amount) external onlyOwner {
    payable(owner()).transfer(_amount);
  }

}
