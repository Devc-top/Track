export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { latitude, longitude, userAgent, platform, timestamp } = req.body;

    const SUPABASE_URL = 'https://your-supabase-url.supabase.co';
    const SUPABASE_API_KEY = 'your-anon-public-api-key';

    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/device_logs`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_API_KEY,
                'Authorization': `Bearer ${SUPABASE_API_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify([{ latitude, longitude, user_agent: userAgent, platform }])
        });

        if (!response.ok) throw new Error('Failed to log data to Supabase');

        res.status(200).json({ message: 'Device info logged successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
