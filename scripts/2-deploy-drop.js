import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async ()=> {
    try{
        const editionDropAddress = await sdk.deployer.deployEditionDrop({
            //collection name
            name: "DroughtDAO Membership",
            //description of collection.
            description: "A DAO that provides relief for African countries affected by drought",
            //image to be held on NFT
            image: readFileSync("scripts/assets/droughtdao.png"),

            //recepient of proceeds from sale of NFTS
            primary_sale_recipient: "0x1e4bc5d8bE386102Ec14453fCD83CFEcc1e5A4C1"
        });

        //initialization returns the address of the contract to be used in initializing it on thirdweb sdk
        const editionDrop = sdk.getEditionDrop(editionDropAddress);

        //gets metadata of contract
        const metadata = await editionDrop.metadata.get();

        console.log(
            "Successfully deployed editionDrop contract, address:", editionDropAddress
        );
        console.log("editionDrop metadata:", metadata);
    }catch(error) {
        console.log("failed to deploy editionDrop contract", error)
    }
})();