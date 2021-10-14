const axios = require('axios');
const fs = require('fs');


var data = fs.readFileSync('data.csv')
    .toString() // convert Buffer to string
    .split('\n') // split string to lines

console.log(data)
const sgList = data

//const url = "https://api.production-mgklkh.walmartdigital.cl/picking-web-admin-bff/graphql"
//const url = "localhost:3000/picking-web-admin-bff/graphql"
const url = "https://api.staging-dlovtm.walmartdigital.cl/picking-web-admin-bff/graphql"

setTimeout(() =>
    resend()
    , 1000)

console.log("last")

const resend = async () => {
    const query = ` mutation resendFinishedSG($sgId: String!) { resendFinishedSG(sgId: $sgId) } `;
    for (const sgId of sgList) {
        await axios.post(url,
            JSON.stringify({
                query, variables: { sgId },
            }),
            {
            headers: {
                api_key: 'Key'
            }
            }
        ).then(
            ({ data }) =>
                console.log(`success ${sgId}`, data)
        ).catch((error) =>
            console.log(`error ${sgId}`, error.response)
        );
    }
};
