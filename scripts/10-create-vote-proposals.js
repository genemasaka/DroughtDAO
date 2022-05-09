import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";

//the governance contract
const vote = sdk.getVote("0xA69795Cf4d395E519E160C581478b5D6A54FCD6D");
//the ERC-20 contract
const token = sdk.getToken("0x3A2C03491Bc92Bf4c3af88cc50D2fcfe054fB9e2");

(async () => {
    try{
        //create proposal to mint 600000 new tiken to the treasury
        const amount = 600_000;
        const description = "Should the DAO mint n additional " + amount + " tokens into the treasury";
        const executions  = [
            {
                //the token contract that actually executes the mint
                toAddress: token.getAddress(),
                // native token is ETH. nativeTokenValue is the amount of ETH we want
                //to send in the proposal. In this case we're sending 0ETH
                //we're just minting new tokens to the treasury. so set to 0
                nativeTokenValue: 0,

                transactionData: token.encoder.encode(
                    "mintTo", [
                        vote.getAddress(),
                        ethers.utils.parseUnits(amount.toString(), 18),
                    ]
                ),
            }
        ];

        await vote.propose(description, executions);

        console.log("Successfully created proposal to mkint tokens");
    }catch(error) {
        console.error("failed to create first proposal", error);
    }

    try{
        //create proposal to transfer ourselves 33000 tokens for valuable contributions made to the DAO
        const amount = 33_000;
        const description = "Should the DAO transfer " + amount  + " tokens from the treasury to "
        + process.env.WALLET_ADDRESS+ " for valuable cotributions made to the DAO?";
        const executions = [
            {
                //we're sending ourselves 0 ETH. jus sending our own token
                nativeTokenValue: 0,
                transactionData: token.encoder.encode(
                    //doing a transfer from the treasury to our wallet
                    "transfer",
                    [
                        process.env.WALLET_ADDRESS,
                        ethers.utils.parseUnits(amount.toString(), 18),
                    ]
                ),
                toAddress: token.getAddress(),
            }
        ];

        await vote.propose(description, executions);

        console.log(
            "successfully created proposal to reward ourselves from the treasury"
        );
    }catch(error) {
        console.error("failed to create second proposal", error);
    }
})();
