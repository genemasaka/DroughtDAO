import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import ethers from "ethers";

//Import and config .env file
import dotenv from "dotenv";
dotenv.config();

//checks to make sure .env is working
if(!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY === "") {
    console.log("Private Key is missing");
}

if (!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL===""){
    console.log("Alchemy API URL not found");
}

if(!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS === "") {
    console.log("Wallet Address not found");
}

//RPC URL using the Alchemy API URL form .env file
const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_URL);
// wallet private key from .env file

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const sdk = new ThirdwebSDK(wallet);

(async ()=> {
    try{
        const address = await sdk.getSigner().getAddress();
        console.log("SDK initialized by address:", address);
    }catch (err){
        console.error("Failed to get apps from the sdk", err);
        process.exit(1)
    }
})();

//exporting thirdWeb SDK to be used in other scripts.
export default sdk;