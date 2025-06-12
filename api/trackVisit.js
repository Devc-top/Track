import { createClient } from '@supabase/supabase-js';

// Your Supabase details
const supabaseUrl = 'https://YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_API_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { platform, language, latitude, longitude } = req.body;

        const userAgent = req.headers['user-agent'] || 'Unknown';
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        const { error } = await supabase.from('visits').insert([
            {
                ip,
                user_agent: userAgent,
                platform,
                language,
                latitude,
                longitude,
                timestamp: new Date().toISOString()
            }
        ]);

        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(200).json({ message: 'Location saved' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
