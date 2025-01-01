// src/services/authService.ts
import { supabase } from './supabaseClient';

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  if (error) throw new Error(error.message);
  return data.provider;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};

export const getUserRole = (email: string): 'admin' | 'user' => {
  const adminEmails = ['admin@example.com']; // Replace with actual admin email list
  return adminEmails.includes(email) ? 'admin' : 'user';
};
