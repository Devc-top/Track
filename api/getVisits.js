import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zcwqreubonxzcnqwdhgq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpjd3FyZXVib254emNucXdkaGdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1OTc4MzcsImV4cCI6MjA2NTE3MzgzN30.7kpakwWlO0f3crRDEAmMShaBdDn_2c6hqKj3FyB4rno';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
    const { data, error } = await supabase.from('visits').select('*');

    if (error) {
        res.status(500).json({ error: error.message });
    } else {
        res.status(200).json(data);
    }
}
