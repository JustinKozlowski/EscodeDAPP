Set Up

Step 1. Download and extract code found in the zip file.
Step 2. Install Node.js
    a) Navigate to "https://nodejs.org/en/download/" and follow steps to install in your environment
Step 2. Install Truffle
    a) Navigate to "https://www.trufflesuite.com/docs/truffle/getting-started/installation" and follow steps to install in your environment
Step 3. Install Ganache
    a) Navigate to "https://www.trufflesuite.com/ganache" and follow steps to install in your environment
Step 4. MetaMask
    a) Navigate to "https://metamask.io/download.html" and follow steps to install in your environment
Step 5. Run Ganache
    a) Open Ganache
    b) Select Quickstart
Step 6. Run the contract using truffle
    a) Navigate to the directory of "escode-contract" in a terminal
    b) Run "truffle compile", ensure there are no errors
    c) Run "truffle migrate -reset", the contract should now be deployed
Step 6. Verify contract is deployed
    a) Navigate to Transactions Tab at the top of Ganache
    b) Verify by checking it says "contract creation"
Step 7. Connect MetaMask to Ganache
    a) Open MetaMask extension
    b) Lock account if currently in one
    c) Click "Import using account seed phrase"
    d) Use the phrase shown in Ganache under Accounts
    e) Create a password
    f) Under network drop down at the top of the extension, select "Custom RPC"
    g) Network Name is "Ganache", New RPC URL "http://localhost:7545", Save
    h) You should now see the ganache accounts in MetaMask
Step 7. Deploy on Local Server
    a) Navigate to the directory of "escode-app" in a terminal
    b) run "npm install"
    c) run "node index.js"
    d) Ensure it is runnig by navigating to "http://localhost:3000/"
Step 8. Connect with MetaMask
    a) Open MetaMask, check it is connected to website (http://localhost:3000/), if says not connected, click and connect
    b) MetaMask should pop up, Select all accounts, click Next
    c) Click Connect

Test the Contract and App

For testing we will use 4 accounts from Ganache/MetaMask, these are:

Chairperson:
    MetaMask:   Account 1
    Ganache:    Index 0

Client:
    MetaMask:   Account 2
    Ganache:    Index 1

Freelancer:
    MetaMask:   Account 3
    Ganache:    Index 2

Verifyer:
    MetaMask:   Account 4
    Ganache:    Index 3

We will also use placeholder hashes:
    jobHash:    0x0000000000000000000000000000000000000000000000000000000000000000
    codeHash:   0xecbfa2a4e10b9e6787599114a1701f0255aad4784ee49fd82fee55f792ce2f25
    value:      1
    secret:     1

Now since we have already deployed the contract, Chairperson has already been initialized. So continuing to test a transaction:

Step 1. Create Client Job
    a) From MetaMask, select Account 2
    b) In Payment type 1
    c) In Job description, type anything you want
    d) For Verifier, put Verifier Address
    e) For Job hash, put jobHash
    f) Click Submit
    g) MetaMask will prompt, click Confirm
    g) The page should refresh showing the job
Step 2. Submit Freelance Code
    a) From MetaMask, select Account 3
    b) In the Freelancer section, put the codeHash, and any text file
    c) Click Submit
    d) MetaMask will prompt, click Confirm
Step 3. Verify Submission
    a) From MetaMask, select Account 4
    b) In the Verifier section, fill hash with codeHash
    c) Click Verify
    d) MetaMask will prompt, click Confirm
Step 4. Approve the transaction as Chairperson
    a) From MetaMask, select Account 1
    b) In the Chairperson section, click approve
    c) MetaMask will prompt, click Confirm
Step 5. Close the job
    a) From MetaMask, select Account 2
    b) In the Job Owner section, fill value with 1 and secret with 1.
    c) Click transacted
    d) MetaMask will prompt, click Confirm
    e) The page will then refresh with the job removed

This is a full transaction, and now Account 2 has ~99 ether, and Account 3 has ~101 ether (seen in MetaMask and Ganache).

Explanation of the relevance of Steps

Step 1. Create Client Job
Once a Client creates a Job on the Dapp, a hash of that job will be made and stored on the blockchain for verification of information. The Value submitted is the escrow for the job. Once the job is completed, the escrow will be sent to whoever completed it.

Step 2. Submit Freelance Code
Freelancers submit their code on the Dapp to be verified as completing the job. It is stored with as a hash of the submission, so parties both can ensure there is no tampering along the process, without storing the whole code on the blockchain. 

Step 3. Verify Submission
Once the acting tester of the application tests the code, they verify that it passed, and transact that on the smart contract. This will ideally be an automated server that will execute unit tests on the code to ensure it passes.

Step 4. Approve the transaction as Chairperson
To ensure no illegal transaction of information, or attempted manipulation, the chairperson must approve the final transaction between the two parties. This will be defaulted to always execute, unless notified otherwise. Note the chairperson can only reject a transaction, and thus cannot access the escrow at any point.

Step 5. Close the job
Once the code is received by the client, the client submits a hash of the code, and the Job is deleted. Otherwise, the Job remains open.


Deploy on Infura:

Step 1. Register on Infura
    a) Create Infura Account
    b) Create Project
    c) Ensure set to ropsten endpoint

Step 2. Deploy Contract
    a) Add mneumonic to truffle-config, this account will control the contract (chairperson)
    b) Add Infura endpoint to HDWalletProvider
    c) From terminal, run "truffle migrate --network ropsten"
    d) Record the address of deployed contract

Step 3. Run Server (remote)
    a) Add escode-app to server
    b) Run npm install
    c) Add Infura endpoint to app.js
    d) Add contract address to app.js
    e) run "sudo index.js" from escode-app directory

Step 4. Acces Dapp
    a) Navigate to http://serverIP:3000
    b) Interact with Dapp

Currently running on http://134.122.27.64:3000