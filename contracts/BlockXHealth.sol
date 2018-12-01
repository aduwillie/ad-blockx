pragma solidity ^0.4.24;

contract BlockXHealth {
    struct PatientVisit {
        uint totalVisits;
        mapping (uint => uint) records;
        uint[] patientRecords;
    }
    address private _owner;
    uint private _totalHospitalVisits;
    uint private _totalHospitals;
    mapping (address => uint) private _totalVisitForHospital;
    mapping (address => mapping (address => PatientVisit)) private _patientVisits;
    mapping(address => string) private _hospitals;
    
    constructor() public {
        _owner = msg.sender;   
    }
    
    function getOwner() public view returns (address) {
        return _owner;
    }

    function getTotalHospitals() public view returns (uint) {
        return _totalHospitals;
    }
    
    function getTotalHospitalVisits() public view returns (uint) {
        return _totalHospitalVisits;
    }
    
    function getVisitsForHospital(address _hospitalAddress) public view returns (uint) {
        return _totalVisitForHospital[_hospitalAddress];
    }
    
    function getPatientVisitCount(address _hospitalAddress, address _patientAddress) public view returns (uint) {
        return _patientVisits[_hospitalAddress][_patientAddress].totalVisits;
    }
    
    function addHospital(address _hospitalAddress, string _hospitalName) public returns (bool) {
        if (msg.sender == _owner) {
            _hospitals[_hospitalAddress] = _hospitalName;
            _totalHospitals += 1;
            return true;
        }
        else {
            return false;
        }
    }
    
    function addPatientVisit(address _hospitalAddress, uint _timeOfVisit) public returns (bool) {
        _patientVisits[_hospitalAddress][msg.sender].totalVisits += 1;
        _patientVisits[_hospitalAddress][msg.sender].records[_timeOfVisit] = _timeOfVisit;
        _patientVisits[_hospitalAddress][msg.sender].patientRecords.push(_timeOfVisit);
        _totalVisitForHospital[_hospitalAddress] += 1;
        _totalHospitalVisits += 1;
        return true;
    }
}
