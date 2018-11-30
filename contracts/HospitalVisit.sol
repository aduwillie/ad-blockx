pragma solidity ^0.4.24;

contract HospitalVisit {
    struct PatientVisit {
        string visitType;
    }
    struct Hospital {
        string name;
        mapping(address => PatientVisit) visits;
    }

    uint private totalVisitCount;
    address owner;
    mapping(address => Hospital) hospitalVisitRecords;
    mapping(address => uint) hospitalVisitCount;

    event Visit(address _hospitalAddress, string hospitalName, address patientAddress, string visitType);

    modifier isOwner {
        require(msg.sender == owner, "Action should be performed by owner!");
        _;
    }
    
    modifier hasHospitalEntry(address _hospitalAddress) {
        require(bytes(hospitalVisitRecords[_hospitalAddress].name).length != 0, "Hospital should be added!");
        _;
    }

    constructor() internal {
        owner = msg.sender;
    }

    function getTotalVisits() external view returns (uint) {
        return totalVisitCount;
    }

    function getVisitsForHospital(address _hospitalAddress) external view returns (uint) {
        return hospitalVisitCount[_hospitalAddress];
    }

    function addHospital(address _hospitalAddress, string hospitalName) external isOwner returns (bool) {
        hospitalVisitRecords[_hospitalAddress] = Hospital(hospitalName);
        hospitalVisitCount[_hospitalAddress] = 0;
        return true;
    }

    function addPatientVisit(address _hospitalAddress, string typeOfVisit) external hasHospitalEntry(_hospitalAddress) {
        Hospital storage hospital = hospitalVisitRecords[_hospitalAddress];
        hospital.visits[msg.sender] = PatientVisit(typeOfVisit);
        hospitalVisitCount[_hospitalAddress] += 1;
        totalVisitCount++;
        emit Visit(_hospitalAddress, hospital.name, msg.sender, typeOfVisit);
    }

}
