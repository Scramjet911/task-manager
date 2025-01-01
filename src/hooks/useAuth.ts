// src/hooks/useAuth.ts
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setUser, logout } from '../redux/slices/authSlice';
import { getUserRole } from '../services/auth';
import { supabase } from '../services/supabaseClient';

const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (user?.email) {
        const role = getUserRole(user.email);
        dispatch(setUser({ id: user.id, email: user.email, role }));
      }
    };

    fetchUser();

    // Listen for auth state changes
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user?.email) {
        const role = getUserRole(session.user.email);
        dispatch(
          setUser({ id: session.user.id, email: session.user.email, role }),
        );
      } else {
        dispatch(logout());
      }
    });
    const subscription = data.subscription;

    return () => subscription?.unsubscribe();
  }, [dispatch]);
};

export default useAuth;
