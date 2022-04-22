// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.0;

import "github.com/OpenZeppelin/openzeppelin-contracts/contracts/utils/Counters.sol";
import "github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; 
import "github.com/OpenZeppelin/openzeppelin-contracts/contracts/access/Ownable.sol";

contract NFTjs is ERC721URIStorage, Ownable {

  using Counters for Counters.Counter;
  
  Counters.Counter private tokenIds;

  bool public publicMintable;

  uint public maxSupply;

  event lazyMintedAndTransferred(address minter, address buyer, uint tokenId);

  constructor(string memory name, string memory symbol, bool mintable, uint mSupply) ERC721(name, symbol) { 
    publicMintable = mintable;
    maxSupply = mSupply;
  }

  modifier onlyAllowed(address sender) {
  if(publicMintable == false) {
  require(sender == owner(), "only admin can mint");
  }
  _;
  }
  
  function mintNFT(address minter, string memory tokenURI) public onlyAllowed(msg.sender) returns (uint) { 
    tokenIds.increment();
    uint256 newItemId = tokenIds.current();
    require(newItemId <= maxSupply, "maximum supply reached");
    _safeMint(minter, newItemId);
    _setTokenURI(newItemId, tokenURI);
    existingURIs[tokenURI] = 1;
    return newItemId;
  }

  function updateNFT(uint id, string memory url) external {
    require(msg.sender == ownerOf(id));
    _setTokenURI(id, url);
    existingURIs[url] = 1;
  }

  function burnNFT(uint id) external {
    require(msg.sender == ownerOf(id), "Not a owner to burn the token");
    _burn(id);
  }

  function lazyMintAndTransfer(address minter, address buyer, string memory tokenURI) onlyAllowed(minter)  payable external {
    require(msg.value > 0, "must send some ether");
    tokenIds.increment();
    uint256 newItemId = tokenIds.current();
    require(newItemId <= maxSupply, "maximum supply reached");
    _safeMint(buyer, newItemId);
    _setTokenURI(newItemId, tokenURI);
    emit lazyMintedAndTransferred(minter, buyer, tokenIds.current());
    payable(minter).transfer(msg.value);
 }

  function buyTransfer(address from, address to, uint id) external payable {
    require(getApproved(id) == address(this), "ERC721: caller is not owner or approved");
    require(msg.value > 0, "must send some ether");
    address(this).call(abi.encodeWithSignature("safeTransferFrom(address,address,uint256,bytes)", from, to, id,""));
    payable(from).transfer(msg.value);
  }

  function totalSupply() public view returns (uint) {
    return tokenIds.current();
  }

}
