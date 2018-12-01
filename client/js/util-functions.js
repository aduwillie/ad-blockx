const UtilFunctions = (function () {

    const isCorrectAddress = (address) => {
        if (address) {
            return /^0x[a-fA-F0-9]{40}$/g.test(address.trim());
        }
        return false;
    };

    const readContract = async (contract) => {
        const fetchResponse = await fetch(`./src/contracts/${contract}.json`);
        if (fetchResponse.status !== 200) {
            throw new Error('Could not load the compiled contract!');
        }
        const data = await fetchResponse.json();
        return data;
    };

    return {
        isCorrectAddress,
        readContract,
    };
})();