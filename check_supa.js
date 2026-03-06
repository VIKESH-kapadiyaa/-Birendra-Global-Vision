const { createClient } = require('@supabase/supabase-js');

const supabase = createClient('https://jspvxuerkroacryfihrj.supabase.co', 'sb_publishable_7Ko1F8lYpbFhunOXN_uHVw_EzMFAdfW');

async function testInsert() {
    const { data, error } = await supabase.from('bookings').insert([{ name: 'Test' }]);
    console.log('Bookings:', error || 'Success');

    const { data: d2, error: e2 } = await supabase.from('teachers').insert([{ name: 'Test' }]);
    console.log('Teachers:', e2 || 'Success');
}

testInsert();
