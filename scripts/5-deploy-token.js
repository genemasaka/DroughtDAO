import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";

(async ()=>{
    try{
        //deploy standard ERC-20 contract
        const tokenAddress = await sdk.deployer.deployToken({
            //token name
            name: "DroughtDAO Governance Token",
            //token symbol
            symbol: "DROUGHT",
            //incase you want to sell the token
            //$DROUGHT will be free hence the AddressZero
            primary_sale_recipient: AddressZero,

        });
        console.log(
            "Succesfully deployed token modeule, address:", tokenAddress
        );
    }catch (error){
        console.error("failed to deploy token module", error);
    }
})();