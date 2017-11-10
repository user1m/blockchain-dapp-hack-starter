pragma solidity ^0.4.11;

contract Customer {

    struct CustomerData {
        bytes32 fName;
        bytes32 lName;
        bytes32 dob;
        uint age;
        bytes32 customerAddress;
    }

    mapping (uint=> CustomerData) public customers;
    uint8 customerListCount;

    event CustomerDataChanged(address _changer, bytes32 _property);

    /**
    * The below results in: UnimplementedFeatureError: Nested arrays not yet implemented.
    * see function setCustomerData() workaround
    */
    // function Customer(bytes[] data) public {
    //     for (var i = 0; i < data.length; i++) {
    //         customers[i].fName = data[i][0];
    //         customers[i].lName = data[i][1];
    //         customers[i].dob = data[i][2];
    //         customers[i].age = uint(data[i][3]);
    //         customers[i].customerAddress = data[i][4];
    //     }
    // }

    function Customer() {
        customerListCount = 0;
    }

    function getCustomerName(uint _index) constant public returns (bytes32 _fname, bytes32 _lname) {
        return (customers[_index].fName, customers[_index].lName);
    }

    function getCustomerDOB(uint _index) constant public returns (bytes32 _dob) {
        return customers[_index].dob;
    }

    function getCustomerAge(uint _index) constant public returns (uint _age) {
        return customers[_index].age;
    }

    function getCustomerAddress(uint _index) constant public returns (bytes32 _address) {
        return customers[_index].customerAddress;
    }

    function getNumberOfCustomers() constant public returns (uint8 _num) {
        return customerListCount;
    }

    function setCustomerData(uint _index, bytes32 _fName, bytes32 _lName, bytes32 _dob, uint _age, bytes32 _customerAddress) public returns (uint8 _count) {
             //https://ethereum.stackexchange.com/questions/871/what-is-the-zero-empty-or-null-value-of-a-struct
            if (customers[_index].fName == 0) {
                customerListCount += 1;
            }
            setCustomerName(_index, _fName, _lName);
            setCustomerDOB(_index,_dob);
            setCustomerAge(_index,_age);
            setCustomerAddress(_index, _customerAddress);
            CustomerDataChanged(msg.sender, "Customer - All Fields");
            return customerListCount;
    }

    function setCustomerName(uint _index, bytes32 _fname, bytes32 _lname) public returns (bytes32 _fnameVal, bytes32 _lnameVal) {
        customers[_index].fName = _fname;
        customers[_index].lName = _lname;
        return (customers[_index].fName, customers[_index].lName);
    }

    function setCustomerDOB(uint _index, bytes32 _dob) public returns (bytes32 _dobVal) {
        customers[_index].dob = _dob;
        return customers[_index].dob;
    }

    function setCustomerAge(uint _index, uint _age) public returns (uint _ageVal) {
        customers[_index].age = _age;
        return customers[_index].age;
    }

    function setCustomerAddress(uint _index, bytes32 _addr) public returns (bytes32 _address) {
        customers[_index].customerAddress = _addr;
        return customers[_index].customerAddress;
    }

}