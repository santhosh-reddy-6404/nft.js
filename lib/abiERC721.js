const abiERC721 = [
	{
		inputs: [
			{ internalType: "string", name: "name", type: "string" },
			{ internalType: "string", name: "symbol", type: "string" },
			{ internalType: "bool", name: "mintable", type: "bool" },
			{ internalType: "uint256", name: "mSupply", type: "uint256" },
			{ internalType: "address", name: "_admin", type: "address" },
			{ internalType: "uint256", name: "_mintFee", type: "uint256" },
			{ internalType: "uint256", name: "_transferCharge", type: "uint256" },
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: "address", name: "owner", type: "address" },
			{ indexed: true, internalType: "address", name: "approved", type: "address" },
			{ indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
		],
		name: "Approval",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: "address", name: "owner", type: "address" },
			{ indexed: true, internalType: "address", name: "operator", type: "address" },
			{ indexed: false, internalType: "bool", name: "approved", type: "bool" },
		],
		name: "ApprovalForAll",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: "address", name: "previousOwner", type: "address" },
			{ indexed: true, internalType: "address", name: "newOwner", type: "address" },
		],
		name: "OwnershipTransferred",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: "address", name: "from", type: "address" },
			{ indexed: true, internalType: "address", name: "to", type: "address" },
			{ indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
		],
		name: "Transfer",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: false, internalType: "address", name: "minter", type: "address" },
			{ indexed: false, internalType: "address", name: "buyer", type: "address" },
			{ indexed: false, internalType: "uint256", name: "tokenId", type: "uint256" },
		],
		name: "lazyMintedAndTransferred",
		type: "event",
	},
	{ inputs: [], name: "admin", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" },
	{
		inputs: [
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
		],
		name: "approve",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{ inputs: [], name: "balance", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
	{ inputs: [{ internalType: "address", name: "owner", type: "address" }], name: "balanceOf", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
	{ inputs: [{ internalType: "uint256", name: "id", type: "uint256" }], name: "burnNFT", outputs: [], stateMutability: "nonpayable", type: "function" },
	{
		inputs: [
			{ internalType: "address", name: "from", type: "address" },
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "id", type: "uint256" },
		],
		name: "buyTransfer",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{ inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }], name: "getApproved", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" },
	{
		inputs: [
			{ internalType: "address", name: "owner", type: "address" },
			{ internalType: "address", name: "operator", type: "address" },
		],
		name: "isApprovedForAll",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "minter", type: "address" },
			{ internalType: "address", name: "buyer", type: "address" },
			{ internalType: "string", name: "tokenURI", type: "string" },
		],
		name: "lazyMintAndTransfer",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{ inputs: [], name: "maxSupply", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
	{ inputs: [], name: "mintFee", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
	{
		inputs: [
			{ internalType: "address", name: "minter", type: "address" },
			{ internalType: "string", name: "tokenURI", type: "string" },
		],
		name: "mintNFT",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{ inputs: [], name: "name", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" },
	{ inputs: [], name: "owner", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" },
	{ inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }], name: "ownerOf", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" },
	{ inputs: [], name: "publicMintable", outputs: [{ internalType: "bool", name: "", type: "bool" }], stateMutability: "view", type: "function" },
	{ inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
	{
		inputs: [
			{ internalType: "address", name: "from", type: "address" },
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
		],
		name: "safeTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "from", type: "address" },
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
			{ internalType: "bytes", name: "_data", type: "bytes" },
		],
		name: "safeTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "operator", type: "address" },
			{ internalType: "bool", name: "approved", type: "bool" },
		],
		name: "setApprovalForAll",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{ inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }], name: "supportsInterface", outputs: [{ internalType: "bool", name: "", type: "bool" }], stateMutability: "view", type: "function" },
	{ inputs: [], name: "symbol", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" },
	{ inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }], name: "tokenURI", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" },
	{ inputs: [], name: "totalSupply", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
	{ inputs: [], name: "transferCharge", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
	{
		inputs: [
			{ internalType: "address", name: "from", type: "address" },
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
		],
		name: "transferFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{ inputs: [{ internalType: "address", name: "newOwner", type: "address" }], name: "transferOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
	{
		inputs: [
			{ internalType: "uint256", name: "id", type: "uint256" },
			{ internalType: "string", name: "url", type: "string" },
		],
		name: "updateNFT",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{ inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }], name: "withdraw", outputs: [], stateMutability: "nonpayable", type: "function" },
];

export default abiERC721;