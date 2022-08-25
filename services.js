import https, { get } from "node:https";
import openssl from 'openssl-nodejs';
import * as dotenv from 'dotenv';

dotenv.config()

export const parseQueryString = (params) => Object.keys(params).map(key => key + '=' + params[key]).join('&');

export const hostName = {
    testnet: 'testnet.binance.vision',
    mainnet: 'api.binance.com'
}

export const api = {
    order: '/api/v3/order',
    account: '/api/v3/account',
    time: '/api/v3/time',
}

export const method = {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    delete: 'DELETE',
}

const signed = (hostname, method, api, apiParams) => {
    return new Promise(async (resolve, reject) => {

        const queryString = parseQueryString(apiParams);
        const signature = await sign(queryString);

        const pathParams = api.concat(['?', queryString, '&signature=', signature].join('')); //`${api}?${queryString}&signature=${signature}` 
        
        const options = {
            hostname: hostname,
            port: 443,
            path: pathParams,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-MBX-APIKEY': process.env.API_KEY
            }
        };

        const req = https.request(options, (res) => {
            let body = [];
            res.on('data', (data) => {
                body.push(data);
            });

            res.on('end', () => {
                try {
                    if (!body) {
                        throw new Error('Body is empty');
                    }
                } catch (error) {
                    reject(error);
                }
                resolve(JSON.parse(Buffer.concat(body).toString()));
            });
        });

        req.on('error', (e) => {
            reject(e);
        });

        req.end();
    });
}

const sign = (data) => new Promise((resolve, reject) => {
    console.log('\n ***** Signing *****');
    openssl(['dgst', '-sha256', '-hmac', process.env.SECRET_KEY, { name:'sign.txt', buffer: Buffer.from(data) }], (err, buffer) => {
        if (!err.toString()) {
            resolve(buffer.toString().replace('HMAC-SHA256(openssl/sign.txt)= ', '').trim())
        } else {
            reject(err.toString())
        }
    })
})


const services = {
    httpsCall: {
        signed: signed
    },
    sign: sign
}

export default services;