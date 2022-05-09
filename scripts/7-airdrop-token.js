import sdk from "./1-initialize-sdk.js";

// the address of the ERC-1155 membership NFT contract
const editionDrop = sdk.getEditionDrop("0x01579667eD189f75Dcb5d129e25c58247653A711");

//address to the ERC-20 token contract
const token = sdk.getToken("0x3A2C03491Bc92Bf4c3af88cc50D2fcfe054fB9e2");

(async ()=> {
    try{
        //get all the addresses of members who own membership NFT whic has a tokenId of 0
        const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);

        if (walletAddresses.length === 0) {
            console.log(
                "No NFTs claimed yet."
            );
            process.exit(0);
        }

        const airdropTargets = walletAddresses.map((address) => {
            //picks a random number between 1000 and 10000
            const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000)
            console.log("Airdropping", randomAmount, "tokens to", address);

            //set up the target
            const airdropTarget = {
                toAddress: address,
                amount: randomAmount,
            };
            
            return airdropTarget;
        });

        //call transferBatch on all the airdrop targets
        console.log("Starting airdrop...");
        await token.transferBatch(airdropTargets);
        console.log("Succesfully airdroped tokens to all holders of the NFT");
    } catch (err) {
        console.error("failed to airdrop tokens", err)
    }
})();