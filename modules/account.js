import services, { api, method } from "../services.js";

const time = Date.now();

//Query Account
const query = async (hostName) => {
    const params = {
        recvWindow: 5000,
        timestamp: time
    }

    const account = await services.httpsCall.signed(
        hostName,
        method.get,
        api.account,
        params
    );

    console.log('\n ***** Query Account *****');
    console.log('List of Assets non 0 balance:');
    account && account.balances.forEach(asset => {
        const balance = asset.free - asset.locked;
        if (parseInt(balance) > 0) {
            console.log(`Asset: ${asset.asset}, Balance: ${balance}`)
        }
    });
    console.log('\n');
}

class Account {

    constructor(hostName) {
        this._hostName = hostName;
    }

    async query() {
        return await query(this._hostName);
    }
}

export default Account;