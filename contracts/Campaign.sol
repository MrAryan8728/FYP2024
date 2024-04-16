// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract CampaignFactory {
    address[] public deployedCampaigns;

    event campaignCreated(address indexed owner, string indexed category, string indexed country, address campaignAddress, uint deadline, string title, string desc, uint target, string imgURI);

    function createCampaign(string memory title, string memory desc, uint target, string memory imgURI, string memory category,
    string memory country, uint deadline) public {
        Campaign new_camp=new Campaign(title,desc,target,imgURI,category,country,deadline,msg.sender);
        deployedCampaigns.push(address(new_camp));

        emit campaignCreated(msg.sender,category,country,address(new_camp),deadline,title,desc,target,imgURI);
    }
}
contract Campaign {
    address payable public owner;
    string title;
    string desc;
    uint target;
    string imgURI;
    string category;
    uint public amtraised;
    string country;
    uint deadline;
    uint minAmt;
    uint ind;
    uint[3] installments;
    uint contributorsCount;
    uint disbursed; // stores the total disbursed amount till now
    bool isCampaignOpen;
    bool targetAchieved;
    uint[2][2] votes; // 2 times vote need to be casted, so a size 2 array, each with 2 options :- yes(0), no(1)
    uint votingInd; // maintains the no of time the vote is going to be casted
    bool auditReport;
    mapping(address=>address[]) contributors;
    mapping(address=>uint) contribution;
    mapping(address=>uint) balances;
    mapping(address=>bool)[2] hasVoted; // map to maintain whether a person(address) has casted vote or not(bool) in
    // nth(n=2, 0<=i<n) time(so array of size 2)

    constructor(string memory _title, string memory _desc, uint _target, string memory _imgURI, string memory _category,
    string memory _country, uint _deadline, address _owner) {
        owner=payable(_owner); 
        title=_title;
        desc=_desc;
        target=_target;
        imgURI=_imgURI;
        category=_category;
        amtraised=0;
        country=_country;
        deadline=block.timestamp+(_deadline*24*60*60);
        minAmt=(target<<1)/100;
        votes[0][0]=votes[0][1]=votes[1][0]=votes[1][1]=0;
        votingInd=0;
        ind=0;
        uint installment1=(target*30)/100;
        uint installment3=target-(installment1<<1);
        installments[0]=installments[1]=installment1;
        installments[2]=installment3;
        contributorsCount=0;
        disbursed=0;
        isCampaignOpen=true;
        targetAchieved=false;
        auditReport=false;
    }

    // function modifiers :-
    modifier onlyOwner {
        require(msg.sender==owner,"Only owner can call this function");
        _;
    }
    modifier canDisburse {
        require(isCampaignOpen,"Campaign closed");
        require(targetAchieved,"Target not yet reached");
        require(block.timestamp>deadline,"Deadline not yet reached");
        _;
    }

    // functions :-
    function getContractAddress() public view returns(address) {
        return address(this);
    }
    function getContractBalance() public view returns(uint256) {
        return address(this).balance;
    }
    function getOwnerBalance() public view returns(uint) {
        return balances[owner];
    }
    function auditReportSubmitted() public {
        auditReport=true;
    }
    function contribute() public payable {
        require(isCampaignOpen,"Campaign already closed");
        require(!targetAchieved,"Target already achieved");
        require(block.timestamp<=deadline,"Deadline reached");
        require(msg.value+amtraised<=target,"Can't receive more than target");
        require(msg.value>0,"Contribution amount must be greater than 0");
        if(contribution[msg.sender]==0) {
            contributors[owner].push(msg.sender);
            contributorsCount++;
        }
        contribution[msg.sender]+=msg.value;
        amtraised+=msg.value;
        if(amtraised==target) targetAchieved=true;
    }
    function vote(uint currentVote) public {
        require(isCampaignOpen,"Campaign already closed");
        require(msg.sender!=owner,"Owner can't vote");
        require(auditReport,"Audit report not yet submitted");
        require(contribution[msg.sender]>minAmt,"You are not an approver");
        require(!hasVoted[votingInd][msg.sender],"You have already voted");
        votes[votingInd][currentVote]++;
        hasVoted[votingInd][msg.sender]=true;
    }
    function disburse() public payable onlyOwner{
        require(isCampaignOpen,"Campaign already closed");
        require(block.timestamp>deadline,"Deadline not yet reached");
        if(ind==0) {
            owner.transfer(installments[ind]);
            balances[owner]+=installments[ind];
            disbursed+=installments[ind];
            amtraised-=installments[ind];
            ind++;
        }
        else {
            uint yes=votes[votingInd][0];
            uint tot=votes[votingInd][0]+votes[votingInd][1];
            if(block.timestamp>deadline && !targetAchieved) reimburse("Target not achieved till deadline.");
            else if(yes>(tot>>1)) {
                owner.transfer(installments[ind]);
                balances[owner]+=installments[ind];
                disbursed+=installments[ind];
                amtraised-=installments[ind];
                ind++;
                if(ind==3) isCampaignOpen=false;
                votingInd++; // this time, voting was succesful, so move on the next index to accomodate next time voting
                auditReport=false;
            }
        else reimburse("Lack of majority.");
        }
    }
    function reimburse(string memory message) public payable onlyOwner {
        require(isCampaignOpen,"Campaign already closed");
        console.log(message," Re-imbursement process initiated");
        address payable contributor;
        uint contri;
        for(uint i = 0; i < contributors[owner].length; i++) {
            contributor = payable(contributors[owner][i]);
            contri = ((contribution[contributor])*(target-disbursed))/target;
            contribution[contributor] = 0; // Reset contribution to avoid re-entry attack
            contributor.transfer(contri);
        }
        amtraised=0;
        isCampaignOpen=false;
    }
}