const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
module.exports = buildModule("CrowdMint", (m) => {
    const CrowdFund = m.contract("CrowdMint");
    return { CrowdFund };
});