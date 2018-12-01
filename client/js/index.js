(async function(ProfileManager, HospitalManager, BlockXManager, UtilFunctions) {
    
    const hostUrl = 'http://localhost:8545';

    const blockxManager = new BlockXManager(hostUrl);
    blockxManager.initializeWeb3();
    await blockxManager.initializeContract();

    const profileManager = new ProfileManager(blockxManager.account);
    profileManager.displayAddress();
    profileManager.setFormEventListener((newAddress) => {
        currentAddress = newAddress;
    });

    const currentTotalHospitals = await blockxManager.getTotalHospitals();
    const hospitalManager = new HospitalManager(currentTotalHospitals);
    hospitalManager.setaddHospitalFormEventListener(async (hospitalAddress, hospitalName) => {
        const result = await blockxManager.addHospital(hospitalAddress, hospitalName);
        if (result) {
            const currentTotalHospitals = await blockxManager.getTotalHospitals();
            console.log(currentTotalHospitals);
            hospitalManager.setTotalHospitals(currentTotalHospitals);
            hospitalManager.displayTotalHospitals();
        }
    });

})(ProfileManager, HospitalManager, BlockXManager, UtilFunctions);