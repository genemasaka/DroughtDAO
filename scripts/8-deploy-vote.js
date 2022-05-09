import sdk from "./1-initialize-sdk.js";

(async () => {
    try{
    const voteContractAddress = await sdk.deployer.deployVote({
        //name the governance contract
        name: "DroughtDAO",

        //location of the governance token($DROUGHT)
        voting_token_address: "0x3A2C03491Bc92Bf4c3af88cc50D2fcfe054fB9e2",
        //how soon can members start voting on a proposal that's just been created
        voting_delay_in_blocks: 0,
        //how long to members have to vote on a proposal 
        // 6570 blocks === 1day
        voting_period_in_blocks: 6570,
        //minimum % of total supply that need to vote for proposal 
        //to be valid after voting period elapses
        voting_quorum_fraction: 0,
        //minimum number of tokens a user needs to create a proposal
        proposal_token_threshold: 0,
    });

    console.log("Successfully deployed vote contract, address:", voteContractAddress);
    }catch (err) {
        console.error("failed to deploy vote contract", err);
    }
})();