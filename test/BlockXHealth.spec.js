const BlockXHealth = artifacts.require("./BlockXHealth.sol");

contract('BlockXHealth', async (accounts) => {
    let blockXHealthInstance;
    beforeEach(async () => {
        blockXHealthInstance = await BlockXHealth.deployed();
    });
    it('should set owner address upon creation', async () => {
        const actualOwnerAddress = await blockXHealthInstance.getOwner();
        const expectedOwnerAddress = accounts[0];
        assert.equal(actualOwnerAddress, expectedOwnerAddress, 'Owner address should be same the first account');
    });
    it('should allow owner to add hospital', async () => {
        const hospitalAddress = accounts[1];
        const hospitalA = "Hatua Hospital A";
        const hospitalB = "Hatua Hospital B";
        const hospitalC = "Hatua Hospital C";
        const expectedResult = 3;
        await blockXHealthInstance.addHospital(hospitalAddress, hospitalA);
        await blockXHealthInstance.addHospital(hospitalAddress, hospitalB);
        await blockXHealthInstance.addHospital(hospitalAddress, hospitalC);
        const actualResult = await blockXHealthInstance.getTotalHospitals();
        assert.equal(actualResult, expectedResult, 'Owner can add hospital');
    });
    it('should allow patient to add visit', async () => {
        const hospitalA = 'Hatua Hospital A';
        const hospitalB = "Hatua Hospital B";
        const hospitalC = "Hatua Hospital C";
        const hospitalAddress = accounts[1];
        const patientAddress = accounts[2];
        const timeOfVisit = +(new Date());
        await blockXHealthInstance.addHospital(hospitalAddress, hospitalA);
        await blockXHealthInstance.addHospital(hospitalAddress, hospitalB);
        await blockXHealthInstance.addHospital(hospitalAddress, hospitalC);
        await blockXHealthInstance.addPatientVisit(hospitalAddress, timeOfVisit, { from: patientAddress });
        const expectedHospitalCount = 3;
        const expectedTotalHospitalVisits = 1;
        const expectedVisitsForHospital = 1;
        const expectedPatientVisitCount = 1;
        const actualHospitalCount = await blockXHealthInstance.getTotalHospitals();
        const actualTotalHospitalVisits = await blockXHealthInstance.getTotalHospitalVisits();
        const actualVisitsForHospital = await blockXHealthInstance.getVisitsForHospital(hospitalAddress);
        const actualPatientVisitCount = await blockXHealthInstance.getPatientVisitCount(hospitalAddress, patientAddress);
        assert(actualHospitalCount, expectedHospitalCount, 'Number of hospitals increase as more is added');
        assert(actualTotalHospitalVisits, expectedTotalHospitalVisits, 'Number of hospital visits increase as people visit hospitals');
        assert(actualVisitsForHospital, expectedVisitsForHospital, 'Number of visits for a particular hospital increase as people visit it');
        assert(actualPatientVisitCount, expectedPatientVisitCount, 'Hospital keeps track of patients visiting them');
    });
});
