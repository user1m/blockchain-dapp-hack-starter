let contractInstance;
let web3Provider = null;
let contracts = {};
var id;

registerEventListener = () => {
    console.log("here1");
    contractInstance.CustomerDataChanged()
        .watch((err, response) => {
            if (!err) {
                const prop = response.args._property.toString().replace(/00/g, "");
                const msg = web3.toAscii(prop);
                $(".alert").html(
                    `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <button type="button" id="close" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                   Customer Contract Event Triggered: <strong>${msg} </strong>.
                  </div>`
                );
            }
        });
};


function closeAlert(time) {
    setTimeout(() => {
        $("#close").click();
    }, time);
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
            }).then(() => {
                getCustomerData();
            })
            .then((val) => {
                registerEventListener();
            });
    });
};

getCustomerData = () => {
    $('#customerRow').html("");
    id = document.location.search.slice(1);
    $('#customerRow').append([
        `<tr>`,
        `<td> First Name</td>`,
        `<td id="c-fname"></td>`,
        `<td> <input id="c-fname-input" type="text"></td>`,
        `</tr>`,
        `<tr>`,
        `<td>Last Name</td>`,
        `<td id="c-lname"></td>`,
        `<td> <input id="c-lname-input" type="text"></td>`,
        `</tr>`,
        `<tr>`,
        `<td> DOB </td>`,
        `<td id="c-dob"></td>`,
        `<td> <input id="c-dob-input" type="text"></td>`,
        `</tr>`,
        `<tr>`,
        `<td>Age</td>`,
        `<td id="c-age"></td>`,
        `<td> <input id="c-age-input" type="text"></td>`,
        `</tr>`,
        `<tr>`,
        `<td>Address</td>`,
        `<td id="c-address"></td>`,
        `<td> <input id="c-address-input" type="text"></td>`,
        `</tr>`,
    ].join('\n'));
    getCustomerName(id);
    getCustomerDOB(id);
    getCustomerAge(id);
    getCustomerAddress(id);
};


getNumberOfCustomers = () => {
    contractInstance.getNumberOfCustomers()
        .then((val) => {
            contracts.CustomerCount = val.valueOf();
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

            $(`#c-fname`).text(fname);
            $(`#c-lname`).text(lname);

            $("#c-fname-input").val(fname);
            $("#c-lname-input").val(lname);

            $(`.customerName`).text(fname + " " + lname);
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
            $(`#c-dob`).text(dob);
            $("#c-dob-input").val(dob);
        })
        .catch((err) => {
            console.log("ERROR 2: ", err);
        });
};

getCustomerAge = (index) => {
    contractInstance.getCustomerAge(index)
        .then((val) => {
            const age = val.valueOf();
            $(`#c-age`).text(age);
            $("#c-age-input").val(age);
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
            $(`#c-address`).text(address);
            $("#c-address-input").val(address)
        })
        .catch((err) => {
            console.log("ERROR 4: ", err);
        });
};


submit = () => {
    var fname = $("#c-fname-input").val();
    var lname = $("#c-lname-input").val();
    var dob = $("#c-dob-input").val();
    var age = $("#c-age-input").val();
    var address = $("#c-address-input").val();
    //trigger event
    console.log("here");
    contractInstance.setCustomerData(id, fname, lname, dob, age, address, {
        from: web3.eth.accounts[0]
    }).then(() => {
        getCustomerData();
    });

    closeAlert(3000);
}

closeAlert(1000);

$(function () {
    $(window).load(function () {
        initWeb3();
    });
});