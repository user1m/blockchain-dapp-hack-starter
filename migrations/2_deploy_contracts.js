var Customer = artifacts.require("Customer");

var JamesF = {
    fname: "James",
    lname: "Franco",
    dob: "04/19/1978",
    age: 39,
    address: "Wood Hill Road, Palo Alto, CA"
};
var MattD = {
    fname: "Matt",
    lname: "Damon",
    dob: "10/8/1970",
    age: 47,
    address: "4164 Capman Road, Cambridge, MA"
};
var GeorgeC = {
    fname: "George",
    lname: "Clooney",
    dob: "05/6/1961",
    age: 56,
    address: "8182 Clooney Road, Lexington, KY"
}
var BradP = {
    fname: "Brad",
    lname: "Pitt",
    dob: "12/18/1963",
    age: 53,
    address: "3435 Beverly Hill, Shawnee, OK"
};

module.exports = function (deployer, network, accounts) {

    // console.log(JSON.stringify(network, null, 2));
    // console.log(JSON.stringify(accounts, null, 2));

    deployer.deploy(Customer).then(() => {
        return Customer.deployed();
    }).then((instance) => {
        //seed contract state
        instance.setCustomerData(0, JamesF.fname, JamesF.lname, JamesF.dob, JamesF.age, JamesF.address);
        instance.setCustomerData(1, MattD.fname, MattD.lname, MattD.dob, MattD.age, MattD.address);
        instance.setCustomerData(2, GeorgeC.fname, GeorgeC.lname, GeorgeC.dob, GeorgeC.age, GeorgeC.address);
        instance.setCustomerData(3, BradP.fname, BradP.lname, BradP.dob, BradP.age, BradP.address);
    });
};