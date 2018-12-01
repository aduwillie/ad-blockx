const HospitalManager = (function(UtilFunctions) {
    const { isCorrectAddress } = UtilFunctions;

    const SET_HOSPITAL_NAME_FORM_ELEMENT = 'add-hospital-form';
    const SET_HOSPITAL_NAME_FORM_NAME_INPUT_ELEMENT = 'add-hospital-form-h-name-input';
    const SET_HOSPITAL_NAME_FORM_INPUT_ADDRESS_ELEMENT = 'add-hospital-form-h-address-input';
    const TOTAL_HOSPITAL_COUNT_NAME = 'hospital-count';

    function HospitalManager(totalHospitalCount) {
        this.totalHospitalCount = totalHospitalCount || 0;
    };

    HospitalManager.prototype.setTotalHospitals = function(newCount) {
        this.totalHospitalCount = newCount;
    };

    HospitalManager.prototype.displayTotalHospitals = function() {
        const countElement = document.getElementById(TOTAL_HOSPITAL_COUNT_NAME);
        countElement.innerHTML = '';
        countElement.innerHTML = this.totalHospitalCount;
    };

    HospitalManager.prototype.setaddHospitalFormEventListener = function(blockChainHandler) {
        const formElement = document.getElementById(SET_HOSPITAL_NAME_FORM_ELEMENT);
        formElement.addEventListener('submit', async (event) => {
            event.preventDefault();
            const hospitalname = document.getElementById(SET_HOSPITAL_NAME_FORM_NAME_INPUT_ELEMENT).value;
            const hospitalAddress = document.getElementById(SET_HOSPITAL_NAME_FORM_INPUT_ADDRESS_ELEMENT).value;
            if (hospitalname && isCorrectAddress(hospitalAddress)) {
                await blockChainHandler(hospitalAddress, hospitalname);
            } else {
                throw new Error('Hospital name or address is incorrect');
            }
        });
    };

    return HospitalManager;
})(UtilFunctions);
