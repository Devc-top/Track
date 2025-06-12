export default async function handler(req, res) {
    const { redirect } = req.query;

    const userAgent = req.headers['user-agent'] || 'Unknown';
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const logEntry = `Click Tracked:
IP: ${ip}
User Agent: ${userAgent}
Timestamp: ${new Date().toISOString()}
-------------------------------\n`;

    console.log(logEntry); // For Vercel logs

    // 👉 You cannot store on file system in Vercel
    // Suggestion: Store in database (Supabase, Firebase, Google Sheets via API)

    // Redirect user
    res.writeHead(302, { Location: redirect || 'https://example.com' });
    res.end();
}
