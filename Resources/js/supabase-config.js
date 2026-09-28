// Supabase project settings (Project Settings → API in the Supabase dashboard).
// The publishable/anon key below is safe to keep in plain client-side code —
// access is controlled by the Row Level Security policies on each table, not
// by hiding this key.
var SUPABASE_URL = 'https://huxwdtnnhpteizrjppeh.supabase.co';
var SUPABASE_ANON_KEY = 'sb_publishable_swIntaXnijdLN21bfaCa4w_pYGIGD4f';

var SUPABASE_CONFIGURED = SUPABASE_URL.indexOf('REPLACE_WITH') !== 0;

var supabaseClient = SUPABASE_CONFIGURED
  ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;
