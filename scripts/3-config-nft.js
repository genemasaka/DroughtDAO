import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editiondrop = sdk.getEditionDrop("0x01579667eD189f75Dcb5d129e25c58247653A711");

(async ()=>{
    try {
        await editiondrop.createBatch([
            {
                name: "DroughtDAO membership",
                description: "This NFT will give you access to DroughtDAO",
                image: readFileSync("scripts/assets/droughtdao.png"),
            },
        ]);
        console.log("Succesfully created new NFT drop!");
    }catch (error) {
        console.error("failed to create new NFT", error);
    }
})();