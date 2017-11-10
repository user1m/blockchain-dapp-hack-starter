pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Customer.sol";

contract TestCustomer {

    Customer customer;

    function beforeEach() public {
        customer = Customer(DeployedAddresses.Customer());
    }

    function testCanGetCustomerJamesFrancoName() public {
        bytes32 fName = "James";
        bytes32 lName = "Franco";
        bytes32 f; bytes32 l;
        (f,l) = customer.getCustomerName(0);
        Assert.equal(f, fName, "Customer First Name should match");
        Assert.equal(l, lName, "Customer Last Name should match");
    }

    function testCanGetCustomerJamesFrancoDOB() public {
        bytes32 expected = "04/19/1978";
        bytes32 actual = customer.getCustomerDOB(0);
        Assert.equal(actual, expected, "Customer DOB should match");
    }

    function testCanGetCustomerJamesFrancoAge() public {
        uint expected = 39;
        uint actual = customer.getCustomerAge(0);
        Assert.equal(actual, expected, "Customer Age should match");
    }

    function testCanGetCustomerJamesFrancoAddress() public {
        bytes32 expected = "Wood Hill Road, Palo Alto, CA";
        bytes32 actual = customer.getCustomerAddress(0);
        Assert.equal(actual, expected, "Customer address should match");
    }

    function testCanGetCustomerMattDamonName() public {
        bytes32 fName = "Matt";
        bytes32 lName = "Damon";
        bytes32 f; bytes32 l;
        (f,l) = customer.getCustomerName(1);
        Assert.equal(f, fName, "Customer First Name should match");
        Assert.equal(l, lName, "Customer Last Name should match");
    }

    function testCanGetCustomerMattDamonDOB() public {
        bytes32 expected = "10/8/1970";
        bytes32 actual = customer.getCustomerDOB(1);
        Assert.equal(actual, expected, "Customer DOB should match");
    }

    function testCanGetCustomerMattDamonAge() public {
        uint expected = 47;
        uint actual = customer.getCustomerAge(1);
        Assert.equal(actual, expected, "Customer Age should match");
    }

    function testCanGetCustomerMattDamonAddress() public {
        bytes32 expected = "4164 Capman Road, Cambridge, MA";
        bytes32 actual = customer.getCustomerAddress(1);
        Assert.equal(actual, expected, "Customer address should match");
    }

    function testCanGetCustomerListCount() public {
        uint expected = 4;
        uint actual = customer.getNumberOfCustomers();
        Assert.equal(actual, expected, "Customer List Count shound match");
    }
}