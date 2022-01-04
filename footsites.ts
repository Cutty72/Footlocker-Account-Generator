import got from 'got';
import { v4 } from 'uuid';
import tough from 'tough-cookie';


let cookieJar = new tough.CookieJar();

async function getSession() {
    console.log("getting session...")
    try {
        const response = await got(`https://www.footlocker.com/api/session`, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
            },
            cookieJar: cookieJar
        })
        let csrfToken = JSON.parse(response.body).data.csrfToken;
        await createAccount(csrfToken);
    } catch (e: any) {
        console.log(e.response)
    }
};


async function createAccount(csrfToken: string) {
    console.log("Creating account...")
    try {
        const response = await got.post(`https://www.footlocker.com/api/v3/users`, {
            headers: {
                "authority": "www.footlocker.com",
                "method": "POST",
                "path": "/api/v3/users",
                "scheme": "https",
                "accept": "application/json",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "no-cache",
                "content-type": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
                "x-csrf-token": csrfToken,
                "x-fl-request-id": v4()
            },
            json: {
                "bannerEmailOptIn": false,
                "firstName": "test", //Use Pkg Faker to generate first and last names
                "lastName": "account",
                "postalCode": "90786",
                "uid": "testEmail@gmail.com",
                "phoneNumber": "3128772333",
                "birthday": "09/22/1997",
                "password": "Catinthehat1!",
                "loyaltyStatus": true,
                "wantToBeVip": false,
                "flxTcVersion": "2.0",
                "loyaltyFlxEmailOptIn": false
              },
              cookieJar: cookieJar
        })
        console.log(JSON.parse(response.body))
    } catch (e: any) {
        console.log(e.response)
    }
};

getSession()
