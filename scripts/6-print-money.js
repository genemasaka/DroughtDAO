import sdk from "./1-initialize-sdk.js";
//address of the deployed ERC-20 contract
const token = sdk.getToken("0x3A2C03491Bc92Bf4c3af88cc50D2fcfe054fB9e2");

(async ()=>{
    try {
        //setting the max supply
        const amount = 1000000;
        //interacting with deployed ERC-20 contract and minting tokens
        await token.mint(amount);
        const totalSupply = await token.totalSupply();

        //print how mant tokens have been minted
        console.log("There is now", totalSupply.displayValue, "$DROUGHT in circulation")
    }catch(error) {
        console.error("Failed to mint tokens", error);
    }
})();
