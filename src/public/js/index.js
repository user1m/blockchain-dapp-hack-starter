let contractInstance;
let web3Provider = null;
let contracts = {};

init = () => {
    $.getJSON('../customers.json', function (data) {
        for (i = 0; i < data.length; i++) {
            // const i = 0;
            $('#customerRow').append([
                `<tr>`,
                `<td id="c-id-${i+1}">${i+1}</td>`,
                `<td id="c-name-${i+1}">${data[i].fName}</td>`,
                `<td id="c-dob-${i+1}">${data[i].dob}</td>`,
                `<td id="c-age-${i+1}">${data[i].age}</td>`,
                `<td id="c-address-${i+1}">${data[i].address}</td>`,
                `<td><a href="#edit-${i}" class="btn btn-primary btn-block" role="button">Edit</a></td>`,
                `</tr>`
            ].join('\n'));
        }
    });

    return initWeb3();
};

initWeb3 = () => {
    web3Provider = new Web3.providers.HttpProvider('http://localhost:9545');
    web3 = new Web3(web3Provider);
    return initContract();
};

initContract = () => {
    $.getJSON('Customer.json', function (data) {
        // Get the necessary contract artifact file and instantiate it with truffle-contract
        var CustomerArtifact = data;
        contracts.Customer = TruffleContract(CustomerArtifact);

        // Set the provider for our contract
        contracts.Customer.setProvider(web3Provider);

        contracts.Customer.deployed()
            .then(function (instance) {
                contractInstance = instance;
                return true;
            })
            .then((val) => {
                return getNumberOfCustomers();
            });
    });
};

getCustomerData = () => {
    $('#customerRow').html("");
    for (var i = 0; i < contracts.CustomerCount; i++) {
        $('#customerRow').append([
            `<tr>`,
            `<td id="c-id-${i+1}">${i+1}</td>`,
            `<td id="c-name-${i+1}"></td>`,
            `<td id="c-dob-${i+1}"></td>`,
            `<td id="c-age-${i+1}"></td>`,
            `<td id="c-address-${i+1}"></td>`,
            `<td><a href="/edit.html?${i}" class="btn btn-primary btn-block" role="button">Edit</a></td>`,
            `</tr>`
        ].join('\n'));
        getCustomerName(i);
        getCustomerDOB(i);
        getCustomerAge(i);
        getCustomerAddress(i);
    }
};


getNumberOfCustomers = () => {
    contractInstance.getNumberOfCustomers()
        .then((val) => {
            const count = val.valueOf();
            contracts.CustomerCount = count;
            return getCustomerData();
        })
        .catch((err) => {
            console.log("ERROR 0: ", err);
        });
};

getCustomerName = (index) => {
    contractInstance.getCustomerName(index)
        .then((val) => {
            // console.log(val);
            let fname = val[0].toString().replace(/00/g, "");
            let lname = val[1].toString().replace(/00/g, "");
            fname = web3.toAscii(fname);
            lname = web3.toAscii(lname);
            const fullName = fname + " " + lname;
            $(`#c-name-${index+1}`).text(fullName);
        })
        .catch((err) => {
            console.log("ERROR 1: ", err);
        });
};

getCustomerDOB = (index) => {
    contractInstance.getCustomerDOB(index)
        .then((val) => {
            val = val.toString().replace(/00/g, "");
            const dob = web3.toAscii(val);
            $(`#c-dob-${index+1}`).text(dob);
        })
        .catch((err) => {
            console.log("ERROR 2: ", err);
        });
};

getCustomerAge = (index) => {
    contractInstance.getCustomerAge(index)
        .then((val) => {
            $(`#c-age-${index+1}`).text(val.valueOf());
        })
        .catch((err) => {
            console.log("ERROR 3: ", err);
        });
};


getCustomerAddress = (index) => {
    contractInstance.getCustomerAddress(index)
        .then((val) => {
            val = val.toString().replace(/00/g, "");
            const address = web3.toAscii(val);
            $(`#c-address-${index+1}`).text(address);
        })
        .catch((err) => {
            console.log("ERROR 4: ", err);
        });
};

$(function () {
    $(window).load(function () {
        init();
    });
});