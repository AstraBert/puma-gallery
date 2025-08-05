import { createClient } from "@/utils/supabase/server";

export async function getImages() {
  const supabase = await createClient();
  const { data: pictures } = await supabase.from("pictures").select();
  return pictures;
}