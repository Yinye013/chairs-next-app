import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = "https://jszeybyppeerdcxvslvf.supabase.co";
const supabaseKey: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzemV5YnlwcGVlcmRjeHZzbHZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM2MTY1OTksImV4cCI6MjAxOTE5MjU5OX0.edSRFScYu8g5Lw1u3t7wwF4cujQqN-9PWeIv2uUd3Ck";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
