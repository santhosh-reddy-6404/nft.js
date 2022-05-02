// imports
import "https://unpkg.com/moralis/dist/moralis.js";
import Web3 from "https://cdn.esm.sh/v58/web3@1.6.1/es2021/web3.js";

import abiERC1155 from "/lib/abiERC1155";
import abiERC721 from "/lib/abiERC721";
import bytecodes from "/lib/bytecodes";

// deployed contracts...
var NFTJSdeployed;

// Web3 and user...
var web3xxx;
var userxxx;

var NODE_URLXXX = "https://speedy-nodes-nyc.moralis.io/dd08b911fb86268af02f8642/eth/rinkeby";
var providerxxx = new Web3.providers.HttpProvider(NODE_URLXXX);
web3xxx = new Web3(providerxxx);

// Moralis setup...
const serverUrl = "https://ov0zft8bmuyj.usemoralis.com:2053/server";
const appId = "D6k8tZGdwfnssgTFi33EKvORsT7m8V7vfsHP82nl";

const NFTJS = {
	start: function (network, user) {
		NODE_URLXXX = "https://speedy-nodes-nyc.moralis.io/dd08b911fb86268af02f8642/" + network.toLowerCase();
		providerxxx = new Web3.providers.HttpProvider(NODE_URLXXX);
		web3xxx = new Web3(providerxxx);
		userxxx = user;
	},

	deployed: function () {
		return NFTJSdeployed;
	},

	ERC1155: function (addr) {
		// upload metadata to IPFS
		var data;
		async function uploadFiles() {
			Moralis.start({ serverUrl, appId });
			for (var i = 0; i < Object.keys(data).length; i++) {
				if (Object.values(data)[i].type && Object.values(data)[i].lastModified) {
					const a = new Moralis.File(Object.values(data)[i].name, Object.values(data)[i]);
					await a.saveIPFS().then(() => {
						data[Object.keys(data)[i]] = "https://ipfs.io/ipfs/" + a.hash();
					});
				}
			}
		}

		// set contract of the collection...
		var contract = new web3xxx.eth.Contract(abiERC1155, addr);

		// set URI of the contract...
		this.setURI = async function (metadata) {
			data = metadata;
			await uploadFiles();
			const a = new Moralis.File("i.json", {
				base64: btoa(JSON.stringify(data)),
			});
			a.saveIPFS().then(async () => {
				var url = "https://ipfs.io/ipfs/" + a.hash();
				await window.ethereum.request({ method: "eth_requestAccounts" });
				await window.ethereum.request({
					method: "eth_sendTransaction",
					params: [
						{
							from: userxxx,
							to: contract._address,
							data: contract.methods.setURI(url).encodeABI(),
						},
					],
				});
			});
		};

		// create a token...
		this.createNFT = async function (initialSupply, maxSupply, fee, metadata) {
			fee = web3xxx.utils.toWei(fee.toString(), "ether");
			data = metadata;
			await uploadFiles();
			const a = new Moralis.File("i.json", {
				base64: btoa(JSON.stringify(data)),
			});
			a.saveIPFS().then(async () => {
				var url = "https://ipfs.io/ipfs/" + a.hash();
				await window.ethereum.request({ method: "eth_requestAccounts" });
				await window.ethereum.request({
					method: "eth_sendTransaction",
					params: [
						{
							from: userxxx,
							to: contract._address,
							data: contract.methods.createToken(url, initialSupply, maxSupply, fee).encodeABI(),
						},
					],
				});
			});
		};

		// update uri / maxSupply of a token...
		this.updateNFT = async function (id, maxSupply, fee, metadata) {
			fee = web3xxx.utils.toWei(fee.toString(), "ether");
			data = metadata;
			await uploadFiles();
			const a = new Moralis.File("i.json", {
				base64: btoa(JSON.stringify(data)),
			});
			a.saveIPFS().then(async () => {
				var url = "https://ipfs.io/ipfs/" + a.hash();
				await window.ethereum.request({ method: "eth_requestAccounts" });
				await window.ethereum.request({
					method: "eth_sendTransaction",
					params: [
						{
							from: userxxx,
							to: contract._address,
							data: contract.methods.updateToken(id, url, maxSupply, fee).encodeABI(),
						},
					],
				});
			});
		};

		// mint tokens...
		this.mint = async function (id, amount) {
			var price = await contract.methods.tokenFee(id).call();
			price = price * amount;
			await window.ethereum.request({ method: "eth_requestAccounts" });
			await window.ethereum.request({
				method: "eth_sendTransaction",
				params: [
					{
						from: userxxx,
						to: contract._address,
						value: web3xxx.utils.toHex(price),
						data: contract.methods.mint(id, amount).encodeABI(),
					},
				],
			});
		};

		// implement lazyMinting...
		this.lazyMint = async function (minter, id, amount, price) {
			const wei = web3xxx.utils.toWei((price * amount).toString(), "ether");
			await window.ethereum.request({ method: "eth_requestAccounts" });
			await window.ethereum.request({
				method: "eth_sendTransaction",
				params: [
					{
						from: userxxx,
						to: contract._address,
						value: web3xxx.utils.toHex(wei),
						data: contract.methods.lazyMint(minter, userxxx, id, amount).encodeABI(),
					},
				],
			});
		};

		// burn the tokens of the user...
		this.burn = async function (id, amount) {
			await window.ethereum.request({ method: "eth_requestAccounts" });
			await window.ethereum.request({
				method: "eth_sendTransaction",
				params: [
					{
						from: userxxx,
						to: contract._address,
						data: contract.methods.burn(id, amount).encodeABI(),
					},
				],
			});
		};

		// give/revoke approval to the contract...
		this.setApprovalForAll = async function (bool) {
			await window.ethereum.request({ method: "eth_requestAccounts" });
			var a = true;
			if (bool.toLowerCase() == "true") {
				a = true;
			} else if (bool.toLowerCase() == "false") {
				a = false;
			}
			await window.ethereum.request({
				method: "eth_sendTransaction",
				params: [
					{
						from: userxxx,
						to: contract._address,
						data: contract.methods.setApprovalForAll(contract._address, a).encodeABI(),
					},
				],
			});
		};

		// to transfer tokens from the user...
		this.transfer = async function (to, id, amount) {
			await window.ethereum.request({ method: "eth_requestAccounts" });
			await window.ethereum.request({
				method: "eth_sendTransaction",
				params: [
					{
						from: userxxx,
						to: contract._address,
						data: contract.methods.safeTransferFrom(userxxx, to, id, amount, "").encodeABI(),
					},
				],
			});
		};

		// to make a purchase of tokens...
		this.buyTransfer = async function (from, to, id, amount, price) {
			const wei = web3xxx.utils.toWei((price * amount).toString(), "ether");
			await window.ethereum.request({ method: "eth_requestAccounts" });
			await window.ethereum.request({
				method: "eth_sendTransaction",
				params: [
					{
						from: userxxx,
						to: contract._address,
						value: web3xxx.utils.toHex(wei),
						data: contract.methods.buyTransfer(from, to, id, amount).encodeABI(),
					},
				],
			});
		};

		// transferFrom tokens...
		this.transferFrom = async function (from, to, id, amount) {
			await window.ethereum.request({ method: "eth_requestAccounts" });
			await window.ethereum.request({
				method: "eth_sendTransaction",
				params: [
					{
						from: userxxx,
						to: contract._address,
						data: contract.methods.safeTransferFrom(from, to, id, amount, "").encodeABI(),
					},
				],
			});
		};

		// withdrwa eth
		this.withdraw = async function (amount) {
			await window.ethereum.request({ method: "eth_requestAccounts" });
			await window.ethereum.request({
				method: "eth_sendTransaction",
				params: [
					{
						from: userxxx,
						to: contract._address,
						data: contract.methods.withdraw(amount).encodeABI(),
					},
				],
			});
		};

		// collection data...
		this.collectionDetails = async function () {
			var e = {
				owner: await contract.methods.owner().call(),
				admin: await contract.methods.admin().call(),
				name: await contract.methods.name().call(),
				symbol: await contract.methods.symbol().call(),
				uri: await contract.methods.uri(0).call(),
				publicMintable: await contract.methods.publicMintable().call(),
				totalSupply: await contract.methods.totalSupply().call(),
				transferCharge: await contract.methods.transferCharge().call(),
			};
			return e;
		};

		// token data...
		this.tokenDetails = async function (id) {
			var e = {
				creator: await contract.methods.tokenCreator(id).call(),
				uri: await contract.methods.tokenURI(id).call(),
				totalSupply: await contract.methods.tokenSupply(id).call(),
				maxSupply: await contract.methods.tokenMaxSupply(id).call(),
				fee: await contract.methods.tokenFee(id).call(),
			};
			return e;
		};

		// is approvedForAll...
		this.isApprovedForAll = async function (user) {
			return await contract.methods.isApprovedForAll(user, contract._address).call();
		};

		// balanceOf a user...
		this.balanceOf = async function (user, id) {
			return await contract.methods.balanceOf(user, id).call();
		};

		// balance of contract...
		this.balance = async function () {
			return await contract.methods.balance().call();
		};
	},

	createERC1155: async function (name, symbol, mintable, admin, transferCharge, data) {
		var a = false;
		if (mintable.toLowerCase() == "true") {
			a = true;
		} else if (mintable.toLowerCase() == "false") {
			a = false;
		}

		// upload metadata to IPFS
		var uri;
		async function uploadFiles() {
			Moralis.start({ serverUrl, appId });
			for (var i = 0; i < Object.keys(data).length; i++) {
				if (Object.values(data)[i].type && Object.values(data)[i].lastModified) {
					const a = new Moralis.File(Object.values(data)[i].name, Object.values(data)[i]);
					await a.saveIPFS().then(() => {
						data[Object.keys(data)[i]] = "https://ipfs.io/ipfs/" + a.hash();
					});
				}
			}
		}
		await uploadFiles();
		const g = new Moralis.File("i.json", {
			base64: btoa(JSON.stringify(data)),
		});
		await g.saveIPFS().then(async () => {
			uri = "https://ipfs.io/ipfs/" + g.hash();
		});

		await window.ethereum.request({ method: "eth_requestAccounts" });

		var nftContract = new web3xxx.eth.Contract(abiERC1155);
		const nft = nftContract.deploy({
			data: bytecodes.ERC1155,
			arguments: [name, symbol, uri, a, admin, transferCharge],
		});
		await window.ethereum
			.request({
				method: "eth_sendTransaction",
				params: [
					{
						from: userxxx,
						data: nft.encodeABI(),
					},
				],
			})
			.then((e) => {
				setTimeout(async () => {
					var tx = await web3xxx.eth.getTransactionReceipt(e);
					NFTJSdeployed = tx.contractAddress;
				}, 10000);
			});
	},

	ERC721: function (addr) {
		// Moralis setup...
		/* Update your Moralis Server Details here */
		const serverUrl = "https://ov0zft8bmuyj.usemoralis.com:2053/server";
		const appId = "D6k8tZGdwfnssgTFi33EKvORsT7m8V7vfsHP82nl";

		var data;
		async function uploadFiles() {
			Moralis.start({ serverUrl, appId });
			for (var i = 0; i < Object.keys(data).length; i++) {
				if (Object.values(data)[i].type && Object.values(data)[i].lastModified) {
					const a = new Moralis.File(Object.values(data)[i].name, Object.values(data)[i]);
					await a.saveIPFS().then(() => {
						data[Object.keys(data)[i]] = "https://ipfs.io/ipfs/" + a.hash();
					});
				}
			}
		}

		// set contract of the collection...
		var contract = new web3xxx.eth.Contract(abiERC721, addr);

		// mint an nft to a contract from a user...
		this.mintNFT = async function (minter, metadata) {
			const price = await contract.methods.mintFee().call();
			data = metadata;
			await uploadFiles();
			const a = new Moralis.File("i.json", {
				base64: btoa(JSON.stringify(data)),
			});
			a.saveIPFS().then(async () => {
				var url = "https://ipfs.io/ipfs/" + a.hash();
				await window.ethereum.request({ method: "eth_requestAccounts" });
				await window.ethereum.request({
					method: "eth_sendTransaction",
					params: [
						{
							from: userxxx,
							to: contract._address,
							value: web3xxx.utils.toHex(price),
							data: contract.methods.mintNFT(minter, url).encodeABI(),
						},
					],
				});
			});
		};

		// lazy mint and transfer...
		this.lazyMintNFT = async function (minter, price, metadata) {
			data = metadata;
			const wei = web3xxx.utils.toWei(price.toString(), "ether");
			await uploadFiles();
			const a = new Moralis.File("i.json", {
				base64: btoa(JSON.stringify(data)),
			});
			a.saveIPFS().then(async () => {
				var url = "https://ipfs.io/ipfs/" + a.hash();
				await window.ethereum.request({ method: "eth_requestAccounts" });
				await window.ethereum.request({
					method: "eth_sendTransaction",
					params: [
						{
							from: userxxx,
							to: contract._address,
							value: web3xxx.utils.toHex(wei),
							data: contract.methods.lazyMintAndTransfer(minter, userxxx, url).encodeABI(),
						},
					],
				});
			});
		};

		// update NFT metadata...
		this.updateNFT = async function (id, metadata) {
			data = metadata;
			await uploadFiles();
			const a = new Moralis.File("i.json", {
				base64: btoa(JSON.stringify(data)),
			});
			a.saveIPFS().then(async () => {
				var url = "https://ipfs.io/ipfs/" + a.hash();
				await window.ethereum.request({ method: "eth_requestAccounts" });
				await window.ethereum.request({
					method: "eth_sendTransaction",
					params: [
						{
							from: userxxx,
							to: contract._address,
							data: contract.methods.updateNFT(id, url).encodeABI(),
						},
					],
				});
			});
		};

		// burn NFT...
		this.burnNFT = async function (id) {
			await window.ethereum.request({ method: "eth_requestAccounts" });
			await window.ethereum.request({
				method: "eth_sendTransaction",
				params: [
					{
						from: userxxx,
						to: contract._address,
						data: contract.methods.burnNFT(id).encodeABI(),
					},
				],
			});
		};

		// approve transfers by ERC721
		this.approve = async function (id) {
			await window.ethereum.request({ method: "eth_requestAccounts" });
			await window.ethereum.request({
				method: "eth_sendTransaction",
				params: [
					{
						from: userxxx,
						to: contract._address,
						data: contract.methods.approve(contract._address, id).encodeABI(),
					},
				],
			});
		};

		// setApprovalForAll to the contract...
		this.setApprovalForAll = async function (bool) {
			await window.ethereum.request({ method: "eth_requestAccounts" });
			var a = true;
			if (bool.toLowerCase() == "true") {
				a = true;
			} else if (bool.toLowerCase() == "false") {
				a = false;
			}
			await window.ethereum.request({
				method: "eth_sendTransaction",
				params: [
					{
						from: userxxx,
						to: contract._address,
						data: contract.methods.setApprovalForAll(contract._address, a).encodeABI(),
					},
				],
			});
		};

		// buyTransfer tokens...
		this.buyTransfer = async function (from, to, price, id) {
			const wei = web3xxx.utils.toWei(price.toString(), "ether");
			await window.ethereum.request({ method: "eth_requestAccounts" });
			await window.ethereum.request({
				method: "eth_sendTransaction",
				params: [
					{
						from: userxxx,
						to: contract._address,
						value: web3xxx.utils.toHex(wei),
						data: contract.methods.buyTransfer(from, to, id).encodeABI(),
					},
				],
			});
		};

		// transfer tokens...
		this.transfer = async function (to, id) {
			await window.ethereum.request({ method: "eth_requestAccounts" });
			await window.ethereum.request({
				method: "eth_sendTransaction",
				params: [
					{
						from: userxxx,
						to: contract._address,
						data: contract.methods.safeTransferFrom(userxxx, to, id).encodeABI(),
					},
				],
			});
		};

		// transferFrom tokens...
		this.transferFrom = async function (from, to, id) {
			await window.ethereum.request({ method: "eth_requestAccounts" });
			await window.ethereum.request({
				method: "eth_sendTransaction",
				params: [
					{
						from: userxxx,
						to: contract._address,
						data: contract.methods.safeTransferFrom(from, to, id).encodeABI(),
					},
				],
			});
		};

		// withdrwa eth
		this.withdraw = async function (amount) {
			await window.ethereum.request({ method: "eth_requestAccounts" });
			await window.ethereum.request({
				method: "eth_sendTransaction",
				params: [
					{
						from: userxxx,
						to: contract._address,
						data: contract.methods.withdraw(amount).encodeABI(),
					},
				],
			});
		};

		// collection data...
		this.details = async function () {
			var e = {
				name: await contract.methods.name().call(),
				symbol: await contract.methods.symbol().call(),
				owner: await contract.methods.owner().call(),
				admin: await contract.methods.admin().call(),
				totalSupply: await contract.methods.totalSupply().call(),
				maxSupply: await contract.methods.maxSupply().call(),
				publicMintable: await contract.methods.publicMintable().call(),
				mintFee: await contract.methods.mintFee().call(),
				transferCharge: await contract.methods.transferCharge().call(),
			};
			return e;
		};

		// is approved...
		this.getApproved = async function (id) {
			return await contract.methods.getApproved(id).call();
		};

		// is approvedForAll...
		this.isApprovedForAll = async function (address) {
			return await contract.methods.isApprovedForAll(address, contract._address).call();
		};

		// ownerOf a token...
		this.ownerOf = async function (id) {
			return await contract.methods.ownerOf(id).call();
		};

		// balanceOf a user...
		this.balanceOf = async function (e) {
			return await contract.methods.balanceOf(e).call();
		};

		// tokenURI of a token...
		this.tokenURI = async function (id) {
			return await contract.methods.tokenURI(id).call();
		};

		// balance of contract...
		this.balance = async function () {
			return await contract.methods.balance().call();
		};
	},

	createERC721: async function (name, symbol, mintable, mSupply, admin, mintFee, transferCharge) {
		mintFee = web3xxx.utils.toWei(mintFee.toString(), "ether");

		var a = false;
		if (mintable.toLowerCase() == "true") {
			a = true;
		} else if (mintable.toLowerCase() == "false") {
			a = false;
		}

		await window.ethereum.request({ method: "eth_requestAccounts" });

		var nftContract = new web3xxx.eth.Contract(abiERC721);
		const nft = nftContract.deploy({
			data: bytecodes.ERC721,
			arguments: [name, symbol, a, mSupply, admin, mintFee, transferCharge],
		});
		await window.ethereum
			.request({
				method: "eth_sendTransaction",
				params: [
					{
						from: userxxx,
						data: nft.encodeABI(),
					},
				],
			})
			.then((e) => {
				setTimeout(async () => {
					var tx = await web3xxx.eth.getTransactionReceipt(e);
					NFTJSdeployed = tx.contractAddress;
				}, 10000);
			});
	},
};

export default NFTJS;
