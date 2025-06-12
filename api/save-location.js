// /api/save-location.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, latitude, longitude } = req.body;

        const { data, error } = await supabase
            .from('locations')
            .insert([{ name, latitude, longitude }]);

        if (error) {
            console.error('Error saving location:', error);
            return res.status(500).json({ error: 'Failed to save location' });
        }

        res.status(200).json({ message: 'Location saved successfully', data });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
