const ProfileManager = (function() {
    const PROFILE_ADDRESS_SPAN_ELEMENT_NAME = 'profile-address';
    const SET_PROFILE_ADDRESS_FORM_ELEMENT_NAME = 'set-profile-address-form';
    const SET_PROFILE_ADDRESS_FORM_INPUT_ELEMENT_NAME = 'set-profile-address-form-input';
    
    function ProfileManager(profileAddress) {
        this.profileAddress = profileAddress;
    };
    
    ProfileManager.prototype.displayAddress = function() {
        const addressElement = document.getElementById(PROFILE_ADDRESS_SPAN_ELEMENT_NAME);
        addressElement.innerHTML = '';
        addressElement.innerHTML = this.profileAddress;
    };

    ProfileManager.prototype.setFormEventListener = function(callback) {
        const formElement = document.getElementById(SET_PROFILE_ADDRESS_FORM_ELEMENT_NAME);
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            const value = document.getElementById(SET_PROFILE_ADDRESS_FORM_INPUT_ELEMENT_NAME).value;
            if (value) {
                this.profileAddress = value;
                this.displayAddress();
                callback(this.profileAddress);
            } else {
                throw new Error('No valid address entered!');
            }
        });
    };

    return ProfileManager;
})();
