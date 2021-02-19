const Escode = artifacts.require("Escode");

module.exports = function (deployer) {
  deployer.deploy(Escode);
};
