import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_API_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
    const { data, error } = await supabase.from('visits').select('*');

    if (error) {
        res.status(500).json({ error: error.message });
    } else {
        res.status(200).json(data);
    }
}
