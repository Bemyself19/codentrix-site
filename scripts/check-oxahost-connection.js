
const USERNAME = process.argv[2];
const PASSWORD = process.argv[3];

if (!USERNAME || !PASSWORD) {
    console.error("Usage: node check-oxahost-connection.js <username> <password>");
    process.exit(1);
}

const BASE_URL = 'https://my.oxahost.tn/api';

async function login() {
    console.log(`Attempting login for user: ${USERNAME}`);
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: USERNAME,
                password: PASSWORD,
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Login failed: ${response.status} ${response.statusText}`);
            console.error("Error body:", errorText);
            throw new Error(`Login failed`);
        }

        const data = await response.json();
        console.log("Login successful!");

        if (data.token) {
            // console.log("Token found");
        } else {
            console.error("Token NOT found in response data!", JSON.stringify(data));
        }

        return data.token;
    } catch (error) {
        console.error("Error during login execution:", error.message);
        process.exit(1);
    }
}

async function getServiceMethods(token, serviceId) {
    console.log(`Fetching methods for service ${serviceId}...`);
    try {
        const response = await fetch(`${BASE_URL}/service/${serviceId}/methods`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log(`Service ${serviceId} methods:`);
            console.log(JSON.stringify(data, null, 2));
        } else {
            console.log(`Failed to fetch service ${serviceId} methods: ${response.status}`);
            const text = await response.text();
            console.log("Error body:", text);
        }
    } catch (error) {
        console.error(`Error fetching service methods ${serviceId}:`, error.message);
    }
}

async function main() {
    const token = await login();
    if (token) {
        console.log("Proceeding with token...");
        await getServiceMethods(token, '13940'); // VPS Service ID
    } else {
        console.error("Cannot proceed without token.");
    }
}

main();
