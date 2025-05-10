
const { ethers } = require("ethers");
const tokenAbi = require("../abi/YouTubeTokenABI.json");
const admin = require("firebase-admin");
const firestore = admin.firestore();

const provider = new ethers.JsonRpcProvider(process.env.WEB3_PROVIDER);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const token = new ethers.Contract(process.env.CONTRACT_ADDRESS, tokenAbi, signer);

async function verifyYouTubeSub(googleToken) {
  // Placeholder - logic using googleToken + your API backend
  return true;
}

async function airdropTokens(wallet) {
  const claimed = await firestore.collection("claims").doc(wallet).get();
  if (claimed.exists) throw new Error("Already claimed");

  const tx = await token.mint(wallet, ethers.parseUnits("250", 18), "0x");
  await tx.wait();

  await firestore.collection("claims").doc(wallet).set({
    wallet,
    timestamp: Date.now()
  });
}

module.exports = { verifyYouTubeSub, airdropTokens };
