import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zcwqreubonxzcnqwdhgq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpjd3FyZXVib254emNucXdkaGdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1OTc4MzcsImV4cCI6MjA2NTE3MzgzN30.7kpakwWlO0f3crRDEAmMShaBdDn_2c6hqKj3FyB4rno';
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
            res.status(200).json({ message: 'Visitor tracked successfully' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
