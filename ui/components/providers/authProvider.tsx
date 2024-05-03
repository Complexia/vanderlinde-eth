'use client';

import { createContext, useContext, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

//@ts-ignore
const AuthContext = createContext();

const AuthProvider = ({ accessToken, user, public_user, children }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== accessToken) {
        router.refresh();
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, [accessToken, supabase, router]);

  return (
    <AuthContext.Provider value={{ accessToken, user, public_user }}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};