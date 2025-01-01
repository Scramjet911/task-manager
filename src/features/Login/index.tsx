// src/components/LoginPage.tsx
import React from 'react';

import { signInWithGoogle } from '../../services/auth';

const LoginPage: React.FC = () => {
  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <button
        onClick={handleLogin}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginPage;
