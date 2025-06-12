export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const userAgent = req.headers['user-agent'] || 'Unknown';
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

      const logEntry = `Page Visit Tracked:
IP: ${ip}
User Agent: ${userAgent}
Platform: ${data.platform}
Language: ${data.language}
Latitude: ${data.latitude || 'Not Available'}
Longitude: ${data.longitude || 'Not Available'}
Google Maps: https://www.google.com/maps?q=${data.latitude || ''},${data.longitude || ''}
Timestamp: ${new Date().toISOString()}
-------------------------------\n`;


        console.log(logEntry); // View in Vercel Function Logs

        res.status(200).json({ message: 'Page visit tracked' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
