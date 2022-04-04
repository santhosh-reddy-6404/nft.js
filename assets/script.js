// Moralis setup...
const serverUrl = "https://ov0zft8bmuyj.usemoralis.com:2053/server";
const appId = "D6k8tZGdwfnssgTFi33EKvORsT7m8V7vfsHP82nl";
Moralis.start({ serverUrl, appId });

// RPC speedy-nodes & Web3...
const NODE_URL = "https://speedy-nodes-nyc.moralis.io/dd08b911fb86268af02f8642/eth/rinkeby";
const provider = new Web3.providers.HttpProvider(NODE_URL);
const web3 = new Web3(provider);

// Pre-Loader...

document.onreadystatechange = function() {
if (document.readyState !== "complete") {
document.querySelector(
"body").style.visibility = "hidden";
document.querySelector(
"#loader").style.visibility ="visible";
} else {
document.querySelector(
"#loader").style.display = "none";
document.querySelector(
"body").style.visibility = "visible";
}}
