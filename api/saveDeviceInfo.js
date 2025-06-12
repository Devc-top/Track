import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const logEntry = `Device Info:
User Agent: ${data.userAgent}
Platform: ${data.platform}
Language: ${data.language}
Latitude: ${data.latitude}
Longitude: ${data.longitude}
Timestamp: ${new Date().toISOString()}
-------------------------------\n`;

        const filePath = path.join(process.cwd(), 'device_logs.txt');

        fs.appendFile(filePath, logEntry, (err) => {
            if (err) {
                console.error('Error writing to file', err);
                return res.status(500).json({ error: 'Failed to save device info' });
            }
            return res.status(200).json({ message: 'Device info saved successfully' });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
