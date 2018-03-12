var MultiSigFactory = artifacts.require("./MultiSigFactory.sol");


module.exports = function(deployer) {
  deployer.deploy(MultiSigFactory);
};
