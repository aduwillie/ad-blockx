const BlockXHealth = artifacts.require("./BlockXHealth.sol");

module.exports = function(deployer) {
  deployer.deploy(BlockXHealth);
};
