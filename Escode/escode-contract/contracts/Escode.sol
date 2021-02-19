pragma solidity >=0.4.22 <=0.6.0;

contract Escode {

    struct Job {
        bytes32 jobHash;
        address verifyer;
        uint bounty;
        Submission submission;
        State currentState;
    }
    
    struct Submission{
        bytes32 codeHash;
        address payable freelancer;
    }

    //States for Jobs
    enum State {Created, Submitted, Verified, Approved, Transacted}  
    
    mapping(address=>Job) Jobs;

    address payable public chairperson;
    
    
    //modifiers
    modifier validState(address job, State reqState) 
    { require(Jobs[job].currentState == reqState); 
       _; 
    } 

    modifier onlyChairperson(){ 
        require(msg.sender == chairperson); 
        _;
    }
   
    modifier onlyVerifyer(address job){
        require(msg.sender == Jobs[job].verifyer);
        _;
    }
   
    modifier validCode(address jobAddress, bytes32 codeOfHash){
        require(Jobs[jobAddress].submission.codeHash == codeOfHash);
        _;
    }

    //Events
    event Submitted(address indexed freelancer);
    event Deleted(address indexed job);
    event Verified(address indexed freelancer);
    event Rejected(address indexed freelancer);
    event Approved(address indexed job);
    event Closed(address indexed job);

    constructor(  ) public {    
        chairperson = msg.sender;
    }
    
    function createJob(bytes32 khash, address verifyer) public payable{
        //take escrow
        Jobs[msg.sender] = Job({
            jobHash: khash,
            verifyer: verifyer,
            currentState: State.Created,
            bounty: msg.value,
            submission: Submission({ //used as a placeholder to initialize object
                codeHash: 0,
                freelancer: msg.sender
            })
        });
    }
    
    function deleteJob() public {
        //return escrow
        msg.sender.transfer(Jobs[msg.sender].bounty);
        emit Deleted(msg.sender);
        delete Jobs[msg.sender];
    }
    
    function removeJob(address jobAddress) public onlyChairperson(){
        msg.sender.transfer(Jobs[jobAddress].bounty);
        emit Deleted(jobAddress);
        delete Jobs[jobAddress];
    }
    
    function createSubmission(address jobAddress, bytes32 submissionHash) public validState(jobAddress, State.Created) {
        Jobs[jobAddress].submission = Submission ({
            codeHash: submissionHash,
            freelancer: msg.sender
        });
        Jobs[jobAddress].currentState = State.Submitted;
        emit Submitted(msg.sender);
    }
    
    //only verifyer
    function verify(address jobAddress, bytes32 codeSubmittedHash) public 
    validState(jobAddress, State.Submitted) validCode(jobAddress, codeSubmittedHash) onlyVerifyer(jobAddress){
        Jobs[jobAddress].currentState = State.Verified;
        emit Verified(Jobs[jobAddress].submission.freelancer);
    }
    
    function reject(address jobAddress, bytes32 codeSubmittedHash) public 
    validState(jobAddress, State.Submitted) validCode(jobAddress, codeSubmittedHash) onlyVerifyer(jobAddress) onlyChairperson(){
        
        Jobs[jobAddress].currentState = State.Created;
        emit Rejected(Jobs[jobAddress].submission.freelancer);
    }
    
    //only chairperson
    function approve(address jobAddress) public onlyChairperson() validState(jobAddress, State.Verified) {
        
        Jobs[jobAddress].currentState = State.Approved;
        Jobs[jobAddress].submission.freelancer.transfer(Jobs[jobAddress].bounty);
        Jobs[jobAddress].bounty = 0;
        emit Approved(jobAddress);
    }
    
    function transacted(uint value, bytes32 secret) public validState(msg.sender, State.Approved){
        //add event saying code was sent
        //use keccak secret?
        
        if(Jobs[msg.sender].submission.codeHash == keccak256(abi.encodePacked(value, secret))){
            delete Jobs[msg.sender];
            emit Closed(msg.sender);
            selfdestruct(chairperson);
        }
    }
    
    

}