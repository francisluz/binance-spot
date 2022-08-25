#!/usr/bin/env bash

# Set up authentication:
apiKey="2sfDAmM1cpuCebrml7hXXd7eXOV7e75uL1OYVSVzcyXEyTBb9Jqnm41TR40I0EOg"
secretKey="UJUuUR0473shoO3YhsI6rU6BHb6PUspts1YUNSfbfnWeJtjyZWoPkgsjKduzpIS2"

# Set up the request:
apiMethod="POST"
apiCall="v3/order"
apiParams="symbol=BTCUSDT&side=SELL&type=LIMIT&timeInForce=GTC&quantity=1&price=0.2&recvWindow=5000"

function rawurlencode {
    local value="$1"
    local len=${#value}
    local encoded=""
    local pos c o

    for (( pos=0 ; pos<len ; pos++ ))
    do
        c=${value:$pos:1}
        case "$c" in
            [-_.~a-zA-Z0-9] ) o="${c}" ;;
            * )   printf -v o '%%%02x' "'$c"
        esac
        encoded+="$o"
    done

    echo "$encoded"
}

ts=$(date +%s000)
paramsWithTs="$apiParams&timestamp=$ts"

rawSignature=$(echo -n "$paramsWithTs" \
               | openssl dgst -sha256 -hmac "$secretKey"\
            #    | openssl enc -base64 \
            #    | tr -d '\n'
            )
signature=$(rawurlencode "$rawSignature")

echo -n "Order signature"
echo
echo -n $ts
echo
echo -n $signature

curl --silent -H "X-MBX-APIKEY: $apiKey" \
     -X $apiMethod "https://testnet.binance.vision/api/$apiCall?$paramsWithTs&signature=$signature"

apiCall="v3/account"
apiParams="recvWindow=5000"
paramsWithTs="$apiParams&timestamp=$ts"

rawSignature=$(echo -n "$paramsWithTs" \
               | openssl dgst -sha256 -hmac "$secretKey"\
               | openssl enc -base64 \
               | tr -d '\n')
signature=$(rawurlencode "$rawSignature")

echo
echo -n "Account signature"
echo
echo -n $ts
echo
echo -n $signature


# curl --silent -H "X-MBX-APIKEY: $apiKey" \
#      -X $apiMethod "https://testnet.binance.vision/api/$apiCall?$paramsWithTs&signature=$signature"