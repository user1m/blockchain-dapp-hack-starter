module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    develop: {
      host: "localhost",
      port: 9545,
      gas: 6712390,
      network_id: "*" // Match any network id
    }
  }
};