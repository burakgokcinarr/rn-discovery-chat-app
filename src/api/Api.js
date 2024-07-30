import { supabase } from "../lib/supabase";

export const signUpNewUser = async(email = '', password = '' ) => {
  const { data: { session }, error } = await supabase.auth.signUp({
    email: email,
    password: password
  })

  return { session, error }
}

export const signInUser = async(email = '', password = '') => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  })

  return { data, error }
}

export const userCheckSessionControl = async() => {
  const { data: { user }, error } = await supabase.auth.getUser()
  
  return { user, error };
}

export const userLogOut = async() => {
  const { error } = await supabase.auth.signOut()

  return error
}
