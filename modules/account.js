import services, { api, method, parseToQueryString } from "../services.js";

const time = Date.now();

//Query Account
const query = async () => {
    const accountParams = {
        recvWindow: 5000,
        timestamp: time
    }
    const queryAccount = parseToQueryString(accountParams);
    const accountSignature = await services.sign(queryAccount);

    const account = await services.httpCall.signed(
        api.account,
        method.get,
        queryAccount,
        accountSignature
    );

    console.log('\n ***** Query Account *****');
    console.log('List of Assets non 0 balance:');
    account && account.balances.forEach(asset => {
        const balance = asset.free - asset.locked;
        if (parseInt(balance) > 0 ){
            console.log(`Asset: ${asset.asset}, Balance: ${balance}`)
        }
    });
    console.log('\n');
}

const account = {
    query: query
}

export default account;