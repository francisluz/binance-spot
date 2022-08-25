import account from "./modules/account.js";
import order from "./modules/order.js";

try {
// Tasks:
// 1. Implement a simple HTTP wrapper to perform signed request
// 2. Log to console current non 0 asset balances available on the SPOT account
// 3. Place an LIMIT order on the order book
// 4. Query the created orders and log its state to console
// 5. Cancel the order
// 6. Perform step 2 again

    //2. Query Account
    await account.query();

    //3. Place Order
    const orderResult = await order.place();

    if (orderResult) {
        //4. Query Order
        await order.query(orderResult.orderId);
        //Extra Check Account before cancel
        await account.query();
        //5. Cancel Order
        await order.cancel(orderResult.orderId);
    }

    //6. Query Account
    await account.query();
} catch (error) {
    console.log(error)
}