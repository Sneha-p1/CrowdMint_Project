// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.27",
// };




require("@nomicfoundation/hardhat-toolbox")
// require('dotenv').config()
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "infurahol",
  networks: {
    localhost: {
      url:"http://127.0.0.1:8545/"
    },
    infurahol: {
      url: "https://sepolia.infura.io/v3/d9c402d758404d1194e5b55729408396",
      accounts:["Private Key"]
    },
  },
  solidity: "0.8.20",
};
