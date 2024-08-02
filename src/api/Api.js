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

export const readData = async(tableName = "", selectColumn = "*") => {
  const { data, error } = await supabase
  .from(tableName)
  .select(selectColumn)

  return { data, error }
}

export const insertData = async(tableName = "", insertData = {}) => {
  const { data, error } = await supabase
  .from(tableName)
  .insert(insertData)

  return { data, error }
}

export const updateData = async(tableName = "", updateData = {}, equalsColumn = "", equalsValue = null) => {
  const { data, error } = await supabase
  .from(tableName)
  .update(updateData)
  .eq(equalsColumn, equalsValue)
  .select()

  return { data, error }
}

export const deleteData = async(tableName = "", equalsColumn = "", equalsValue = null) => {
  const { data, error } = await supabase
  .from(tableName)
  .delete()
  .eq(equalsColumn, equalsValue)

  return { data, error }
}
