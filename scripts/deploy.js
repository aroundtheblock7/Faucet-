const compile = require('./compile.js');
const ethers = require('ethers');
require('dotenv').config();

async function main() {

  //copy-paste your Alchemy HTTP Rinkeby URL
  const url = "https://eth-rinkeby.alchemyapi.io/v2/AUdBlSVN1YUBFne5wBNUxQbrJqHQPEv2";

  let artifacts = compile("Faucet", "Faucet.sol");

   const provider = new ethers.providers.JsonRpcProvider(url);

   let privateKey = process.env.PRIVATE_KEY;

   let wallet = new ethers.Wallet(privateKey, provider);

   // Create an instance of a Faucet Factory
   let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);

   let faucet = await factory.deploy();

   console.log("Faucet address:", faucet.address);

   await faucet.deployed();
 }

 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
 });
