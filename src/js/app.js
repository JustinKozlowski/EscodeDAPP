App = {
  web3Provider: null,
  contracts: {},
  names: new Array(),
  url: 'https://ropsten.infura.io/v3/8e622358634749f68e87d6e7942b954c',
  network_id: 3,
  chairPerson: null,
  currentAccount: null,
  address:'0xb1A061deee51250Fd8Ad95842c57DA7B3e9C7be5',
  "abi": [
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "job",
          "type": "address"
        }
      ],
      "name": "Approved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "job",
          "type": "address"
        }
      ],
      "name": "Closed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "job",
          "type": "address"
        }
      ],
      "name": "Deleted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "freelancer",
          "type": "address"
        }
      ],
      "name": "Rejected",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "freelancer",
          "type": "address"
        }
      ],
      "name": "Submitted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "freelancer",
          "type": "address"
        }
      ],
      "name": "Verified",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "chairperson",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "khash",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "verifyer",
          "type": "address"
        }
      ],
      "name": "createJob",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "deleteJob",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "jobAddress",
          "type": "address"
        }
      ],
      "name": "removeJob",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "jobAddress",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "submissionHash",
          "type": "bytes32"
        }
      ],
      "name": "createSubmission",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "jobAddress",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "codeSubmittedHash",
          "type": "bytes32"
        }
      ],
      "name": "verify",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "jobAddress",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "codeSubmittedHash",
          "type": "bytes32"
        }
      ],
      "name": "reject",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "jobAddress",
          "type": "address"
        }
      ],
      "name": "approve",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "secret",
          "type": "bytes32"
        }
      ],
      "name": "transacted",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],

  init: function () {
    console.log("Checkpoint 0");
    return App.initWeb3();
  },

  initWeb3: function () {
    // Is there is an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      console.log('injected web 3');
      App.web3Provider = web3.currentProvider;
      console.log(App.web3Provider);
    } else {
      // If no injected web3 instance is detected, fallback to the TestRPC
      console.log(App.web3Provider);
      App.web3Provider = new Web3.providers.HttpProvider(App.url);
      console.log(App.web3Provider);
    }
    web3 = new Web3(App.web3Provider);
    ethereum.enable();
    //App.populateAddress();
    return App.initContract();
  },

  initContract: function () {
    App.contracts.escode = web3.eth.contract(App.abi).at(App.address);
    // Set the provider for our contract
    //App.contracts.escode.setProvider(App.web3Provider);
    App.currentAccount = web3.eth.coinbase;
    jQuery('#current_account').text(App.currentAccount);
    return

  },

  populateAddress: function () {
    new Web3(new Web3.providers.HttpProvider(App.url)).eth.getAccounts((err, accounts) => {
      jQuery.each(accounts, function (i) {
        if (web3.eth.coinbase != accounts[i]) {
          var optionElement = '<option value="' + accounts[i] + '">' + accounts[i] + '</option';
          jQuery('#enter_address').append(optionElement);
        }
      });
    });
  },

    // Need for contract

    //Handle css changes

  handleCreateJob: function () {
    event.preventDefault();
    var jobValue = $("#job-value").val();
    var jobHash = $("#job-hash").val();
    var jobVerifier = $("#verifier").val();
    
    web3.eth.getAccounts(function (error, accounts) {
      var account = accounts[0];

      App.contracts.escode.createJob(jobHash, jobVerifier, { value: web3.toWei(jobValue, "ether")}, function (result, err) {
        /**/
        console.log(result);
        if (result) {
          toastr["error"]("Error in Job Submitting. Job Submitting Reverted!");
        } else {
          toastr.info("Your Job is Submitted!", "", { "iconClass": 'toast-info notification0' });
          var data = {
            address: account,
            payment: jobValue,
            description: $("#job-description").val(),
            verifier: jobVerifier,
          };
          axios.post('/create-job', data).then(location.reload());
        }
      });
    });
  },

  handleDeleteJob: function () {
    event.preventDefault();
    
    web3.eth.getAccounts(function (error, accounts) {
      var account = accounts[0];

      App.contracts.escode.deleteJob(function (result, err) {
        if (result) {
          console.log(result.receipt.status);
          toastr["error"]("Error in Job Deleting. Job Deleting Reverted!");
        } else {
          axios.get('/deleteJob?address=' + account).then(location.reload());
          toastr.info("Your Job is Deleted!", "", { "iconClass": 'toast-info notification0' });
        }
      })
    });
  },

  handleRemoveJob: function (address) {
    event.preventDefault();
    var jobAddress = address;

    web3.eth.getAccounts(function (error, accounts) {
      var account = accounts[0];

      App.contracts.escode.removeJob(jobAddress, function (result, err) {
        if (result) {
          toastr["error"]("Error in Job Removing. Job Removing Reverted!");
        } else {
          toastr.info("Job is Removed!", "", { "iconClass": 'toast-info notification0' });
          axios.get('/removeJob?address=' + jobAddress).then(location.reload());
        }
      })
    });
  },

  handleCreateSubmission: function (address) {
    event.preventDefault();
    console.log(address);
    var jobAddress = address;
    var submissionHash = $("#submission-hash-" + address).val(); // calc hash here?
    console.log(submissionHash);
    web3.eth.getAccounts(function (error, accounts) {
      var account = accounts[0];

      App.contracts.escode.createSubmission(jobAddress, submissionHash, function (result, err) {
        if (result) {
          toastr["error"]("Error in Code Submission. Code Submission Reverted");
        } else {
          toastr.info("Your Code is Submitted!", "", { "iconClass": 'toast-info notification0' });
          var formData = new FormData();
          var codefile = $('#code-file');
          formData.append("file", codefile.files[0]);
          axios.post('submission-code?address=' + jobAddress, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
          });
        }
      })
    });
  },

  handleVerify: function (address) {
    event.preventDefault();
    var jobAddress = address;
    var submissionHash = $("#verify-hash-" + address).val();

    web3.eth.getAccounts(function (error, accounts) {
      var account = accounts[0];

      App.contracts.escode.verify(jobAddress, submissionHash, function (result, err) {
        if (result) {
          toastr["error"]("Error in Verification. Verification Reverted");
        } else {
          toastr.info("Code is Verified!", "", { "iconClass": 'toast-info notification0' });
        }
      })
    });
  },

  handleReject: function (address) {
    event.preventDefault();
    var jobAddress = address;
    var submissionHash = $("#reject-hash-" + address).val();

    web3.eth.getAccounts(function (error, accounts) {
      var account = accounts[0];

      App.contracts.escode.reject(jobAddress, submissionHash, function (result, err) {
        if (result) {
          toastr["error"]("Error in Rejection. Rejection Reverted");
        } else {
          toastr.info("Code is Rejected!", "", { "iconClass": 'toast-info notification0' });
        }
      })
    });
  },

  handleApprove: function (address) {
    event.preventDefault();
    var jobAddress = address;

    web3.eth.getAccounts(function (error, accounts) {
      var account = accounts[0];

      App.contracts.escode.approve(jobAddress, function (result, err) {
        if (result) {
          toastr["error"]("Error in Approval. Approval Reverted");
        } else {
          toastr.info("Job is Approved!", "", { "iconClass": 'toast-info notification0' });
        }
      })
    });
  },

  handleTransacted: function (address) {
    event.preventDefault();
    var submissionSecret = $("#transacted-secret-" + address).val();
    var submissionValue = $("#transacted-value-" + address).val();

    web3.eth.getAccounts(function (error, accounts) {
      var account = accounts[0];

      App.contracts.escode.transacted(submissionValue, submissionSecret, function (result, err) {
        if (result) {
          toastr["error"]("Error in Transaction. Transaction Reverted");
        } else {
          toastr.info("Job is Transacted!", "", { "iconClass": 'toast-info notification0' });
          axios.get('/deleteJob?address=' + account).then(location.reload());
        }
      })
    });
  },

  //Function to show the notification of auction phases
  showNotification: function (phase) {
    var notificationText = App.biddingPhases[phase];
    $('#phase-notification-text').text(notificationText.text);
    toastr.info(notificationText.text, "", { "iconClass": 'toast-info notification' + String(notificationText.id) });
  }
};

$(function () {
  $(window).load(function () {
    App.init();
    //Notification UI config
    toastr.options = {
      "showDuration": "1000",
      "positionClass": "toast-top-left",
      "preventDuplicates": true,
      "closeButton": true
    };
    //Get jobs to show
    axios.get('/jobs').then(
      function (response){
        
        var jobs = JSON.parse(response.data);
        console.log(jobs);
        Object.entries(jobs).forEach(([key, value])=> {
          var jobAddress = value.address;
          var bounty = value.payment;
          var description = value.description;
          var verifier = value.verifier;
          var element = '<div class="center" style="background-color: white">' +
            '<h3>Job</h3>' +
            '<p>' + 'Address: ' + jobAddress + '</p>' + 
            '<p>' + 'Bounty: ' + bounty + '</p>' + 
            '<p>' + 'Description: ' + description + '</p>' + 
            '<p>' + 'Verifier: ' + verifier + '</p>' + 

            // inputs to make changes to the job
            '<form><label>Job Owner:</label><button onclick="App.handleDeleteJob()">Delete</button></form>' +
            // Freelancer Code submission
            '<form><label>Freelancer:</label><br><input id="submission-hash-' + jobAddress + '"></input>' + 
            '<input class="center" type="file"></input><button onclick="App.handleCreateSubmission('+ "'" + jobAddress + "'" +')">Submit</button></form>' +

            // verifier verify
            '<form><label>Verifier:</label><input id="verify-hash-' + jobAddress + '"></input>' +
            '<button onclick="App.handleVerify('+ "'" + jobAddress + "'" +')">Verify</button></form>' +
            '<form><label>Verifier:</label><input id="reject-hash-' + jobAddress + '"></input>' +
            '<button onclick="App.handleReject('+ "'" + jobAddress + "'" +')">Reject</button></form>' +

            '<form><label>Chairperson:</label><button onclick="App.handleApprove('+ "'" + jobAddress + "'" +')">Approve</button></form>' +
            '<form><label>Chairperson:</label><button onclick="App.handleRemoveJob('+ "'" + jobAddress + "'" +')">Remove</button ></form>' +

            // Job owner Transacted
            '<form><label>Job Owner:</label><input id="transacted-secret-' + jobAddress + '"></input>' +
            '<form><label>Job Owner:</label><input id="transacted-value-' + jobAddress + '"></input>' +
            '<button onclick="App.handleTransacted('+ "'" + jobAddress + "'" +')">Transacted</button></form>' +

          '</div>';
          jQuery('#jobs').append(element);

        });
        
      }
    )
  });
});
