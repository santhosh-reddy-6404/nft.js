// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.0;

import "github.com/OpenZeppelin/openzeppelin-contracts/contracts/utils/Counters.sol";
import "github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; 
import "github.com/OpenZeppelin/openzeppelin-contracts/contracts/access/Ownable.sol";

contract NFTjs is ERC721URIStorage, Ownable {

  using Counters for Counters.Counter;
  
  Counters.Counter private tokenIds;

  bool internal openMintable;

  address internal admin;

  uint internal maxSupply;
  
  mapping(string => uint) existingURIs;

  event lazyMintedAndTransferred(address minter, address buyer, uint tokenId);

  constructor(string memory name, string memory symbol, bool mintable, uint mSupply) ERC721(name, symbol) { 
    openMintable = mintable;
    admin = msg.sender;
    maxSupply = mSupply;
  }

  modifier onlyAllowed(address sender) {
  if(openMintable == false) {
  require(sender == admin, "only admin can mint");
  }
  _;
  }
  
  function mintNFT(address minter, string memory tokenURI) public onlyAllowed(msg.sender) returns (uint) { 
    tokenIds.increment();
    uint256 newItemId = tokenIds.current();
    require(newItemId <= maxSupply, "maximum supply reached");
    require(existingURIs[tokenURI] != 1, "NFT already minted");
    _safeMint(minter, newItemId);
    _setTokenURI(newItemId, tokenURI);
    existingURIs[tokenURI] = 1;
    return newItemId;
  }

  function updateNFT(uint id, string memory url) external {
    require(msg.sender == ownerOf(id));
    require(existingURIs[url] != 1, "NFT already minted");
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
    require(existingURIs[tokenURI] != 1, "NFT already minted");
    _safeMint(buyer, newItemId);
    _setTokenURI(newItemId, tokenURI);
    payable(minter).transfer(msg.value);
    emit lazyMintedAndTransferred(minter, buyer, tokenIds.current());
  }

  function transferFromTo(address from, address to, uint id) external payable {
    require(msg.value > 0, "must send some ether");
    safeTransferFrom(from, to, id);
    payable(from).transfer(msg.value);
  }

  function totalSupply() public view returns (uint) {
    return tokenIds.current();
  }

  function maximumSupply() public view returns(uint) {
    return maxSupply;
  }

  function publicMintable() public view returns(bool) {
    return openMintable;
  }

}
