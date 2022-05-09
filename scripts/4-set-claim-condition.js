import sdk from "./1-initialize-sdk.js";
import { MaxUint256 } from "@ethersproject/constants";

const editionDrop = sdk.getEditionDrop("0x01579667eD189f75Dcb5d129e25c58247653A711");

(async ()=>{
    try {
        const claimConditions = [{
            //when people will start claiming NFTs
            startTime: new Date(),
            //The maximum number of NFTs that can be claimed
            maxQuantity: 10_000,
            //Price of the NFT
            price: 0,
            //Amount of NFTs that can be claimed in a single transcation
            quantityLimitPerTransaction: 1,
            //set the wait between transcations to MaxUint256 to make people only claim once
            waitInSeconds: MaxUint256,

        }]

        await editionDrop.claimConditions.set("0", claimConditions);
        console.log("Succesfully set claim condition!");
    }catch(error){
        console.error("Failed to set claim condition", error);
    }
})();