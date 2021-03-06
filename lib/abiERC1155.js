const abiERC1155 = [
	{
		inputs: [
			{ internalType: "string", name: "_name", type: "string" },
			{ internalType: "string", name: "_symbol", type: "string" },
			{ internalType: "string", name: "uri", type: "string" },
			{ internalType: "bool", name: "_openMintable", type: "bool" },
			{ internalType: "address", name: "_admin", type: "address" },
			{ internalType: "uint256", name: "_transferCharge", type: "uint256" },
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: "address", name: "account", type: "address" },
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
			{ indexed: true, internalType: "address", name: "operator", type: "address" },
			{ indexed: true, internalType: "address", name: "from", type: "address" },
			{ indexed: true, internalType: "address", name: "to", type: "address" },
			{ indexed: false, internalType: "uint256[]", name: "ids", type: "uint256[]" },
			{ indexed: false, internalType: "uint256[]", name: "values", type: "uint256[]" },
		],
		name: "TransferBatch",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: "address", name: "operator", type: "address" },
			{ indexed: true, internalType: "address", name: "from", type: "address" },
			{ indexed: true, internalType: "address", name: "to", type: "address" },
			{ indexed: false, internalType: "uint256", name: "id", type: "uint256" },
			{ indexed: false, internalType: "uint256", name: "value", type: "uint256" },
		],
		name: "TransferSingle",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: false, internalType: "string", name: "value", type: "string" },
			{ indexed: true, internalType: "uint256", name: "id", type: "uint256" },
		],
		name: "URI",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: false, internalType: "address", name: "minter", type: "address" },
			{ indexed: false, internalType: "address", name: "buyer", type: "address" },
			{ indexed: false, internalType: "uint256", name: "tokenId", type: "uint256" },
			{ indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
		],
		name: "lazyMinted",
		type: "event",
	},
	{ inputs: [], name: "admin", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" },
	{ inputs: [], name: "balance", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
	{
		inputs: [
			{ internalType: "address", name: "account", type: "address" },
			{ internalType: "uint256", name: "id", type: "uint256" },
		],
		name: "balanceOf",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address[]", name: "accounts", type: "address[]" },
			{ internalType: "uint256[]", name: "ids", type: "uint256[]" },
		],
		name: "balanceOfBatch",
		outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "id", type: "uint256" },
			{ internalType: "uint256", name: "amount", type: "uint256" },
		],
		name: "burn",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "from", type: "address" },
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "id", type: "uint256" },
			{ internalType: "uint256", name: "amount", type: "uint256" },
		],
		name: "buyTransfer",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "string", name: "_uri", type: "string" },
			{ internalType: "uint256", name: "initialSupply", type: "uint256" },
			{ internalType: "uint256", name: "_maxSupply", type: "uint256" },
			{ internalType: "uint256", name: "_fee", type: "uint256" },
		],
		name: "createToken",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "account", type: "address" },
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
			{ internalType: "uint256", name: "id", type: "uint256" },
			{ internalType: "uint256", name: "amount", type: "uint256" },
		],
		name: "lazyMint",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "id", type: "uint256" },
			{ internalType: "uint256", name: "amount", type: "uint256" },
		],
		name: "mint",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{ inputs: [], name: "name", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" },
	{ inputs: [], name: "owner", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" },
	{ inputs: [], name: "publicMintable", outputs: [{ internalType: "bool", name: "", type: "bool" }], stateMutability: "view", type: "function" },
	{ inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
	{
		inputs: [
			{ internalType: "address", name: "from", type: "address" },
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256[]", name: "ids", type: "uint256[]" },
			{ internalType: "uint256[]", name: "amounts", type: "uint256[]" },
			{ internalType: "bytes", name: "data", type: "bytes" },
		],
		name: "safeBatchTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "from", type: "address" },
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "id", type: "uint256" },
			{ internalType: "uint256", name: "amount", type: "uint256" },
			{ internalType: "bytes", name: "data", type: "bytes" },
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
	{ inputs: [{ internalType: "string", name: "uri", type: "string" }], name: "setURI", outputs: [], stateMutability: "nonpayable", type: "function" },
	{ inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }], name: "supportsInterface", outputs: [{ internalType: "bool", name: "", type: "bool" }], stateMutability: "view", type: "function" },
	{ inputs: [], name: "symbol", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" },
	{ inputs: [{ internalType: "uint256", name: "id", type: "uint256" }], name: "tokenCreator", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" },
	{ inputs: [{ internalType: "uint256", name: "id", type: "uint256" }], name: "tokenFee", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
	{ inputs: [{ internalType: "uint256", name: "id", type: "uint256" }], name: "tokenMaxSupply", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
	{ inputs: [{ internalType: "uint256", name: "id", type: "uint256" }], name: "tokenSupply", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
	{ inputs: [{ internalType: "uint256", name: "id", type: "uint256" }], name: "tokenURI", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" },
	{ inputs: [], name: "totalSupply", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
	{ inputs: [], name: "transferCharge", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
	{ inputs: [{ internalType: "address", name: "newOwner", type: "address" }], name: "transferOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
	{
		inputs: [
			{ internalType: "uint256", name: "id", type: "uint256" },
			{ internalType: "string", name: "_uri", type: "string" },
			{ internalType: "uint256", name: "_maxSupply", type: "uint256" },
			{ internalType: "uint256", name: "_fee", type: "uint256" },
		],
		name: "updateToken",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{ inputs: [{ internalType: "uint256", name: "", type: "uint256" }], name: "uri", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" },
	{ inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }], name: "withdraw", outputs: [], stateMutability: "nonpayable", type: "function" },
];

export default abiERC1155;
