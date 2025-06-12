export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { latitude, longitude } = req.body;

        // Example: Append to a text file
        const fs = require('fs');
        const log = `Latitude: ${latitude}, Longitude: ${longitude}\n`;

        fs.appendFile('/tmp/locations.txt', log, (err) => {
            if (err) {
                console.error('Failed to save location:', err);
                return res.status(500).json({ error: 'Failed to save location' });
            }

            res.status(200).json({ message: 'Location saved successfully' });
        });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
