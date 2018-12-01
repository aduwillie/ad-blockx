const BlockXManager = (function(web3, UtilFunctions) {
    const { isCorrectAddress, readContract } = UtilFunctions;

    const CONTRACT_NAME = 'BlockXHealth';

    function BlockXManager(host, account) {
        this.web3 = web3;
        this.web3Provider = null;
        this.contracts = {};
        this.host = host;
        this.deployedInstance = null;
        if (account && isCorrectAddress(account)) {
            this.account = account;
        } else {
            this.account = null;
        }
    };

    BlockXManager.prototype.initializeWeb3 = function() {
        if (typeof this.web3 !== 'undefined') {
            this.web3Provider = this.web3.currentProvider;
            this.web3 = new Web3(this.web3.currentProvider);
        } else {
            this.web3Provider = new Web3.providers.HttpProvider(this.host);
            this.web3 = new Web3(this.web3Provider);
        }
    };

    BlockXManager.prototype.initializeContract = async function(callback) {
        const blockXHealthData = await readContract(CONTRACT_NAME);
        this.contracts.BlockXHealth = TruffleContract(blockXHealthData);
        this.contracts.BlockXHealth.setProvider(this.web3Provider);
        this.deployedInstance = await this.contracts.BlockXHealth.deployed();
        if (this.web3.eth.accounts && this.web3.eth.accounts.length) {
            this.changeAccount(this.web3.eth.accounts[0]);
        }
        if (callback) {
            callback();
        }
    };

    BlockXManager.prototype.addHospital = async function(hospitalAddress, hospitalName) {
        const before = await this.getTotalHospitals();
        await this.deployedInstance.addHospital(hospitalAddress, hospitalName);
        const after = await this.getTotalHospitals();
        if (before >= after) {
            return false;
        }
        return true;
    };

    BlockXManager.prototype.addPatientVisit = async function(hospitalAddress, timeOfVisit) {
        const before = await this.getPatientVisitCount(hospitalAddress, this.account);
        await this.deployedInstance.addPatientVisit(hospitalAddress, timeOfVisit, { from: this.account });
    };

    BlockXManager.prototype.changeAccount = function(newAccount) {
        if (isCorrectAddress(newAccount)) {
            this.account = newAccount;
            this.web3.eth.defaultAccount = this.account;
            return true;
        }
        return false;
    };

    BlockXManager.prototype.getTotalHospitals = async function() {
        const totalHospitals = await this.deployedInstance.getTotalHospitals();
        return totalHospitals.toNumber();
    };

    BlockXManager.prototype.getTotalHospitalVisits = async function() {
        const totalHospitals = await this.deployedInstance.getTotalHospitalVisits();
        return totalHospitals.toNumber();
    };

    BlockXManager.prototype.getTotalVisitsForHospital = async function(hospitalAddress) {
        const totalHospitals = await this.deployedInstance.getVisitsForHospital(hospitalAddress);
        return totalHospitals.toNumber();
    };

    BlockXManager.prototype.getPatientVisitCount = async function(hospitalAddress, patientAddress) {
        const patientVisits = await this.deployedInstance.getPatientVisitCount(hospitalAddress, patientAddress);
        return patientVisits.toNumber();
    };

    return BlockXManager;
})(web3, UtilFunctions);