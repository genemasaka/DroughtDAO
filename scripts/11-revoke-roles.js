import sdk from "./1-initialize-sdk.js";

const token = sdk.getToken("0x3A2C03491Bc92Bf4c3af88cc50D2fcfe054fB9e2");

(async () => {
    try {
        //log the current roles
        const allRoles = await token.roles.getAll();

        console.log("Roles that exist at the moment", allRoles);

        //revoke all the power your wallet had over the ERC_20 contract
        await token.roles.setAll({admin: [], minter: []});
        console.log(
            "Roles after revoking ourselves",
            await token.roles.getAll()
        );
        console.log("Successfully revoked our power from the ERC-20 contract")
    } catch(error) {
        console.error("failed to revoke ourseleves from the DAO treassury", error);
    }
})();