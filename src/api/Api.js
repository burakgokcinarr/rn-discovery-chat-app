import { supabase } from "../lib/supabase";

 export const  signUpNewUser = async(email = '', password = '' ) => {
    const { data: { session }, error } = await supabase.auth.signUp({
      email: email,
      password: password
    })

    return { session, error }
  }
  