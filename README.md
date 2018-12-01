# BLOCKX 

BlockX is a single platform which provides the blockchain as a service to various areas of implementation eg. health, insurance etc.

## BLOCKX HEALTH

This is blockchain as a service deployed to specifically target the health service. Various interactions include:

- Get total number of hospitals on the chain
- Get the total number of patient visits recorded by every hospital on the chain
- Get the total number of patient visits recorded by individual hospitals on the chain
- Add (or register) hospital on the chain
- Record a patient visit on the chain

### Dependencies

This project represents a simple DAPP without any complications. Business logic is written in Solidity (version 0.4.24) and frontend is written in plain JavaScript. Other dependencies include:

- Node v8
- npm (or yarn)
- Ganache (this is a local ethereum blockchain with 10 accounts to use)
- MetaMask
- Truffle

### Installations

Nothing special to do here since every major dependencies is bundled as part of the application

### Usage

To  compile the smart contracts
```
npm run compile
```

To migrate onto a local blockchain (eg. Ganache). It might be helpful to set ganache settings to http://127.0.0.1:8545. If not, you need to ensure the config in `truffle.js` and `truffle-config.js` is updated.
```
npm run migrate:dev
```

To run a local simple static server of the frontend
```
npm run start:dev
```

To play with truffle console/develop environments
```
npm run dev
npm run dev:console
```

### Testing

To run the test suite
```
npm run test
```
