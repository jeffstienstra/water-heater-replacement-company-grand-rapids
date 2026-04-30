import businessInfo from '../data/businessInfo.ts';
import { exec } from 'child_process';

const indexNowKey = businessInfo.indexNowKey;
const host = businessInfo.baseUrl;
const keyLocation = `${host}${indexNowKey}.txt`;

// List of URLs to index
const urlList = [
    // replace these as needed
    // businessInfo.url,
    // 'https://someWebsite.com/',
];

// Construct the curl command
const curlCommand = `
curl -v -X POST "https://api.indexnow.org/IndexNow" \\
    -H "Content-Type: application/json; charset=utf-8" \\
    -d '{
        "host": "${host}",
        "key": "${indexNowKey}",
        "keyLocation": "${keyLocation}",
        "urlList": ${JSON.stringify(urlList, null, 2)}
    }'
`;

// Execute the curl command
exec(curlCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing curl command: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Curl stderr: ${stderr}`);
    }
    console.log(`Curl stdout: ${stdout}`);
});