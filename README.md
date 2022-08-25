# binance-spot
NodeJS project to test Binance SPOT Api

### PROJECT STRUCTURE

Follow the most important folders and files on this project.

- root
  - modules
    - account.js
    - order.js
  - services.js
  - test.js
  - index.js
  - .env

Modules: holds the methods that calls the signed api.

Service.js: contain all functions and HTTP wrapper.


### SETUP

As per the requirements max 2 external libs were allowed.

In this project I'm using:
* dotenv to read `.env` files
* openssl-nodejs to sign the api calls due to restrictions to not user any crypto lib.

Run:
```
npm install
```
or 
```
yarn
```

#### .ENV
Create a `.env` file on the root and add your API_KEY and SECRET_KEY.

```
# Testnet Keys
API_KEY="<api_key>"
SECRET_KEY="<secret_key>"
```

## TEST
Run:
```
npm test
```
or
```
yarn test
```
