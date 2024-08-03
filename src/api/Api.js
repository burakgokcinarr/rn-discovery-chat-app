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

export const readData = async(tableName = "", selectColumn = "*", filters = []) => {
  let query = supabase
    .from(tableName)
    .select(selectColumn);

  query = applyFilters(query, filters);

  const { data, error } = await query;

  return { data, error };
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

const applyFilters = (query, filters) => {
  filters.forEach(filter => {
    const { type, column, value } = filter;

    switch (type) {
      case 'eq':
        query = query.eq(column, value);
        break;
      case 'gt':
        query = query.gt(column, value);
        break;
      case 'lt':
        query = query.lt(column, value);
        break;
      case 'gte':
        query = query.gte(column, value);
        break;
      case 'lte':
        query = query.lte(column, value);
        break;
      case 'like':
        query = query.like(column, value);
        break;
      case 'ilike':
        query = query.ilike(column, value);
        break;
      case 'is':
        query = query.is(column, value);
        break;
      case 'in':
        query = query.in(column, value);
        break;
      case 'neq':
        query = query.neq(column, value);
        break;
      case 'contains':
        query = query.contains(column, value);
        break;
      case 'containedBy':
        query = query.containedBy(column, value);
        break;
      default:
        break;
    }
  });

  return query;
};
