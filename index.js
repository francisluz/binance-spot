import { createServer, get } from "node:http";
import * as dotenv from 'dotenv';
dotenv.config()

const hostname = "127.0.0.1";
const port = 8000;

const server = createServer();
server.on('request', async (req, res) => {
    let result = { server: 'Binance SPOT API'};

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    console.log(req.url);
    console.log(result);
    res.end(JSON.stringify(result));
});

server.listen(port, hostname, () => {
    console.log('Binance SPOT API');
    console.log(`Server running at http://${hostname}:${port}/`);
});
