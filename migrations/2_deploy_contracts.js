var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var HospitalVisit = artifacts.require("./HospitalVisit.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(HospitalVisit);
};
