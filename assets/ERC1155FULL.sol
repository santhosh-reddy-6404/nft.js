//SPDX-License-Identifier: MIT;
pragma solidity ^0.8.*;

import "github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";
import "github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC1155/ERC1155.sol";
import "github.com/OpenZeppelin/openzeppelin-contracts/contracts/access/Ownable.sol";

contract NFTJS is ERC1155, Ownable {

  using SafeMath for uint;

  struct token {
    address creator;
    string uri;
    uint supply;
    uint maxSupply;
  }

  mapping(uint => token) internal tokens;
  
  string public name;

  string public symbol;

  uint internal tokenIds;

  bool internal openMintable;

  event lazyMinted(address minter, address buyer, uint tokenId, uint amount);

  constructor(string memory _name, string memory _symbol, string memory uri, bool _openMintable) ERC1155(uri) {
    name = _name;
    symbol = _symbol;
    openMintable = _openMintable;
  }

  modifier onlyAllowed(address sender) {
    if(openMintable == false) {
      require(sender == owner(), "only owner is allowed");
    } 
    _; 
  }

  modifier correctId(uint id) {
    require(id <= tokenIds && id>0, "provide a correct token id");
    _;
  }

  function setURI(string memory uri) external onlyOwner {
    _setURI(uri);
  }

  function mint(uint id, uint amount) external correctId(id) onlyAllowed(msg.sender) {
    require(amount.add(tokens[id].supply) <= tokens[id].maxSupply, "maximum supply reached!");
    _mint(msg.sender, id, amount, "");
    tokens[id].supply = tokens[id].supply.add(amount);
  }

  function lazyMint(address minter, address buyer, uint id, uint amount) external payable onlyAllowed(minter) {
    require(msg.value > 0, "must send some ether");
    require(amount.add(tokens[id].supply) <= tokens[id].maxSupply, "maximum supply reached!");
    _mint(buyer, id, amount, "");
    tokens[id].supply = tokens[id].supply.add(amount);
    emit lazyMinted(minter, buyer, id, amount);
    payable(minter).transfer(msg.value);
  }

  function burn(uint id, uint amount) external correctId(id) {
    _burn(msg.sender, id, amount);
    tokens[id].supply = tokens[id].supply.sub(amount);
  }

  function buyTransfer(address from, address to, uint id, uint amount) external payable correctId(id) {
    require(isApprovedForAll(from, address(this)), "ERC1155: Contract not approved");
    require(amount <= balanceOf(from, id), "insufficient token balance");
    require(msg.value > 0, "must send some ether");
    address(this).call(abi.encodeWithSignature("safeTransferFrom(address,address,uint256,uint256,bytes)", from, to, id,amount,""));
    payable(from).transfer(msg.value);
  }

  function createToken(string memory _uri, uint initialSupply, uint _maxSupply) external onlyOwner {
    require(initialSupply <= _maxSupply, "maximum supply shouldn't be more than initialSupply");
    uint id = tokenIds.add(1);
    tokens[id] = token(msg.sender, _uri, initialSupply, _maxSupply);
    tokenIds = tokenIds.add(1);
    _mint(msg.sender, id, initialSupply, "");
  }

  function updateToken(uint id, string memory _uri, uint _maxSupply) external correctId(id) {
    require(msg.sender == tokens[id].creator, "only the creator can update the token");
    tokens[id] = token(msg.sender, _uri, tokens[id].supply, _maxSupply);
  }

  function getCreator(uint id) public view returns(address) {
    return tokens[id].creator;
  }

  function tokenURI(uint id) public correctId(id) view returns(string memory) {
    return tokens[id].uri;
  }

  function tokenSupply(uint id) public view returns(uint) {
    return tokens[id].supply;
  }

  function tokenMaxSupply(uint id) public view returns(uint) {
    return tokens[id].maxSupply;
  }

  function totalSupply() public view returns(uint) {
    return tokenIds;
  }

  function publicMintable() public view returns(bool) {
    return openMintable;
  }

}
