import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jspvxuerkroacryfihrj.supabase.co';
const supabaseAnonKey = 'sb_publishable_7Ko1F8lYpbFhunOXN_uHVw_EzMFAdfW';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
