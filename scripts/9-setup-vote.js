import sdk from "./1-initialize-sdk.js";

//the governance contract address
const vote = sdk.getVote("0xA69795Cf4d395E519E160C581478b5D6A54FCD6D");

//erc-20 contract address
 const token = sdk.getToken("0x3A2C03491Bc92Bf4c3af88cc50D2fcfe054fB9e2");

 (async () => {
     try{
         await token.roles.grant("minter", vote.getAddress());

         console.log(
             "Successfully gave vote contract permission to act on token contract"
         );
     }catch (error) {
         console.error("failed to grant vote contract permission on token contract", error);
         process.exit(1);
     }

     try {
         //grab your wallet token balance 
         const ownedTokenBalance = await token.balanceOf(process.env.WALLET_ADDRESS);

         //grab 60% of supply that you hold
         const ownedAmount = ownedTokenBalance.displayValue;
         const percent60 = Number(ownedAmount)/100 * 60;

         //transfer 60% of the supply to the voting contract
         await token.transfer(
             vote.getAddress(), percent60
         );

         console.log("Successfully transferred" + percent60 + "tokens to vote contract");
     }catch(err) {
         console.error("failed to transfer tokens to vote contract", err)
     }
 })();