import services, { api, hostName, method } from "../services.js";

const time = Date.now();
// let _hostName = '';

const place = async (hostName) => {
    //Place Order
    const params = {
        symbol: 'BTCBUSD',
        side: 'SELL',
        type: 'LIMIT',
        quantity: '1',
        timeInForce: 'GTC',
        price: '23000.0',
        recvWindow: 5000,
        timestamp: time
    }

    const order = await services.httpsCall.signed(
        hostName,
        method.post,
        api.order,
        params
    );

    console.log('\n ***** Placed Account *****');
    console.log('Order ID:', order.orderId);
    console.log('\n');
    return order;
}

const query = async (hostName, orderId) => {
    const params = {
        symbol: 'BTCBUSD',
        orderId: orderId,
        recvWindow: 5000,
        timestamp: time
    }

    const order = await services.httpsCall.signed(
        hostName,
        method.get,
        api.order,
        params
    );

    console.log('\n ***** Query Order *****');
    console.log(`Order ID: ${order.orderId}, Order Status: ${order.status}`);
    console.log('\n');
}

const cancel = async (hostName, orderId) => {
    const params = {
        symbol: 'BTCBUSD',
        orderId: orderId,
        recvWindow: 5000,
        timestamp: time
    }

    const order = await services.httpsCall.signed(
        hostName,
        method.delete,
        api.order,
        params
    );

    console.log('\n ***** Canceled Order *****');
    console.log(`Order ID: ${order.orderId}, Order Status: ${order.status}`);
    console.log('\n');
}

class Order {

    constructor(hostName) {
        this._hostName = hostName;
    }

    async place() {
        return await place(this._hostName);
    }

    async query(orderId) {
        return await query(this._hostName, orderId);
    }

    async cancel(orderId) {
        return await cancel(this._hostName, orderId);
    }
}

export default Order;