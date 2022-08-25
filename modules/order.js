import services, { api, method, parseToQueryString } from "../services.js";

const time = Date.now();

const place = async () => {
    //Place Order
    const placeOrderParams = {
        symbol: 'BTCBUSD',
        side: 'SELL',
        type: 'LIMIT',
        quantity: '1',
        timeInForce: 'GTC',
        price: '23000.0',
        recvWindow: 5000,
        timestamp: time
    }
    const placeOrder = parseToQueryString(placeOrderParams);
    const orderSignature = await services.sign(placeOrder);

    const order = await services.httpCall.signed(
        api.order,
        method.post,
        placeOrder,
        orderSignature
    );

    console.log('\n ***** Placed Account *****');
    console.log('Order ID:', order.orderId);
    console.log('\n');
    return order;
}

const query = async (orderId) => {
    const queryOrderParams = {
        symbol: 'BTCBUSD',
        orderId: orderId,
        recvWindow: 5000,
        timestamp: time
    }
    const queryOrder = parseToQueryString(queryOrderParams);
    const queryOrderSignature = await services.sign(queryOrder);

    const order = await services.httpCall.signed(
        api.order,
        method.get,
        queryOrder,
        queryOrderSignature
    );

    console.log('\n ***** Query Order *****');
    console.log(`Order ID: ${order.orderId}, Order Status: ${order.status}`);
    console.log('\n');
}

const cancel = async (orderId) => {
    const cancelOrderParams = {
        symbol: 'BTCBUSD',
        orderId: orderId,
        recvWindow: 5000,
        timestamp: time
    }
    const cancelOrder = parseToQueryString(cancelOrderParams);
    const cancelOrderSignature = await services.sign(cancelOrder);

    const order = await services.httpCall.signed(
        api.order,
        method.delete,
        cancelOrder,
        cancelOrderSignature
    );

    console.log('\n ***** Canceled Order *****');
    console.log(`Order ID: ${order.orderId}, Order Status: ${order.status}`);
    console.log('\n');
}

const order = {
    place: place,
    query: query,
    cancel: cancel
}

export default order;