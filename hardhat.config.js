require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env.local" });

/** @type import('hardhat/config').HardhatUserConfig */
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
const privateKey = process.env.NEXT_PUBLIC_METAMASK_PRIVATE_KEY;
module.exports = {
    solidity: "0.8.24",
    defaultNetwork: "sepolia",
    networks: {
        hardhat: {},
        sepolia: {
            url: RPC_URL,
            accounts: [privateKey],
        },
    },
};